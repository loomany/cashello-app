/**
 * Sync discovery markdown after VIS2 home payment navigation reconciliation.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');
const DISC = path.join(ROOT, 'docs/business/discovery');
const PRODUCT_SHA = '86e9d3bee9ca13a82474f4acdcdec8f5d0eb3134';
const PREVIOUS_SHA = 'dbb0acd38228321e7e3dd0132974bbcf294a878c';

const screens = JSON.parse(fs.readFileSync(path.join(DISC, 'manifests/screens.json'), 'utf8'));
const actions = JSON.parse(fs.readFileSync(path.join(DISC, 'manifests/actions.json'), 'utf8'));
const flows = JSON.parse(fs.readFileSync(path.join(DISC, 'manifests/flows.json'), 'utf8'));

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
  /`HOME-001`, `LGC-SCR-025`, `LGC-SCR-026`, `CAS-HOME-003`, `CAS-HOME-004`/,
  '`HOME-001`, `LGC-SCR-025`, `CAS-HOME-003`, `CAS-HOME-004`',
);
catalog = catalog.replace(
  /## HOME-001 — Главная для гостя[\s\S]*?(?=\n## LGC-SCR-025)/,
  `## HOME-001 — Главная для гостя

**Canonical ID:** HOME-001\\
**Aliases:** Figma frame 7:5\\
**Module:** HOME\\
**Route:** \`/legacy/home?guest=1\`\\
**Auth state:** GUEST\\
**Figma:** FIGMA_FACT — node 7:5 (https://www.figma.com/design/RbjNBmxd2FERlisMJoru3I/Cashello-Daur?node-id=7-5)\\
**Legacy node alias:** None\\
**Frontend:** \`src/features/legacyHome/HomeScreen.tsx\`\\
**Primary screenshot:** [Главная для гостя](./screenshots/annotated/HOME-001__guest-home.png)\\
**State screenshots:** [GUEST](./screenshots/annotated/HOME-001__guest-home.png)

**Purpose:** Browsable guest landing page with zeroed account previews and login gates.

**Entry points:** \`ACT-CAS-AUTH-003-01\`, \`ACT-CAS-AUTH-003-02\`, \`ACT-CAS-AUTH-012-01\`, \`ACT-CAS-AUTH-013-01\`, \`ACT-CAS-AUTH-014-01\`, \`ACT-CAS-AUTH-015-01\`, \`ACT-HOME-001-01\`, \`ACT-CAS-PROFILE-001-01\`\\
**Exit points:** \`ACT-HOME-001-01\`, \`ACT-HOME-001-02\`, \`ACT-HOME-001-03\`, \`ACT-HOME-001-04\`, \`ACT-HOME-001-05\`, \`ACT-HOME-001-06\`, \`ACT-HOME-001-15\`, \`ACT-HOME-001-16\`, \`ACT-HOME-001-14\`, \`ACT-HOME-001-12\`, \`ACT-HOME-001-13\`\\
**Visible business data:** 0 ₸ / 0 ₽ / 0 $ / 0 Б; payments segment plaque; registration bonus preview row

**Interactive elements**

- [01] \`ACT-HOME-001-01\` — Cashhello — на главную → ROUTE: /legacy/home?guest=1
- [02] \`ACT-HOME-001-02\` — Профиль → GUEST_GATE: /legacy/auth?qaStep=iin
- [03] \`ACT-HOME-001-03\` — Показать / скрыть балансы → LOCAL_STATE: balancesHidden
- [04] \`ACT-HOME-001-04\` — Пополнить → LOCAL_STATE: TopupSelectSheet
- [05] \`ACT-HOME-001-05\` — Вывести → LOCAL_STATE: WithdrawSelectSheet
- [06] \`ACT-HOME-001-06\` — Последние (segment) → LOCAL_STATE: active segment; no navigation
- [07] \`ACT-HOME-001-15\` — Все (segment) → GUEST_GATE: /legacy/auth?qaStep=iin
- [08] \`ACT-HOME-001-16\` — История (segment) → GUEST_GATE: /legacy/auth?qaStep=iin
- [09] \`ACT-HOME-001-14\` — Бонус за регистрацию → GUEST_GATE: /legacy/auth?qaStep=iin (PROTOTYPE_UI_ONLY mock +500 Б copy)
- [12] \`ACT-HOME-001-12\` — Войти → ROUTE: /legacy/auth?qaStep=iin
- [13] \`ACT-HOME-001-13\` — Служба поддержки (headset FAB) → SHEET: CAS-SUPPORT-002

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: segmented payments plaque \`Последние | Все | История\` replaces former «Последние операции» header.
- CURRENT_RUNTIME_FACT: guest \`Все\` / \`История\` require auth; \`Последние\` shows registration bonus preview row.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: guest balances display zero independent of the in-memory authorized balance store.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

`,
);
catalog = catalog.replace(
  /## LGC-SCR-025 — Главная авторизованного пользователя[\s\S]*?(?=\n## LGC-SCR-026|\n## LGC-SCR-029)/,
  `## LGC-SCR-025 — Главная авторизованного пользователя

**Canonical ID:** LGC-SCR-025\\
**Aliases:** HOME-002; legacyNodeId 765:22510\\
**Module:** HOME\\
**Route:** \`/legacy/home\`\\
**Route aliases:** \`/legacy/home?historyLink=filter\` (LEGACY_ROUTE_ALIAS — same logical screen; query ignored)\\
**Auth state:** AUTHORIZED\\
**Figma:** NONE — CODE_ONLY\\
**Legacy node alias:** 765:22510\\
**Frontend:** \`src/features/legacyHome/HomeScreen.tsx\`\\
**Primary screenshot:** [Главная авторизованного пользователя](./screenshots/annotated/LGC-SCR-025__authorized-home.png)\\
**State screenshots:** [AUTHORIZED](./screenshots/annotated/LGC-SCR-025__authorized-home.png), [BALANCES_HIDDEN](./screenshots/annotated/LGC-SCR-025__balances-hidden.png)

**Purpose:** Primary authorized navigation and balance overview with segmented payments preview.

**Entry points:** \`ACT-CAS-AUTH-003-01\`, \`ACT-CAS-AUTH-003-02\`, \`ACT-CAS-AUTH-012-01\`, \`ACT-CAS-AUTH-013-01\`, \`ACT-CAS-AUTH-014-01\`, \`ACT-CAS-AUTH-015-01\`, \`ACT-HOME-001-01\`, \`ACT-LGC-SCR-025-01\`, \`ACT-LGC-SCR-025-12\`, \`ACT-LGC-SCR-029-01\`\\
**Exit points:** \`ACT-LGC-SCR-025-01\`, \`ACT-LGC-SCR-025-02\`, \`ACT-LGC-SCR-025-03\`, \`ACT-LGC-SCR-025-04\`, \`ACT-LGC-SCR-025-05\`, \`ACT-LGC-SCR-025-06\`, \`ACT-LGC-SCR-025-07\`, \`ACT-LGC-SCR-025-10\`, \`ACT-LGC-SCR-025-18\`…\`025-21\`, \`ACT-LGC-SCR-025-12\`…\`025-17\`\\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] \`ACT-LGC-SCR-025-01\` — Cashhello — на главную → ROUTE: /legacy/home
- [02] \`ACT-LGC-SCR-025-02\` — Профиль → ROUTE: /legacy/profile
- [03] \`ACT-LGC-SCR-025-03\` — Показать / скрыть балансы → LOCAL_STATE: balancesHidden
- [04] \`ACT-LGC-SCR-025-04\` — Пополнить → LOCAL_STATE: TopupSelectSheet
- [05] \`ACT-LGC-SCR-025-05\` — Вывести → LOCAL_STATE: WithdrawSelectSheet
- [06] \`ACT-LGC-SCR-025-06\` — Последние (segment) → LOCAL_STATE: active segment; shows 4 recent-operation rows; no navigation
- [07] \`ACT-LGC-SCR-025-07\` — Все (segment) → ROUTE: /legacy/payment
- [08] \`ACT-LGC-SCR-025-10\` — История (segment) → ROUTE: /legacy/history
- [09] \`ACT-LGC-SCR-025-18\` — Ubet → prefilled PAY-002 (CURRENT_MOCK_BEHAVIOR). Row shows \`−5 000 ₸\` and \`+100 Б\` at 2%.
- [10] \`ACT-LGC-SCR-025-19\` — Oinabet → prefilled PAY-002
- [11] \`ACT-LGC-SCR-025-20\` — Tennisi → prefilled PAY-002
- [12] \`ACT-LGC-SCR-025-21\` — Робокэш / Займер → prefilled PAY-002
- [15] \`ACT-LGC-SCR-025-12\` — Главная → ROUTE: /legacy/home
- [16] \`ACT-LGC-SCR-025-13\` — Оплата → ROUTE: /legacy/payment
- [17] \`ACT-LGC-SCR-025-14\` — QR → ROUTE: /legacy/qr
- [18] \`ACT-LGC-SCR-025-15\` — История → ROUTE: /legacy/history
- [19] \`ACT-LGC-SCR-025-16\` — Профиль → ROUTE: /legacy/profile
- [20] \`ACT-LGC-SCR-025-17\` — Служба поддержки (headset FAB) → SHEET: CAS-SUPPORT-002

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: segmented payments plaque \`Последние | Все | История\` replaces former «Последние операции» + «См. все» header.
- CURRENT_RUNTIME_FACT: \`Последние\` shows exactly **4** mock recent-operation rows.
- CURRENT_RUNTIME_FACT: \`/legacy/home?historyLink=filter\` loads the same screen (compatibility alias only).

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: balances, bonus, services and operations are synthetic.
- OWNER_APPROVED_CURRENT_BASE_RATE: authorized recent-operation rows display \`+N Б\` computed at **2%** of the mock operation amount.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: \`Q-AUTH-009\`

`,
);
catalog = catalog.replace(/## LGC-SCR-026 —[\s\S]*?(?=\n## LGC-SCR-029)/, '');
catalog = catalog.replace(/LGC-SCR-026/g, 'LGC-SCR-025 (alias)');
catalog = catalog.replace(/LGC-SCR-025 \(alias\)/g, 'LGC-SCR-025');
write('PRODUCT_SCREEN_CATALOG.md', catalog);

// --- UI_ACTION_CATALOG.md — remove 026 section, patch 025 block ---
let actionsMd = read('UI_ACTION_CATALOG.md');
actionsMd = actionsMd.replace(/## LGC-SCR-026 —[\s\S]*?(?=\n## LGC-SCR-029|\n## LGC-SCR-032|$)/, '');
actionsMd = actionsMd.replace(
  /### ACT-LGC-SCR-025-10 —[\s\S]*?(?=### ACT-LGC-SCR-025-12)/,
  `### ACT-LGC-SCR-025-06 — [06] Последние (segment)

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-06
- **User intent:** Keep active recent-operations preview on Home
- **Current destination:** LOCAL_STATE — paymentsTab=recent (no navigation)
- **Classification:** CURRENT_CODE_FACT at product SHA ${PRODUCT_SHA}

### ACT-LGC-SCR-025-07 — [07] Все (segment)

- **Current destination:** ROUTE → /legacy/payment
- **Classification:** CURRENT_CODE_FACT — alternate entry into BP-PAY-001 catalog browse

### ACT-LGC-SCR-025-10 — [08] История (segment)

- **Current destination:** ROUTE → /legacy/history
- **Classification:** CURRENT_CODE_FACT — alternate entry into BP-HIST-001 (replaces former «См. все» control)

### ACT-LGC-SCR-025-18 — [09] Ubet (recent operation)

- **Current destination:** ROUTE → /legacy/payment/ubet?phone=&amount= (prefill)
- **Classification:** CURRENT_MOCK_BEHAVIOR preview row with 2% bonus display

### ACT-LGC-SCR-025-19 … ACT-LGC-SCR-025-21 — [10–12] Other recent-operation rows

- **Current destination:** prefilled PAY-002 per service (4 rows total on Home)

`,
);
if (!actionsMd.includes('ACT-HOME-001-06')) {
  actionsMd = actionsMd.replace(
    /### ACT-HOME-001-14 —[\s\S]*?(?=### ACT-HOME-001-12)/,
    (block) =>
      `### ACT-HOME-001-06 — [06] Последние (segment)

- **Current destination:** LOCAL_STATE — active segment on guest Home

### ACT-HOME-001-15 — [07] Все (segment)

- **Current destination:** GUEST_GATE → /legacy/auth?qaStep=iin

### ACT-HOME-001-16 — [08] История (segment)

- **Current destination:** GUEST_GATE → /legacy/auth?qaStep=iin

${block}`,
  );
}
actionsMd = actionsMd.replace(/### ACT-LGC-SCR-026[\s\S]*?(?=### ACT-LGC-SCR-029|### ACT-LGC-SCR-032|$)/g, '');
write('UI_ACTION_CATALOG.md', actionsMd);

// --- CURRENT_FLOW_MAP.md ---
let flowMap = read('CURRENT_FLOW_MAP.md');
flowMap = flowMap.replace(/LGC-SCR-026[^`\s]*/g, 'LGC-SCR-025');
flowMap = flowMap.replace(/ACT-LGC-SCR-026-[0-9]+/g, '');
flowMap = flowMap.replace(/«См\. все» on Home \(`ACT-LGC-SCR-025-10`, ``\)/, 'Home segment «История» (`ACT-LGC-SCR-025-10`)');
if (!flowMap.includes('Home segment «Все»')) {
  flowMap = flowMap.replace(
    /- \*\*BP-HIST-001\*\* \(unchanged\): Home segment «История»/,
    `- **BP-PAY-001** (alternate entry): Authorized Home segment «Все» → payment catalog (\`ACT-LGC-SCR-025-07\`).
- **BP-HIST-001** (alternate entry): Authorized Home segment «История»`,
  );
}
if (!flowMap.includes('Guest Home segment')) {
  flowMap = flowMap.replace(
    /- \*\*BP-AUTH-001\*\* \(alternate entry\): Guest Home bonus row/,
    '- **BP-AUTH-001** (alternate entry): Guest Home segments «Все» / «История» and bonus row',
  );
}
write('CURRENT_FLOW_MAP.md', flowMap);

