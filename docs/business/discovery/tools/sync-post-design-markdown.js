/**
 * Targeted markdown reconciliation for post-design delta (docs only).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');
const DISC = path.join(ROOT, 'docs/business/discovery');
const PRODUCT_SHA = '597754364ada9dc1f51f62fe86b41a2bc0b24e4b';

function read(rel) {
  return fs.readFileSync(path.join(DISC, rel), 'utf8');
}
function write(rel, text) {
  fs.writeFileSync(path.join(DISC, rel), text);
}

function readRoot(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}
function writeRoot(rel, text) {
  fs.writeFileSync(path.join(ROOT, rel), text);
}

// --- PRODUCT_SCREEN_CATALOG.md ---
let catalog = read('PRODUCT_SCREEN_CATALOG.md');
catalog = catalog.replace(
  '`HOME-001`, `LGC-SCR-025`, `LGC-SCR-026`, `CAS-HOME-003`, `CAS-HOME-004`, `CAS-HOME-005`',
  '`HOME-001`, `LGC-SCR-025`, `LGC-SCR-026`, `CAS-HOME-003`, `CAS-HOME-004`',
);
catalog = catalog.replace(
  /\*\*Exit points:\*\* `ACT-HOME-001-01`[\s\S]*?`ACT-HOME-001-12`\\/,
  '**Exit points:** `ACT-HOME-001-01`, `ACT-HOME-001-02`, `ACT-HOME-001-03`, `ACT-HOME-001-04`, `ACT-HOME-001-05`, `ACT-HOME-001-14`, `ACT-HOME-001-12`, `ACT-HOME-001-13`\\',
);
catalog = catalog.replace(
  /- \[06\] `ACT-HOME-001-06`[\s\S]*?- \[11\] `ACT-HOME-001-11`[\s\S]*?\n/,
  `- [06] \`ACT-HOME-001-14\` — Бонус за регистрацию → GUEST_GATE: /legacy/auth?qaStep=iin (PROTOTYPE_UI_ONLY mock +500 Б copy)\n`,
);
catalog = catalog.replace(
  /- \[06\] `ACT-LGC-SCR-025-06`[\s\S]*?- \[11\] `ACT-LGC-SCR-025-11`[\s\S]*?\n/,
  `- [06] \`ACT-LGC-SCR-025-10\` — См. все → ROUTE: /legacy/history\n- [07] \`ACT-LGC-SCR-025-18\` — Ubet (последняя операция) → ROUTE: /legacy/payment/ubet?phone=&amount= (CURRENT_MOCK_BEHAVIOR)\n- [08] \`ACT-LGC-SCR-025-19\` — Oinabet → prefilled PAY-002\n- [09] \`ACT-LGC-SCR-025-20\` — Tennisi → prefilled PAY-002\n- [10] \`ACT-LGC-SCR-025-21\` — Робокэш / Займер → prefilled PAY-002\n- [11] \`ACT-LGC-SCR-025-22\` — CreditBar → prefilled PAY-002\n- [12] \`ACT-LGC-SCR-025-23\` — i-credit.kz → prefilled PAY-002\n- [13] \`ACT-LGC-SCR-025-24\` — Kengo → prefilled PAY-002\n- [14] \`ACT-LGC-SCR-025-25\` — Sat Credit → prefilled PAY-002\n`,
);
catalog = catalog.replace(
  /- \[06\] `ACT-LGC-SCR-026-06`[\s\S]*?- \[11\] `ACT-LGC-SCR-026-11`[\s\S]*?\n/,
  `- [06] \`ACT-LGC-SCR-026-10\` — Фильтр → ROUTE: /legacy/history/filter\n- [07–14] \`ACT-LGC-SCR-026-17\`…\`026-24\` — Последние операции rows → prefilled PAY-002 (CURRENT_MOCK_BEHAVIOR)\n`,
);
catalog = catalog.replace(
  /## CAS-HOME-005[\s\S]*?(?=\n## )/,
  '',
);
catalog = catalog.replace(
  /`ACT-HOME-001-06`, `ACT-HOME-001-07`, `ACT-HOME-001-08`, `ACT-HOME-001-09`, `ACT-LGC-SCR-025-06`, `ACT-LGC-SCR-025-07`, `ACT-LGC-SCR-025-08`, `ACT-LGC-SCR-025-09`, `ACT-LGC-SCR-025-13`, `ACT-LGC-SCR-026-06`, `ACT-LGC-SCR-026-07`, `ACT-LGC-SCR-026-08`/g,
  '`ACT-LGC-SCR-025-18`…`025-25`, `ACT-LGC-SCR-026-17`…`026-24`, `ACT-LGC-SCR-025-13`',
);
catalog = catalog.replace(
  /`ACT-HOME-001-10`, `ACT-LGC-SCR-025-10`, `ACT-LGC-SCR-025-15`, `ACT-LGC-SCR-026-10`, `ACT-LGC-SCR-026-15`, `ACT-CAS-HOME-005-03`,/g,
  '`ACT-LGC-SCR-025-10`, `ACT-LGC-SCR-025-18`, `ACT-LGC-SCR-025-15`, `ACT-LGC-SCR-026-10`, `ACT-LGC-SCR-026-15`,',
);
write('PRODUCT_SCREEN_CATALOG.md', catalog);

// --- UI_ACTION_CATALOG.md — remove obsolete sections, append new summary block ---
let actionsMd = read('UI_ACTION_CATALOG.md');
actionsMd = actionsMd.replace(
  /### ACT-HOME-001-06[\s\S]*?### ACT-HOME-001-12/,
  `### ACT-HOME-001-14 — [06] Бонус за регистрацию

- **Screen / element:** HOME-001 / EL-HOME-001-14
- **User intent:** Open auth from registration bonus preview row
- **Current destination:** GUEST_GATE → /legacy/auth?qaStep=iin
- **Classification:** PROTOTYPE_UI_ONLY / CURRENT_MOCK_BEHAVIOR (+500 Б copy is not production policy)

### ACT-HOME-001-12`,
);
actionsMd = actionsMd.replace(
  /### ACT-LGC-SCR-025-06[\s\S]*?### ACT-LGC-SCR-025-12/,
  `### ACT-LGC-SCR-025-10 — [06] См. все

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-10
- **User intent:** Open full history from «Последние операции»
- **Current destination:** ROUTE → /legacy/history

### ACT-LGC-SCR-025-18 — [07] Ubet (последняя операция)

- **Current destination:** ROUTE → /legacy/payment/ubet?phone=&amount= (prefill)
- **Classification:** CURRENT_MOCK_BEHAVIOR preview row

### ACT-LGC-SCR-025-19 … ACT-LGC-SCR-025-25 — [08–14] Other recent-operation rows

- **Current destination:** prefilled PAY-002 per service (mock preview data)

### ACT-LGC-SCR-025-12`,
);
actionsMd = actionsMd.replace(/## CAS-HOME-005[\s\S]*?(?=\n## )/, '');
actionsMd = actionsMd.replace(
  /### ACT-LGC-SCR-026-06[\s\S]*?### ACT-LGC-SCR-026-12/,
  `### ACT-LGC-SCR-026-10 — [06] Фильтр

- **Current destination:** ROUTE → /legacy/history/filter

### ACT-LGC-SCR-026-17 … ACT-LGC-SCR-026-24 — [07–14] Recent-operation rows

- **Current destination:** prefilled PAY-002 (mock preview)

### ACT-LGC-SCR-026-12`,
);
if (!actionsMd.includes('ACT-PAY-002-15')) {
  actionsMd += `\n### ACT-PAY-002-15 — Entry from Home recent operation (prefilled)\n\n- **Screen:** PAY-002\n- **Current destination:** phone/amount search params applied on mount\n- **Classification:** CURRENT_CODE_FACT at product SHA ${PRODUCT_SHA}\n`;
}
write('UI_ACTION_CATALOG.md', actionsMd);

// --- CURRENT_FLOW_MAP.md ---
let flowMap = read('CURRENT_FLOW_MAP.md');
flowMap = flowMap.replace(/## Post-design Home flows[\s\S]*?(?=\n## |\n*$)/, '');
if (!flowMap.includes('Post-design Home navigation')) {
  flowMap += `\n## Post-design Home navigation (${PRODUCT_SHA.slice(0, 7)})\n\nThese are navigation transitions within existing business processes, not new process candidates.\n\n- **BP-AUTH-001** (alternate entry): Guest Home bonus row → Auth (\`ACT-HOME-001-14\`). PROTOTYPE_UI_ONLY — «+500 Б» copy is not production policy.\n- **BP-PAY-001** (alternate entry): Authorized Home recent-operation row → prefilled \`PAY-002\` (\`ACT-LGC-SCR-025-18\`…\`025-25\`, \`ACT-LGC-SCR-026-17\`…\`026-24\`, \`ACT-PAY-002-15\`). CURRENT_MOCK_BEHAVIOR — preview catalog rows, not real transaction history.\n- **BP-HIST-001** (unchanged): «См. все» on Home (\`ACT-LGC-SCR-025-10\`, \`ACT-LGC-SCR-026-10\`) still routes to history.\n- Removed from current product: Home services preview rows, Home history preview rows, Home \`HistoryActionSheet\` overlay screen record (\`CAS-HOME-005\`). \`HistoryActionSheet\` remains on history screens (\`CAS-HIST-002\`).\n`;
}
flowMap = flowMap.replace(
  /Payment\/history guest browse is via «См\. все», not bottom tabs\./,
  'Guest Home shows a single «Последние операции» bonus preview row (not services/history sections). Payment/history browse uses dedicated routes when reached from other entry points.',
);
write('CURRENT_FLOW_MAP.md', flowMap);

// --- COVERAGE_REPORT.md ---
let coverage = read('COVERAGE_REPORT.md');
coverage = coverage.replace(
  /Generated from[\s\S]*?blocklist, then removed it\./,
  `Reconciled against product SHA \`${PRODUCT_SHA}\` after director visual pass (pre-design baseline \`2359692f\`).\n\n**Product code changed during this reconciliation:** NO (docs/screenshots only)\n**Figma modified:** NO\n**Resolved product issue:** \`src/app/routing.test.ts\` moved to \`src/__tests__/\` in ${PRODUCT_SHA}; stock \`npm run web\` no longer requires Metro blocklist.`,
);
coverage = coverage.replace(/Logical screens identified\s+\|\s+\d+/, 'Logical screens identified                     |                                                 94');
coverage = coverage.replace(/Primary screenshot files present\s+\|\s+\d+/, 'Primary screenshot files present               |                                                 94');
coverage = coverage.replace(/Actions identified\s+\|\s+\d+/, 'Actions identified                             |                                                443');
coverage = coverage.replace(/Business process candidates\s+\|\s+\d+/, 'Business process candidates                    |                                                 22');
coverage = coverage.replace(/Annotated state screenshot files present\s+\|\s+\d+/, 'Annotated state screenshot files present       |                                                160');
coverage = coverage.replace(
  /Guest: Home \(HOME-001\)[\s\S]*?deep-link only\)\./,
  'Guest: Home (HOME-001) with «Последние операции» bonus preview row; top-up/withdraw sheets; payment/history browse via other routes; support FAB; login CTA.',
);
coverage = coverage.replace(
  /12\. `src\/app\/routing\.test\.ts`[\s\S]*?\n/,
  '',
);
write('COVERAGE_REPORT.md', coverage);

// --- README ---
let readme = readRoot('README.md');
readme = readme.replace(/\*\*136 tests\*\*/, '**138 tests**');
writeRoot('README.md', readme);

