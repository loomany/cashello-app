/**
 * CASHELLO-OWNER-VISUAL-PASS-002-RECONCILE — targeted manifest reconciliation.
 * Product SHA: 86e9d3bee9ca13a82474f4acdcdec8f5d0eb3134
 * Does not modify product src/**.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');
const MANIFESTS = path.join(__dirname, '..', 'manifests');
const CAPTURE_PLAN = path.join(__dirname, 'capture-plan.js');
const ANNOTATED = path.join(ROOT, 'docs/business/discovery/screenshots/annotated');

const PRODUCT_SHA = '86e9d3bee9ca13a82474f4acdcdec8f5d0eb3134';
const PREVIOUS_SHA = 'dbb0acd38228321e7e3dd0132974bbcf294a878c';

/** Authorized Home shows 4 recent-operation preview rows (VIS2-003). */
const RECENT_OPS = [
  { id: 'ubet', label: 'Ubet', phone: '7078789911', amount: 5000 },
  { id: 'oinabet', label: 'Oinabet', phone: '7051234567', amount: 20000 },
  { id: 'tennisi', label: 'Tennisi', phone: '7017891234', amount: 1500 },
  { id: 'zaimer', label: 'Робокэш / Займер', phone: '7055551234', amount: 10000 },
];

const REMOVED_026_IDS = [1, 2, 3, 4, 5, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map(
  (n) => `ACT-LGC-SCR-026-${String(n).padStart(2, '0')}`,
);
const REMOVED_ACTION_IDS = new Set([
  ...REMOVED_026_IDS,
  'ACT-LGC-SCR-025-22',
  'ACT-LGC-SCR-025-23',
  'ACT-LGC-SCR-025-24',
  'ACT-LGC-SCR-025-25',
]);

const HOME_SEGMENT_WAIT = 'Последние';

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(MANIFESTS, name), 'utf8'));
}
function save(name, data) {
  fs.writeFileSync(path.join(MANIFESTS, name), `${JSON.stringify(data, null, 2)}\n`);
}

function actionTemplate(record) {
  return {
    mock_effect: 'None',
    precondition: 'Screen visible',
    potential_backend_requirement: 'None identified from current UI',
    guest_behavior: 'Same observable behavior unless noted',
    component: 'src/features/legacyHome/HomeScreen.tsx',
    icon_meaning: null,
    source_trace: [
      'src/features/legacyHome/HomeScreen.tsx',
      'src/features/legacyHome/paymentsSegment.ts',
    ],
    owner_questions: [],
    ...record,
  };
}

function stripRemoved(list) {
  return (list || []).filter((id) => !REMOVED_ACTION_IDS.has(id) && !id.startsWith('ACT-LGC-SCR-026-'));
}

function upsertAction(actions, record) {
  const index = actions.findIndex((a) => a.action_id === record.action_id);
  if (index >= 0) actions[index] = { ...actions[index], ...record };
  else actions.push(record);
}

// --- actions.json ---
let actions = load('actions.json');
const actionsBefore = actions.length;
actions = actions.filter((a) => !REMOVED_ACTION_IDS.has(a.action_id) && a.screen_id !== 'LGC-SCR-026');

upsertAction(
  actions,
  actionTemplate({
    action_id: 'ACT-LGC-SCR-025-06',
    screen_id: 'LGC-SCR-025',
    callout: '06',
    label: 'Последние',
    control_type: 'segment',
    current_destination_type: 'LOCAL_STATE',
    current_destination: 'paymentsTab=recent',
    handler: 'resolvePaymentsSegmentHref(recent) → null',
    mock_effect: 'Active segment — shows 4 recent-operation preview rows; no navigation',
    source_trace: [
      'src/features/legacyHome/HomeScreen.tsx',
      'src/features/legacyHome/paymentsSegment.ts',
    ],
  }),
);

upsertAction(
  actions,
  actionTemplate({
    action_id: 'ACT-LGC-SCR-025-07',
    screen_id: 'LGC-SCR-025',
    callout: '07',
    label: 'Все',
    control_type: 'segment',
    current_destination_type: 'ROUTE',
    current_destination: '/legacy/payment',
    handler: 'router.push(PAYMENT_BRIDGES.root)',
    source_trace: [
      'src/features/legacyHome/HomeScreen.tsx',
      'src/features/legacyHome/paymentsSegment.ts',
    ],
  }),
);

const historySegment = actions.find((a) => a.action_id === 'ACT-LGC-SCR-025-10');
if (historySegment) {
  Object.assign(historySegment, {
    callout: '08',
    label: 'История',
    control_type: 'segment',
    current_destination_type: 'ROUTE',
    current_destination: '/legacy/history',
    handler: 'router.push(HISTORY_BRIDGES.root)',
    source_trace: [
      'src/features/legacyHome/HomeScreen.tsx',
      'src/features/legacyHome/paymentsSegment.ts',
    ],
  });
}