// --- BUSINESS_PROCESS_CANDIDATES.md ---
let bpc = read('BUSINESS_PROCESS_CANDIDATES.md');
bpc = bpc.replace(/`LGC-SCR-026`/g, '`LGC-SCR-025`');
bpc = bpc.replace(/ACT-LGC-SCR-026-[0-9]+/g, 'ACT-LGC-SCR-025-10');
write('BUSINESS_PROCESS_CANDIDATES.md', bpc);

// --- COVERAGE_REPORT.md ---
const pngDir = path.join(DISC, 'screenshots/annotated');
const pngCount = fs.readdirSync(pngDir).filter((f) => f.endsWith('.png')).length;
const primaryValidated = screens.filter((s) => s.screenshot_qa === 'VALIDATED').length;
const captureGapStates = screens.reduce((n, s) => {
  return n + (s.screenshots || []).filter((shot) => shot.capture_status === 'CAPTURE_GAP').length;
}, 0);
const runtimeCaptured = screens.reduce((n, s) => {
  return n + (s.screenshots || []).filter((shot) => shot.capture_status === 'CAPTURED').length;
}, 0);

write(
  'COVERAGE_REPORT.md',
  `# Discovery coverage report

Reconciled against product SHA \`${PRODUCT_SHA}\` after owner visual pass VIS2 home payment navigation (previous baseline \`${PREVIOUS_SHA}\`).

**Product code changed during this reconciliation:** NO (docs/screenshots only)
**Figma modified:** NO
**LGC-SCR-026:** RETIRED_AND_MERGED_WITH_LGC-SCR-025 (\`/legacy/home?historyLink=filter\` is a compatibility alias only)

## Counts

| Metric                                         |                                              Count |
| ---------------------------------------------- | -------------------------------------------------: |
| Files under src/app/**                         |                                                 60 |
| UI route files                                 |                                                 47 |
| Product routes (PRODUCT + STATE + SHEET/MODAL) |                                                 36 |
| Stub routes                                    |                                                  6 |
| Redirect-only / no UI routes                   | 3 (\`/\`, \`/legacy/stub/qr\`, \`/legacy/stub/payment\`) |
| DEV_ONLY routes                                |                              1 (\`/dev/foundation\`) |
| Logical screens identified                     |                                                 93 |
| Primary screenshot files present               |                                                 93 |
| Primary screenshots runtime-validated          |                                                 ${primaryValidated} |
| Primary screenshots marked CAPTURE_GAP         |                                                 16 |
| Annotated state screenshot files present       |                                                ${pngCount} |
| State screenshots runtime-validated            |                                                ${runtimeCaptured} |
| State screenshots marked CAPTURE_GAP           |                                                 ${captureGapStates} |
| Actions identified                             |                                                ${actions.length} |
| Interactive icon legend meanings               |                                                 16 |
| Business process candidates                    |                                                 ${flows.length} |
| Owner questions                                |                                                130 |
| P0                                             |                                                 91 |
| P1                                             |                                                 30 |
| P2                                             |                                                  9 |
| P3                                             |                                                  0 |
| Required before backend                        |                                                 95 |
| Required before production                     |                                                 29 |
| Can decide later                               |                                                  6 |
| Code-only logical screens                      |                                                 93 |
| Figma-covered product screens                  |                                     1 (\`HOME-001\`) |
| Explicit no-screenshot route reasons           |                                                  5 |

## Runtime coverage

- Guest: Home (HOME-001) with segmented payments plaque \`Последние | Все | История\`; registration bonus row \`+500 Б\` unchanged; guest \`Все\` / \`История\` → auth.
- Authorized: Home (LGC-SCR-025) shows 4 recent-operation rows with negative KZT debit plus \`+N Б\` at owner-approved current base rate **2%**; segments \`Все\` → payment catalog, \`История\` → history.

## Retired in this pass

- Logical screen \`LGC-SCR-026\` merged into \`LGC-SCR-025\`.
- State \`RECENT_OPS_SCROLLED\` — retired (4-row Home no longer has distinct lower-row scroll evidence).
- Screenshots removed: \`LGC-SCR-026__history-filter-link.png\`, \`LGC-SCR-025__recent-ops-scrolled.png\`.

## Unresolved audit/product gaps

See prior coverage report items; unchanged except Home navigation evidence updated at product SHA ${PRODUCT_SHA.slice(0, 7)}.
`,
);

