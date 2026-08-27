/**
 * Validate discovery JSON, screenshot files, and markdown relative links.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');
const DISC = path.join(ROOT, 'docs/business/discovery');
let failed = 0;

function ok(msg) {
  console.log('OK', msg);
}
function fail(msg) {
  failed += 1;
  console.log('FAIL', msg);
}

for (const name of ['screens.json', 'actions.json', 'flows.json', 'owner_questions.json']) {
  const p = path.join(DISC, 'manifests', name);
  try {
    JSON.parse(fs.readFileSync(p, 'utf8'));
    ok(`json ${name}`);
  } catch (error) {
    fail(`json ${name}: ${error.message}`);
  }
}

const screens = JSON.parse(fs.readFileSync(path.join(DISC, 'manifests/screens.json'), 'utf8'));
const actions = JSON.parse(fs.readFileSync(path.join(DISC, 'manifests/actions.json'), 'utf8'));
const flows = JSON.parse(fs.readFileSync(path.join(DISC, 'manifests/flows.json'), 'utf8'));
const questions = JSON.parse(
  fs.readFileSync(path.join(DISC, 'manifests/owner_questions.json'), 'utf8'),
);

const ids = {
  screens: new Set(screens.map((row) => row.screen_id)),
  actions: new Set(actions.map((row) => row.action_id)),
  flows: new Set(flows.map((row) => row.flow_id)),
  questions: new Set(questions.map((row) => row.question_id)),
};

function validateUnique(rows, key) {
  const seen = new Set();
  for (const row of rows) {
    if (seen.has(row[key])) fail(`duplicate ${key}: ${row[key]}`);
    seen.add(row[key]);
  }
}

validateUnique(screens, 'screen_id');
validateUnique(actions, 'action_id');
validateUnique(flows, 'flow_id');
validateUnique(questions, 'question_id');

for (const action of actions) {
  if (!ids.screens.has(action.screen_id)) {
    fail(`action ${action.action_id} references missing screen ${action.screen_id}`);
  }
  for (const id of action.owner_questions || []) {
    if (!ids.questions.has(id))
      fail(`action ${action.action_id} references missing question ${id}`);
  }
}

for (const screen of screens) {
  for (const id of [...(screen.entry_actions || []), ...(screen.exit_actions || [])]) {
    if (!ids.actions.has(id)) fail(`screen ${screen.screen_id} references missing action ${id}`);
  }
  for (const id of screen.owner_questions || []) {
    if (!ids.questions.has(id))
      fail(`screen ${screen.screen_id} references missing question ${id}`);
  }
}

for (const flow of flows) {
  for (const id of flow.screens || []) {
    if (!ids.screens.has(id)) fail(`flow ${flow.flow_id} references missing screen ${id}`);
  }
  for (const id of flow.actions || []) {
    if (!ids.actions.has(id)) fail(`flow ${flow.flow_id} references missing action ${id}`);
  }
  for (const id of flow.owner_questions || []) {
    if (!ids.questions.has(id)) fail(`flow ${flow.flow_id} references missing question ${id}`);
  }
}

for (const question of questions) {
  for (const id of question.screen_ids || []) {
    if (!ids.screens.has(id))
      fail(`question ${question.question_id} references missing screen ${id}`);
  }
  for (const id of question.action_ids || []) {
    if (!ids.actions.has(id))
      fail(`question ${question.question_id} references missing action ${id}`);
  }
  for (const id of question.process_ids || []) {
    if (!ids.flows.has(id)) fail(`question ${question.question_id} references missing flow ${id}`);
  }
}

ok('manifest IDs and cross-references');

const pngDir = path.join(DISC, 'screenshots/annotated');
const pngs = new Set(fs.readdirSync(pngDir).filter((f) => f.endsWith('.png')));
let missingShot = 0;
for (const screen of screens) {
  const paths = [screen.screenshot, ...(screen.screenshots || []).map((s) => s.path)].filter(
    Boolean,
  );
  for (const rel of paths) {
    const file = path.basename(rel);
    if (!pngs.has(file)) {
      missingShot += 1;
      fail(`missing screenshot ${file} (${screen.screen_id})`);
    }
  }
}
ok(`screenshots referenced=${screens.length} files=${pngs.size} missing=${missingShot}`);

const mdFiles = [
  'AI_HANDOFF_INDEX.md',
  'PRODUCT_SCREEN_CATALOG.md',
  'UI_ACTION_CATALOG.md',
  'CURRENT_FLOW_MAP.md',
  'BUSINESS_PROCESS_CANDIDATES.md',
  'OWNER_QUESTIONNAIRE.md',
  'COVERAGE_REPORT.md',
  'tools/README.md',
];
const linkRe = /\[[^\]]*\]\(([^)]+)\)/g;
for (const md of mdFiles) {
  const abs = path.join(DISC, md);
  const text = fs.readFileSync(abs, 'utf8');
  let match;
  while ((match = linkRe.exec(text))) {
    const href = match[1].split('#')[0].split('?')[0];
    if (!href || href.startsWith('http') || href.startsWith('mailto:')) continue;
    const target = path.resolve(path.dirname(abs), href);
    if (!fs.existsSync(target)) fail(`broken link ${md} -> ${href}`);
  }
}

const pri = { P0: 0, P1: 0, P2: 0, P3: 0 };
const req = {};
for (const q of questions) {
  pri[q.priority] = (pri[q.priority] || 0) + 1;
  req[q.required_by] = (req[q.required_by] || 0) + 1;
}
console.log(
  JSON.stringify(
    {
      screens: screens.length,
      actions: actions.length,
      flows: flows.length,
      questions: questions.length,
      pngs: pngs.size,
      priorities: pri,
      required_by: req,
      figma: screens.filter((s) => s.source_status === 'FIGMA_AND_CODE').length,
    },
    null,
    2,
  ),
);

if (failed) {
  console.error(`Validation failures: ${failed}`);
  process.exit(1);
}
console.log('PASS');