RECENT_OPS.forEach((op, index) => {
  const n = String(index + 9).padStart(2, '0');
  const actionId = `ACT-LGC-SCR-025-${18 + index}`;
  upsertAction(
    actions,
    actionTemplate({
      action_id: actionId,
      screen_id: 'LGC-SCR-025',
      callout: n,
      label: op.label,
      control_type: 'row',
      current_destination_type: 'ROUTE',
      current_destination: `/legacy/payment/${op.id}?phone=${op.phone}&amount=${op.amount}`,
      handler: 'router.push(recentOperationPaymentHref(row))',
      mock_effect: 'CURRENT_MOCK_BEHAVIOR — preview catalog row with 2% bonus display',
      source_trace: [
        'src/features/legacyHome/HomeScreen.tsx',
        'src/features/legacyHome/recentOperationsPreview.ts',
        'src/features/legacyHome/paymentsSegment.ts',
      ],
    }),
  );
});

upsertAction(
  actions,
  actionTemplate({
    action_id: 'ACT-HOME-001-06',
    screen_id: 'HOME-001',
    callout: '06',
    label: 'Последние',
    control_type: 'segment',
    current_destination_type: 'LOCAL_STATE',
    current_destination: 'paymentsTab=recent',
    handler: 'resolvePaymentsSegmentHref(recent) → null',
    mock_effect: 'Active segment — guest registration bonus preview row; no navigation',
    guest_behavior: 'Stays on guest Home',
  }),
);

upsertAction(
  actions,
  actionTemplate({
    action_id: 'ACT-HOME-001-15',
    screen_id: 'HOME-001',
    callout: '07',
    label: 'Все',
    control_type: 'segment',
    current_destination_type: 'GUEST_GATE',
    current_destination: '/legacy/auth?qaStep=iin',
    handler: 'router.push(HOME_BRIDGES.login)',
    guest_behavior: 'Opens auth entry',
  }),
);

upsertAction(
  actions,
  actionTemplate({
    action_id: 'ACT-HOME-001-16',
    screen_id: 'HOME-001',
    callout: '08',
    label: 'История',
    control_type: 'segment',
    current_destination_type: 'GUEST_GATE',
    current_destination: '/legacy/auth?qaStep=iin',
    handler: 'router.push(HOME_BRIDGES.login)',
    guest_behavior: 'Opens auth entry',
  }),
);

save('actions.json', actions);

// --- screens.json ---
let screens = load('screens.json');
const screensBefore = screens.length;
screens = screens.filter((s) => s.screen_id !== 'LGC-SCR-026');

const home001 = screens.find((s) => s.screen_id === 'HOME-001');
if (home001) {
  home001.exit_actions = stripRemoved([
    'ACT-HOME-001-01',
    'ACT-HOME-001-02',
    'ACT-HOME-001-03',
    'ACT-HOME-001-04',
    'ACT-HOME-001-05',
    'ACT-HOME-001-06',
    'ACT-HOME-001-15',
    'ACT-HOME-001-16',
    'ACT-HOME-001-12',
    'ACT-HOME-001-13',
    'ACT-HOME-001-14',
  ]);
}

const home025 = screens.find((s) => s.screen_id === 'LGC-SCR-025');
if (home025) {
  home025.name = 'Главная авторизованного пользователя';
  home025.route_aliases = ['/legacy/home?historyLink=filter'];
  home025.legacy_route_notes = [
    {
      route: '/legacy/home?historyLink=filter',
      classification: 'LEGACY_ROUTE_ALIAS',
      canonical_screen_id: 'LGC-SCR-025',
      note: 'Compatibility alias — query ignored; not a separate logical screen (LGC-SCR-026 retired)',
    },
  ];
  home025.screenshots = (home025.screenshots || []).filter(
    (s) => !s.path.includes('recent-ops-scrolled'),
  );
  home025.states = (home025.states || []).filter((s) => s !== 'RECENT_OPS_SCROLLED');
  home025.entry_actions = stripRemoved(home025.entry_actions);
  home025.exit_actions = stripRemoved([
    'ACT-LGC-SCR-025-01',
    'ACT-LGC-SCR-025-02',
    'ACT-LGC-SCR-025-03',
    'ACT-LGC-SCR-025-04',
    'ACT-LGC-SCR-025-05',
    'ACT-LGC-SCR-025-06',
    'ACT-LGC-SCR-025-07',
    'ACT-LGC-SCR-025-10',
    ...RECENT_OPS.map((_, i) => `ACT-LGC-SCR-025-${18 + i}`),
    'ACT-LGC-SCR-025-12',
    'ACT-LGC-SCR-025-13',
    'ACT-LGC-SCR-025-14',
    'ACT-LGC-SCR-025-15',
    'ACT-LGC-SCR-025-16',
    'ACT-LGC-SCR-025-17',
  ]);
}

for (const screen of screens) {
  screen.entry_actions = stripRemoved(screen.entry_actions);
  screen.exit_actions = stripRemoved(screen.exit_actions);
}

save('screens.json', screens);

