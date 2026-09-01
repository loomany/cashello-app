/**
 * AST scan of reachable current-app source for interactive controls.
 * Uses TypeScript compiler API — scan output is the source of truth for candidates.
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const REACHABLE_SOURCE_GLOBS = [
  'src/features/legacyHome',
  'src/features/legacyAuth',
  'src/features/legacyPayment',
  'src/features/legacyQr',
  'src/features/legacyHistory',
  'src/features/legacyProfile',
  'src/features/legacyTopup',
  'src/features/legacyWithdraw',
  'src/features/legacyNavigation',
];

const JSX_HANDLER_ATTRS = new Set([
  'onPress',
  'onValueChange',
  'onSubmitEditing',
  'onLongPress',
  'onChangeText',
  'onDigit',
  'onDelete',
  'onProfilePress',
  'onSubmit',
  'onBack',
]);
const INTERACTIVE_COMPONENTS = new Set([
  'Pressable',
  'TouchableOpacity',
  'TouchableHighlight',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
]);
const ROUTER_METHODS = new Set(['push', 'replace', 'back']);
const SHEET_HANDLER_ATTRS = new Set(['onClose', 'onConfirm', 'onCancel']);

/** @param {string} root */
function listReachableSourceFiles(root) {
  /** @type {string[]} */
  const files = [];
  for (const relGlob of REACHABLE_SOURCE_GLOBS) {
    const abs = path.join(root, relGlob);
    if (!fs.existsSync(abs)) continue;
    walkDir(abs, (file) => {
      const rel = path.relative(root, file).replace(/\\/g, '/');
      if (!/\.(tsx?)$/.test(rel)) return;
      if (/\.(test|spec)\.(tsx?)$/.test(rel)) return;
      files.push(rel);
    });
  }
  return files.sort();
}

/** @param {string} dir @param {(file: string) => void} onFile */
function walkDir(dir, onFile) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, onFile);
    else onFile(full);
  }
}

/** @param {ts.Node} node */
function nodeText(sourceFile, node) {
  const text = sourceFile.text.slice(node.getStart(sourceFile), node.getEnd());
  return text.replace(/\s+/g, ' ').trim().slice(0, 160);
}

/** @param {ts.Expression} expr */
function exprSummary(sourceFile, expr) {
  if (!expr) return '(empty)';
  if (ts.isIdentifier(expr)) return expr.text;
  if (ts.isPropertyAccessExpression(expr)) return nodeText(sourceFile, expr);
  if (ts.isArrowFunction(expr) || ts.isFunctionExpression(expr)) {
    const body = expr.body;
    if (ts.isBlock(body)) {
      for (const stmt of body.statements) {
        if (ts.isReturnStatement(stmt) && stmt.expression) {
          return `() => ${exprSummary(sourceFile, stmt.expression)}`;
        }
        if (ts.isExpressionStatement(stmt)) {
          return `() => ${exprSummary(sourceFile, stmt.expression)}`;
        }
      }
      return '() => { ... }';
    }
    return `() => ${exprSummary(sourceFile, body)}`;
  }
  if (ts.isCallExpression(expr)) {
    const callee = exprSummary(sourceFile, expr.expression);
    const args = expr.arguments.slice(0, 2).map((a) => exprSummary(sourceFile, a)).join(', ');
    return args ? `${callee}(${args})` : `${callee}()`;
  }
  return nodeText(sourceFile, expr);
}

/** @param {string} sourceFileRel @param {string} root */
function scanFile(sourceFileRel, root) {
  const abs = path.join(root, sourceFileRel);
  const text = fs.readFileSync(abs, 'utf8');
  const sourceFile = ts.createSourceFile(abs, text, ts.ScriptTarget.Latest, true, sourceFileRel.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);

  /** @type {Array<{ source_file: string, line: number, interaction_kind: string, handler: string }>} */
  const hits = [];
  const seen = new Set();

  /** @param {{ line: number, interaction_kind: string, handler: string }} row */
  function add(row) {
    const key = `${sourceFileRel}:${row.line}:${row.interaction_kind}:${row.handler}`;
    if (seen.has(key)) return;
    seen.add(key);
    hits.push({ source_file: sourceFileRel, ...row });
  }

  /** @param {ts.Node} node */
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = ts.isIdentifier(node.tagName)
        ? node.tagName.text
        : ts.isPropertyAccessExpression(node.tagName)
          ? node.tagName.name.text
          : null;
      const attrs = ts.isJsxOpeningElement(node) ? node.attributes.properties : node.attributes.properties;
      for (const attr of attrs) {
        if (!ts.isJsxAttribute(attr) || !attr.name || !ts.isIdentifier(attr.name)) continue;
        const name = attr.name.text;
        const line = sourceFile.getLineAndCharacterOfPosition(attr.getStart(sourceFile)).line + 1;
        const handler = attr.initializer ? exprSummary(sourceFile, attr.initializer) : '(missing)';

        if (JSX_HANDLER_ATTRS.has(name)) {
          add({ line, interaction_kind: name, handler });
        }
        if (SHEET_HANDLER_ATTRS.has(name)) {
          add({ line, interaction_kind: name, handler });
        }
      }
    }

    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && callee.expression.text === 'router') {
        const method = callee.name.text;
        if (ROUTER_METHODS.has(method)) {
          const line = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
          const args = node.arguments.slice(0, 1).map((a) => exprSummary(sourceFile, a)).join(', ');
          add({
            line,
            interaction_kind: `router.${method}`,
            handler: args ? `router.${method}(${args})` : `router.${method}()`,
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return hits;
}

/** @param {string} root */
function scanReachableSource(root) {
  const files = listReachableSourceFiles(root);
  /** @type {Array<{ source_file: string, line: number, interaction_kind: string, handler: string }>} */
  const all = [];
  for (const file of files) {
    all.push(...scanFile(file, root));
  }
  all.sort((a, b) => {
    if (a.source_file !== b.source_file) return a.source_file.localeCompare(b.source_file);
    if (a.line !== b.line) return a.line - b.line;
    return a.interaction_kind.localeCompare(b.interaction_kind);
  });
  return all;
}

/** @param {{ source_file: string, line: number, interaction_kind: string, handler: string }} row */
function scanKey(row) {
  return `${row.source_file}:${row.line}:${row.interaction_kind}`;
}

module.exports = {
  REACHABLE_SOURCE_GLOBS,
  scanReachableSource,
  scanKey,
  listReachableSourceFiles,
};
