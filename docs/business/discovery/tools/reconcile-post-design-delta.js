/**
 * CASHELLO-POST-DESIGN-DELTA-RECONCILIATION-001
 * Targeted manifest reconciliation for director visual pass (5977543).
 * Does not modify product code.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');
const MANIFESTS = path.join(__dirname, '..', 'manifests');
const CAPTURE_PLAN = path.join(__dirname, 'capture-plan.js');
const ANNOTATED = path.join(ROOT, 'docs/business/discovery/screenshots/annotated');

const PRODUCT_SHA = '597754364ada9dc1f51f62fe86b41a2bc0b24e4b';
const PRE_DESIGN_SHA = '2359692f3ded08fdea66b5ea260f485e894dfd7b';

const REMOVED_ACTIONS = new Set([
  'ACT-HOME-001-06',
  'ACT-HOME-001-07',
  'ACT-HOME-001-08',
  'ACT-HOME-001-09',
  'ACT-HOME-001-10',
  'ACT-HOME-001-11',
  'ACT-LGC-SCR-025-06',
  'ACT-LGC-SCR-025-07',
  'ACT-LGC-SCR-025-08',
  'ACT-LGC-SCR-025-09',
  'ACT-LGC-SCR-025-11',
  'ACT-LGC-SCR-026-06',
  'ACT-LGC-SCR-026-07',
  'ACT-LGC-SCR-026-08',
  'ACT-LGC-SCR-026-09',
  'ACT-LGC-SCR-026-11',
  'ACT-CAS-HOME-005-01',
  'ACT-CAS-HOME-005-02',
  'ACT-CAS-HOME-005-03',
]);

const RECENT_OPS = [
  { id: 'ubet', label: 'Ubet', phone: '7078789911', amount: 5000 },
  { id: 'oinabet', label: 'Oinabet', phone: '7051234567', amount: 20000 },
  { id: 'tennisi', label: 'Tennisi', phone: '7017891234', amount: 1500 },
  { id: 'zaimer', label: 'Робокэш / Займер', phone: '7055551234', amount: 10000 },
  { id: 'creditbar', label: 'CreditBar', phone: '7070112233', amount: 3500 },
  { id: 'icredit', label: 'i-credit.kz', phone: '7088887766', amount: 7500 },
  { id: 'kengo', label: 'Kengo', phone: '7012345678', amount: 12000 },
  { id: 'satcredit', label: 'Sat Credit', phone: '7098765432', amount: 2500 },
];

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(MANIFESTS, name), 'utf8'));
}
function save(name, data) {
  fs.writeFileSync(path.join(MANIFESTS, name), `${JSON.stringify(data, null, 2)}\n`);
}

function actionTemplate({
  action_id,
  screen_id,
  callout,
  label,
  control_type,
  destination_type,
  destination,
  handler,
  mock_effect = 'CURRENT_MOCK_BEHAVIOR — PROTOTYPE_UI_ONLY preview data',
  guest_behavior = 'Same observable behavior unless noted',
}) {
  return {
    action_id,
    screen_id,
    callout,
    label,
    control_type,
    current_destination_type: destination_type,
    current_destination: destination,
    handler,
    mock_effect,
    precondition: 'Screen visible',
    potential_backend_requirement: 'None identified from current UI',
    guest_behavior,
    component: 'src/features/legacyHome/HomeScreen.tsx',
    icon_meaning: null,
    source_trace: [
      'src/features/legacyHome/HomeScreen.tsx',
      'src/features/legacyHome/recentOperationsPreview.ts',
    ],
    owner_questions: [],
  };
}

function stripActions(list) {
  return list.filter((id) => !REMOVED_ACTIONS.has(id));
}

function mergeUnique(list, ...items) {
  return [...new Set([...(list || []), ...items])];
}

function upsertAction(record) {
  const index = actions.findIndex((a) => a.action_id === record.action_id);
  if (index >= 0) actions[index] = { ...actions[index], ...record };
  else actions.push(record);
}

function replaceInArrays(obj, key) {
  if (!Array.isArray(obj[key])) return;
  obj[key] = stripActions(obj[key]);
}

// --- actions.json ---
let actions = load('actions.json');
actions = actions.filter((a) => !REMOVED_ACTIONS.has(a.action_id));

// Update LGC-SCR-025-10 → see-all for recent operations
const seeAll025 = actions.find((a) => a.action_id === 'ACT-LGC-SCR-025-10');
if (seeAll025) {
  seeAll025.callout = '06';
  seeAll025.label = 'См. все';
  seeAll025.control_type = 'link';
  seeAll025.current_destination_type = 'ROUTE';
  seeAll025.current_destination = '/legacy/history';
  seeAll025.handler = 'router.push(HISTORY_BRIDGES.root)';
  seeAll025.mock_effect = 'None';
  seeAll025.source_trace = ['src/features/legacyHome/HomeScreen.tsx'];
}

// Update LGC-SCR-026-10 → filter link
const filter026 = actions.find((a) => a.action_id === 'ACT-LGC-SCR-026-10');
if (filter026) {
  filter026.callout = '06';
  filter026.label = 'Фильтр';
  filter026.current_destination = '/legacy/history/filter';
  filter026.mock_effect = 'None';
}

// Renumber authorized home tab callouts 12-17 → 15-20
const tabRenumber = [
  ['ACT-LGC-SCR-025-12', '15'],
  ['ACT-LGC-SCR-025-13', '16'],
  ['ACT-LGC-SCR-025-14', '17'],
  ['ACT-LGC-SCR-025-15', '18'],
  ['ACT-LGC-SCR-025-16', '19'],
  ['ACT-LGC-SCR-025-17', '20'],
];
for (const [id, callout] of tabRenumber) {
  const row = actions.find((a) => a.action_id === id);
  if (row) row.callout = callout;
}

const tabRenumber026 = [
  ['ACT-LGC-SCR-026-12', '15'],
  ['ACT-LGC-SCR-026-13', '16'],
  ['ACT-LGC-SCR-026-14', '17'],
  ['ACT-LGC-SCR-026-15', '18'],
  ['ACT-LGC-SCR-026-16', '19'],
];
for (const [id, callout] of tabRenumber026) {
  const row = actions.find((a) => a.action_id === id);
  if (row) row.callout = callout;
}

// Guest bonus row
upsertAction(
  actionTemplate({
    action_id: 'ACT-HOME-001-14',
    screen_id: 'HOME-001',
    callout: '06',
    label: 'Бонус за регистрацию',
    control_type: 'row',
    destination_type: 'GUEST_GATE',
    destination: '/legacy/auth?qaStep=iin',
    handler: 'router.push(HOME_BRIDGES.login)',
    mock_effect:
      'PROTOTYPE_UI_ONLY — registration bonus copy (+500 Б) is mock UI evidence, not production policy',
    guest_behavior: 'Opens auth entry',
  }),
);

// Authorized recent operation rows
RECENT_OPS.forEach((op, index) => {
  const n = String(index + 7).padStart(2, '0');
  const actionId = `ACT-LGC-SCR-025-${18 + index}`;
  const dest = `/legacy/payment/${op.id}?phone=${op.phone}&amount=${op.amount}`;
  upsertAction(
    actionTemplate({
      action_id: actionId,
      screen_id: 'LGC-SCR-025',
      callout: n,
      label: op.label,
      control_type: 'row',
      destination_type: 'ROUTE',
      destination: dest,
      handler: 'router.push(PAYMENT_BRIDGES.service(id, { phoneDigits, amountKzt }))',
    }),
  );
});

// Filter-variant home recent rows
RECENT_OPS.forEach((op, index) => {
  const n = String(index + 7).padStart(2, '0');
  const actionId = `ACT-LGC-SCR-026-${17 + index}`;
  const dest = `/legacy/payment/${op.id}?phone=${op.phone}&amount=${op.amount}`;
  upsertAction(
    actionTemplate({
      action_id: actionId,
      screen_id: 'LGC-SCR-026',
      callout: n,
      label: op.label,
      control_type: 'row',
      destination_type: 'ROUTE',
      destination: dest,
      handler: 'router.push(PAYMENT_BRIDGES.service(id, { phoneDigits, amountKzt }))',
    }),
  );
});

// PAY-002 entry from home prefill
upsertAction({
  action_id: 'ACT-PAY-002-15',
  screen_id: 'PAY-002',
  callout: null,
  label: 'Entry from Home recent operation (prefilled)',
  control_type: 'navigation',
  current_destination_type: 'ROUTE',
  current_destination: '/legacy/payment/[id]?phone=&amount=',
  handler: 'PaymentServiceScreen reads phone/amount search params',
  mock_effect: 'CURRENT_MOCK_BEHAVIOR — prefills phone and amount from Home preview row',
  precondition: 'Authorized Home recent operation tapped',
  potential_backend_requirement: 'None identified from current UI',
  guest_behavior: 'N/A — authorized Home only',
  component: 'src/features/legacyPayment/PaymentServiceScreen.tsx',
  icon_meaning: null,
  source_trace: [
    'src/features/legacyHome/HomeScreen.tsx',
    'src/features/legacyPayment/PaymentServiceScreen.tsx',
    'src/features/legacyPayment/mockData.ts',
  ],
  owner_questions: [],
});

save('actions.json', actions);

// --- screens.json ---
let screens = load('screens.json');
screens = screens.filter((s) => s.screen_id !== 'CAS-HOME-005');

function patchHomeScreen(screenId, exitPatch) {
  const screen = screens.find((s) => s.screen_id === screenId);
  if (!screen) return;
  screen.exit_actions = exitPatch(screen.exit_actions || []);
  if (screenId === 'HOME-001') {
    screen.states = ['GUEST', 'BALANCES_HIDDEN', 'RECENT_OPERATIONS_PREVIEW'];
  }
  if (screenId === 'LGC-SCR-025' || screenId === 'LGC-SCR-026') {
    screen.states = screen.states || [];
    if (!screen.states.includes('RECENT_OPERATIONS_PREVIEW')) {
      screen.states.push('RECENT_OPERATIONS_PREVIEW');
    }
  }
}

patchHomeScreen('HOME-001', (exits) => {
  const base = stripActions(exits);
  return [...base.filter((id) => id !== 'ACT-HOME-001-14'), 'ACT-HOME-001-14'];
});

patchHomeScreen('LGC-SCR-025', (exits) => {
  const base = stripActions(exits);
  const added = RECENT_OPS.map((_, i) => `ACT-LGC-SCR-025-${18 + i}`);
  return [...new Set([...base, ...added])];
});

patchHomeScreen('LGC-SCR-026', (exits) => {
  const base = stripActions(exits);
  const added = RECENT_OPS.map((_, i) => `ACT-LGC-SCR-026-${17 + i}`);
  return [...new Set([...base, ...added])];
});

// PAY-002 screenshot state
const pay2 = screens.find((s) => s.screen_id === 'PAY-002');
if (pay2) {
  pay2.screenshots = pay2.screenshots || [];
  if (!pay2.screenshots.some((s) => s.path.includes('prefilled-from-home'))) {
    pay2.screenshots.push({
      state: 'PREFILLED_FROM_HOME',
      path: 'screenshots/annotated/PAY-002__prefilled-from-home.png',
      note: 'Reached from authorized Home recent operation tap (Ubet row)',
      capture_status: 'CAPTURED',
    });
  }
  if (!pay2.entry_actions) pay2.entry_actions = [];
  if (!pay2.entry_actions.includes('ACT-PAY-002-15')) {
    pay2.entry_actions.push('ACT-PAY-002-15');
  }
}

// Optional scrolled authorized home state
const home025 = screens.find((s) => s.screen_id === 'LGC-SCR-025');
if (home025) {
  home025.screenshots = home025.screenshots || [];
  if (!home025.screenshots.some((s) => s.path.includes('recent-ops-scrolled'))) {
    home025.screenshots.push({
      state: 'RECENT_OPS_SCROLLED',
      path: 'screenshots/annotated/LGC-SCR-025__recent-ops-scrolled.png',
      note: 'Lower recent-operation rows visible after scroll',
      capture_status: 'CAPTURED',
    });
  }
}

// Strip removed actions from all screens entry/exit
for (const screen of screens) {
  replaceInArrays(screen, 'entry_actions');
  replaceInArrays(screen, 'exit_actions');
}

save('screens.json', screens);

// --- flows.json ---
let flows = load('flows.json');
flows = flows.filter((f) => !String(f.flow_id).includes('CAS-HOME-005'));
// Reject invalid temporary BP records — navigation shortcuts belong in existing processes.
flows = flows.filter((f) => !String(f.flow_id).startsWith('BP-HOME-RECENT-'));

function patchFlow(flowId, patch) {
  const flow = flows.find((f) => f.flow_id === flowId);
  if (!flow) return;
  if (patch.screens) flow.screens = mergeUnique(flow.screens, ...patch.screens);
  if (patch.actions) flow.actions = mergeUnique(flow.actions, ...patch.actions);
}

// Guest Home bonus row → alternate entry into BP-AUTH-001 (not a new business process).
patchFlow('BP-AUTH-001', {
  screens: ['HOME-001'],
  actions: ['ACT-HOME-001-14'],
});

// Authorized Home recent-operation rows → alternate entry into BP-PAY-001.
const payAlternateActions = [
  ...RECENT_OPS.map((_, index) => `ACT-LGC-SCR-025-${18 + index}`),
  ...RECENT_OPS.map((_, index) => `ACT-LGC-SCR-026-${17 + index}`),
  'ACT-PAY-002-15',
];
patchFlow('BP-PAY-001', {
  screens: ['LGC-SCR-025', 'LGC-SCR-026'],
  actions: payAlternateActions,
});

for (const flow of flows) {
  if (Array.isArray(flow.actions)) flow.actions = stripActions(flow.actions);
}

save('flows.json', flows);

// --- owner_questions.json — reference cleanup only ---
let questions = load('owner_questions.json');
for (const q of questions) {
  if (Array.isArray(q.action_ids)) q.action_ids = stripActions(q.action_ids);
}
save('owner_questions.json', questions);

// --- capture-plan.js ---
let captureSrc = fs.readFileSync(CAPTURE_PLAN, 'utf8');
captureSrc = captureSrc.replace(
  /'HOME-001__guest-home\.png': \{ url: '\/legacy\/home\?guest=1', waitText: 'Войти' \},/,
  `'HOME-001__guest-home.png': { url: '/legacy/home?guest=1', waitText: 'Последние операции' },`,
);
captureSrc = captureSrc.replace(
  /'LGC-SCR-025__authorized-home\.png': \{ url: '\/legacy\/home', waitText: 'Вывести' \},/,
  `'LGC-SCR-025__authorized-home.png': { url: '/legacy/home', waitText: 'Последние операции' },`,
);
captureSrc = captureSrc.replace(
  /'LGC-SCR-026__history-filter-link\.png': \{\s*url: '\/legacy\/home\?historyLink=filter',\s*waitText: 'Фильтр',\s*\},/,
  `'LGC-SCR-026__history-filter-link.png': { url: '/legacy/home?historyLink=filter', waitText: 'Последние операции' },`,
);

if (!captureSrc.includes('PAY-002__prefilled-from-home')) {
  captureSrc = captureSrc.replace(
    "'PAY-002__ubet.png': { url: '/legacy/payment/ubet', waitText: 'Ubet' },",
    `'PAY-002__prefilled-from-home.png': {
    url: '/legacy/home',
    waitText: 'Последние операции',
    steps: [{ clickAria: 'Ubet' }, { wait: 600 }],
  },
  'PAY-002__ubet.png': { url: '/legacy/payment/ubet', waitText: 'Ubet' },`,
  );
}

if (!captureSrc.includes('LGC-SCR-025__recent-ops-scrolled')) {
  captureSrc = captureSrc.replace(
    `'LGC-SCR-025__balances-hidden.png': {`,
    `'LGC-SCR-025__recent-ops-scrolled.png': {
    url: '/legacy/home',
    waitText: 'Последние операции',
    steps: [{ evaluateScroll: 280 }],
  },
  'LGC-SCR-025__balances-hidden.png': {`,
  );
}

// Remove obsolete CAS-HOME-005 recipe
captureSrc = captureSrc.replace(
  /\s*'CAS-HOME-005__history-action-sheet\.png': \{[\s\S]*?\},\n/,
  '\n',
);

fs.writeFileSync(CAPTURE_PLAN, captureSrc);

// Remove obsolete screenshot file
const obsoletePng = path.join(ANNOTATED, 'CAS-HOME-005__history-action-sheet.png');
if (fs.existsSync(obsoletePng)) fs.unlinkSync(obsoletePng);

console.log(
  JSON.stringify(
    {
      product_sha: PRODUCT_SHA,
      pre_design_sha: PRE_DESIGN_SHA,
      removed_actions: REMOVED_ACTIONS.size,
      screens: screens.length,
      actions: actions.length,
      flows: flows.length,
      questions: questions.length,
      removed_screen: 'CAS-HOME-005',
    },
    null,
    2,
  ),
);