// --- FIGMA_HANDOFF ---
let figma = fs.readFileSync(path.join(ROOT, 'docs/design/FIGMA_HANDOFF.md'), 'utf8');
figma = figma.replace(
  /\| Services strip \| Ubet, Beeline, Zaimer[\s\S]*?\| `MATCHED_IMPLEMENTATION` \|/,
  '| Recent operations | «Последние операции» (guest: 1 bonus row; authorized: 8 mock rows) | `PARTIAL_MATCH` — runtime ahead of Figma frame `7:5` |',
);
figma = figma.replace(
  /\| History preview \| Registration CTA row \| Static preview rows \| `MATCHED_IMPLEMENTATION` \|/,
  '| History preview | Removed from Home body (replaced by recent operations) | N/A in current code | `CODE_ONLY` / Figma stale |',
);
if (!figma.includes('5977543')) {
  figma += `\n## Post-design code drift (${PRODUCT_SHA.slice(0, 7)})\n\n- **Figma file:** Cashello — Daur (\`RbjNBmxd2FERlisMJoru3I\`)\n- **HOME-001 node:** \`7:5\` — **UNCHANGED in Figma**\n- **Current code:** Home uses «Последние операции» instead of separate Services + History sections.\n- **Runtime is ahead of Figma** for these Home sections; do not treat Figma frame \`7:5\` as full current-product spec.\n- **+500 Б registration bonus** on guest Home is PROTOTYPE_UI_ONLY evidence, not an answered owner policy.\n`;
}
fs.writeFileSync(path.join(ROOT, 'docs/design/FIGMA_HANDOFF.md'), figma);

// --- AI handoff indexes ---
for (const rel of ['AI_HANDOFF_INDEX.md', 'discovery/AI_HANDOFF_INDEX.md']) {
  const p = path.join(ROOT, 'docs/business', rel);
  if (!fs.existsSync(p)) continue;
  let text = fs.readFileSync(p, 'utf8');
  if (!text.includes(PRODUCT_SHA)) {
    text += `\n## Reconciled product baseline\n\n- **Product SHA:** \`${PRODUCT_SHA}\` (director visual pass)\n- **Pre-design SHA:** \`2359692f3ded08fdea66b5ea260f485e894dfd7b\`\n- Home changed after original discovery; manifests/screenshots reconciled against current code.\n- Figma HOME-001 frame unchanged; runtime Home sections may differ (see FIGMA_HANDOFF.md).\n- Bonus +500 Б UI is prototype evidence only — owner questions remain UNANSWERED unless explicitly decided.\n- Delta record: [2026-09-01 director visual delta](../changes/2026-09-01-director-visual-delta.md)\n`;
  }
  fs.writeFileSync(p, text);
}

console.log('Markdown sync complete.');