// --- FIGMA_HANDOFF.md patch ---
let figma = fs.readFileSync(path.join(ROOT, 'docs/design/FIGMA_HANDOFF.md'), 'utf8');
if (!figma.includes('segmented plaque')) {
  figma += `\n## VIS2 Home payment navigation drift (${PRODUCT_SHA.slice(0, 7)})\n\n- **Figma file:** unchanged\n- **Runtime Home:** segmented plaque \`Последние | Все | История\` inside payments card\n- **Authorized \`Последние\`:** 4 recent-operation preview rows (was 8 in prior docs baseline)\n- **Figma modified:** NO — runtime ahead of Figma frame \`7:5\` / HOME body\n- **LGC-SCR-026:** retired; \`/legacy/home?historyLink=filter\` is alias of LGC-SCR-025 only\n`;
}
fs.writeFileSync(path.join(ROOT, 'docs/design/FIGMA_HANDOFF.md'), figma);

// --- README ---
let readme = readRoot('README.md');
readme = readme.replace(
  /Current baseline: \*\*\d+ test suites\*\*, \*\*\d+ tests\*\*/,
  'Current baseline: **24 test suites**, **149 tests**',
);
writeRoot('README.md', readme);

// --- AI HANDOFF ---
const handoffBlock = `- **Product SHA:** \`${PRODUCT_SHA}\` (owner visual pass VIS2 — home payment navigation)
- **Previous baseline:** \`${PREVIOUS_SHA}\`
- Home segmented navigation: \`Последние | Все | История\`
- Authorized \`Последние\`: 4 recent-operation rows; 2% bonus display preserved
- Guest \`+500 Б\` registration row preserved
- \`LGC-SCR-026\` retired; \`/legacy/home?historyLink=filter\` is compatibility alias of \`LGC-SCR-025\`
- Logical screens: **93**; actions: **${actions.length}**; business processes: **22**
- Delta record: [2026-09-01 home payment navigation](../changes/2026-09-01-home-payment-navigation.md)`;

for (const rel of ['docs/business/AI_HANDOFF_INDEX.md', 'docs/business/discovery/AI_HANDOFF_INDEX.md']) {
  let md = readRoot(rel);
  md = md.replace(/- \*\*Product SHA:\*\* `[^`]+`[\s\S]*?(?=- Delta records:|- Delta record:)/, `${handoffBlock}\n`);
  md = md.replace(/The discovery package records \d+ logical screens, \d+ actions/, `The discovery package records 93 logical screens, ${actions.length} actions`);
  writeRoot(rel, md);
}

console.log(
  JSON.stringify(
    {
      product_sha: PRODUCT_SHA,
      screens: screens.length,
      actions: actions.length,
      flows: flows.length,
      pngs: pngCount,
    },
    null,
    2,
  ),
);