// --- flows.json ---
let flows = load('flows.json');
for (const flow of flows) {
  if (Array.isArray(flow.screens)) {
    flow.screens = flow.screens.filter((id) => id !== 'LGC-SCR-026');
  }
  if (Array.isArray(flow.actions)) {
    flow.actions = stripRemoved(flow.actions);
  }
}

const payAlternateActions = [
  'ACT-LGC-SCR-025-07',
  ...RECENT_OPS.map((_, index) => `ACT-LGC-SCR-025-${18 + index}`),
  'ACT-PAY-002-15',
];
const histAlternateActions = ['ACT-LGC-SCR-025-10'];
const authGuestSegmentActions = ['ACT-HOME-001-15', 'ACT-HOME-001-16'];

function patchFlow(flowId, patch) {
  const flow = flows.find((f) => f.flow_id === flowId);
  if (!flow) return;
  if (patch.screens) {
    flow.screens = [...new Set([...(flow.screens || []), ...patch.screens])].filter(
      (id) => id !== 'LGC-SCR-026',
    );
  }
  if (patch.actions) {
    flow.actions = [...new Set([...(flow.actions || []), ...patch.actions])];
    flow.actions = stripRemoved(flow.actions);
  }
}

patchFlow('BP-PAY-001', {
  screens: ['LGC-SCR-025'],
  actions: payAlternateActions,
});
patchFlow('BP-HIST-001', {
  screens: ['LGC-SCR-025'],
  actions: histAlternateActions,
});
patchFlow('BP-AUTH-001', {
  screens: ['HOME-001'],
  actions: [...authGuestSegmentActions, 'ACT-HOME-001-14'],
});

save('flows.json', flows);

// --- owner_questions.json — strip retired action refs ---
let questions = load('owner_questions.json');
for (const q of questions) {
  if (Array.isArray(q.action_ids)) q.action_ids = stripRemoved(q.action_ids);
}
save('owner_questions.json', questions);

// --- capture-plan.js ---
let captureSrc = fs.readFileSync(CAPTURE_PLAN, 'utf8');
captureSrc = captureSrc.replace(
  /'HOME-001__guest-home\.png': \{ url: '\/legacy\/home\?guest=1', waitText: '[^']+' \},/,
  `'HOME-001__guest-home.png': { url: '/legacy/home?guest=1', waitText: '${HOME_SEGMENT_WAIT}' },`,
);
captureSrc = captureSrc.replace(
  /'LGC-SCR-025__authorized-home\.png': \{ url: '\/legacy\/home', waitText: '[^']+' \},/,
  `'LGC-SCR-025__authorized-home.png': { url: '/legacy/home', waitText: '${HOME_SEGMENT_WAIT}' },`,
);
captureSrc = captureSrc.replace(
  /\s*'LGC-SCR-025__recent-ops-scrolled\.png': \{[\s\S]*?\},\n/,
  '\n',
);
captureSrc = captureSrc.replace(
  /\s*'LGC-SCR-026__history-filter-link\.png': \{[\s\S]*?\},\n/,
  '\n',
);
if (captureSrc.includes("'PAY-002__prefilled-from-home.png'")) {
  captureSrc = captureSrc.replace(
    /'PAY-002__prefilled-from-home\.png': \{[\s\S]*?\},/,
    `'PAY-002__prefilled-from-home.png': {
    url: '/legacy/home',
    waitText: '${HOME_SEGMENT_WAIT}',
    steps: [{ clickAria: 'Ubet' }, { wait: 600 }],
  },`,
  );
}
fs.writeFileSync(CAPTURE_PLAN, captureSrc);

// --- remove obsolete screenshots ---
for (const file of [
  'LGC-SCR-026__history-filter-link.png',
  'LGC-SCR-025__recent-ops-scrolled.png',
]) {
  const p = path.join(ANNOTATED, file);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

const report = {
  product_sha: PRODUCT_SHA,
  previous_sha: PREVIOUS_SHA,
  screens_before: screensBefore,
  screens_after: screens.length,
  actions_before: actionsBefore,
  actions_after: actions.length,
  removed_action_ids: [...REMOVED_ACTION_IDS].sort(),
  added_action_ids: [
    'ACT-LGC-SCR-025-06',
    'ACT-LGC-SCR-025-07',
    'ACT-HOME-001-06',
    'ACT-HOME-001-15',
    'ACT-HOME-001-16',
  ],
  updated_action_ids: ['ACT-LGC-SCR-025-10', ...RECENT_OPS.map((_, i) => `ACT-LGC-SCR-025-${18 + i}`)],
  retired_screen: 'LGC-SCR-026',
  retired_state: 'RECENT_OPS_SCROLLED',
  removed_screenshots: [
    'LGC-SCR-026__history-filter-link.png',
    'LGC-SCR-025__recent-ops-scrolled.png',
  ],
};

fs.writeFileSync(
  path.join(__dirname, '.vis2-reconcile-report.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(JSON.stringify(report, null, 2));
