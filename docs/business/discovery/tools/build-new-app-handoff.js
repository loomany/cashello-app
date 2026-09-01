#!/usr/bin/env node
/**
 * Generate clean-room NEW Cashello handoff artifacts from source-derived inventory.
 * Run: node docs/business/discovery/tools/build-new-app-handoff.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../../../..');
const { AUDIT_DATE, START_HEAD, ENTRY, ROUTES, SCREENS } = require('./new-app-handoff-data');
const { ACTIONS } = require('./new-app-actions-data');
const { writeManifest: writeSourceInteractions } = require('./source-interaction-inventory');
const cls = require('./handoff-classification');

function endHead() {
  try {
    return execSync('git rev-parse HEAD', { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    return START_HEAD;
  }
}

function writeJson(rel, data) {
  const p = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
  console.log('WROTE', rel, `(${Array.isArray(data) ? data.length : 'obj'} rows)`);
}

function mdTable(headers, rows) {
  const sep = headers.map(() => '---');
  const lines = [
    `| ${headers.join(' | ')} |`,
    `| ${sep.join(' | ')} |`,
    ...rows.map((r) => `| ${r.join(' | ')} |`),
  ];
  return lines.join('\n');
}

// --- Validate action → screen refs ---
const screenIds = new Set(SCREENS.map((s) => s.screen_id));
for (const a of ACTIONS) {
  if (!screenIds.has(a.screen_id)) {
    console.error('Action', a.action_id, 'refs missing screen', a.screen_id);
    process.exit(1);
  }
}

// --- Route map ---
writeJson('docs/business/NEW_APP_ROUTE_MAP.json', ROUTES);

// --- Screen catalog ---
writeJson('docs/business/NEW_APP_SCREEN_CATALOG.json', SCREENS);

// --- Action catalog ---
writeJson('docs/business/NEW_APP_ACTION_CATALOG.json', ACTIONS);

// --- SCREEN_API_MATRIX (no screenshot_ref) ---
const MVP_NO_BACKEND = new Set(['OUT_OF_MVP', 'FUTURE', 'PARKED_ILYA', 'LATER', 'STUB', 'DEV_ONLY', 'ORPHANED', 'CURRENT_UI_GAP', 'MVP_TARGET']);

function mapMvpStatus(mvp) {
  if (mvp === 'MVP' || mvp === 'MVP_PARTIAL_PENDING') return mvp === 'MVP' ? 'MVP_APPROVED' : 'MVP_PARTIAL_PENDING';
  if (mvp === 'MVP_TARGET') return 'CURRENT_UI_GAP';
  if (mvp === 'FUTURE') return 'FUTURE';
  if (mvp === 'PARKED_ILYA') return 'PARKED_ILYA';
  if (mvp === 'OUT_OF_MVP') return 'OUT_OF_MVP';
  if (mvp === 'LATER') return 'LATER';
  if (mvp === 'STUB' || mvp === 'DEV_ONLY' || mvp === 'ORPHANED') return mvp === 'ORPHANED' ? 'ORPHANED' : 'STUB';
  return mvp;
}

const matrix = ACTIONS.map((a) => {
  const screen = SCREENS.find((s) => s.screen_id === a.screen_id) || {};
  const mvpStatus = mapMvpStatus(a.mvp_status);
  let backendNeeded = a.backend_needed;
  if (MVP_NO_BACKEND.has(mvpStatus) || MVP_NO_BACKEND.has(a.mvp_status)) backendNeeded = 'no';
  if (a.backend_needed === 'config_only') backendNeeded = 'config_only';

  const blocker =
    mvpStatus === 'PARKED_ILYA'
      ? 'PARKED_ILYA'
      : mvpStatus === 'FUTURE'
        ? 'FUTURE_NO_MVP_BACKEND'
        : mvpStatus === 'OUT_OF_MVP'
          ? 'OUT_OF_SCOPE'
          : mvpStatus === 'LATER'
            ? 'LATER'
            : mvpStatus === 'CURRENT_UI_GAP'
              ? 'CURRENT_UI_GAP'
              : mvpStatus === 'ORPHANED' || mvpStatus === 'STUB'
                ? 'NOT_IN_CURRENT_APP'
                : null;

  return {
    action_id: a.action_id,
    screen_id: a.screen_id,
    route: a.route || screen.route || null,
    auth_mode: screen.auth_mode || 'UNKNOWN',
    control_label: a.control_label,
    current_ui_behavior: a.current_ui_behavior,
    destination_route: a.destination,
    business_purpose: a.business_purpose,
    mvp_status: mvpStatus,
    owner_decision_ids: (a.owner_decision_ids || []).join(', ') || null,
    backend_needed: backendNeeded,
    backend_capability: a.backend_capability || (backendNeeded === 'yes' ? 'OWNER_DECISION_REQUIRED' : null),
    suggested_api_operation: a.backend_capability || (backendNeeded === 'yes' ? 'OWNER_DECISION_REQUIRED' : 'DO_NOT_IMPLEMENT'),
    request_data: a.request_data || (backendNeeded === 'yes' ? 'OWNER_DECISION_REQUIRED' : 'UNKNOWN'),
    response_data_needed_by_ui: a.response_data || (backendNeeded === 'yes' ? 'OWNER_DECISION_REQUIRED' : 'UNKNOWN'),
    loading_state: a.loading_state || 'UNKNOWN',
    success_state: a.success_state || 'UNKNOWN',
    empty_state: a.empty_state || 'UNKNOWN',
    error_state: a.error_state || 'UNKNOWN',
    retry_behavior: a.retry_behavior || 'UNKNOWN',
    source_ref: a.source_file,
    notes: a.notes || blocker,
    blocker,
  };
});

writeJson('docs/backend/SCREEN_API_MATRIX.json', matrix);

// --- BUSINESS_PROCESS_SPEC ---
const PROCESSES = [
  { process_id: 'BP-AUTH-001', name: 'Регистрация нового пользователя', mvp_status: 'MVP', actors: 'GUEST', preconditions: 'Valid phone; WhatsApp reachable', trigger: 'Guest login CTA or gated action', happy_path: 'Phone → WhatsApp OTP → PIN create → confirm → authorized home', alternate_paths: 'Invalid phone; OTP fail; PIN mismatch', error_paths: 'Validation errors; OTP timeout', money_effect: 'None', backend_owned: 'auth.resolvePhone, auth.requestOtp, auth.verifyOtp, auth.setPin, session', frontend_owned: 'Auth UI steps NEW-AUTH-003..015 (not KYC)', screens: 'NEW-AUTH-003,NEW-AUTH-011,NEW-AUTH-012,NEW-AUTH-013,NEW-HOME-001', actions: 'NEW-ACT-HOME-G10,NEW-ACT-AUTH-01,NEW-ACT-AUTH-02,NEW-ACT-AUTH-03', history_effect: 'None', notifications: 'PARKED_ILYA Q-NOTIF-001', owner_decisions: 'Q-AUTH-001,Q-AUTH-002,Q-AUTH-010', open_questions: 'Q-AUTH-003..012', stop_conditions: 'Do not implement KYC steps as registration requirement until Q-KYC-001 resolved' },
  { process_id: 'BP-AUTH-002', name: 'Вход возвращающегося пользователя', mvp_status: 'MVP', actors: 'GUEST', preconditions: 'Existing user; single session policy', trigger: 'Phone resolves as returning user', happy_path: 'Phone → OTP → PIN login → authorized home', alternate_paths: 'Wrong PIN retry', error_paths: 'Session revoked on other device', money_effect: 'None', backend_owned: 'auth.loginPin, session revoke', frontend_owned: 'NEW-AUTH-015', screens: 'NEW-AUTH-011,NEW-AUTH-015', actions: 'NEW-ACT-AUTH-02,NEW-ACT-AUTH-04', history_effect: 'None', notifications: 'PARKED_ILYA', owner_decisions: 'Q-AUTH-010', open_questions: 'Q-AUTH-006..009', stop_conditions: null },
  { process_id: 'BP-KYC-001', name: 'Идентификация (KYC prototype)', mvp_status: 'PARKED_ILYA', actors: 'AUTHORIZED', preconditions: 'Q-KYC-001 answered', trigger: 'Auth KYC chain or profile status', happy_path: 'OWNER_DECISION_REQUIRED', alternate_paths: 'N/A', error_paths: 'N/A', money_effect: 'UNKNOWN', backend_owned: 'DO_NOT_IMPLEMENT', frontend_owned: 'NEW-AUTH-004..010, NEW-PROF-002', screens: 'NEW-AUTH-004..010,NEW-PROF-002', actions: 'NEW-ACT-KYC-01,NEW-ACT-PROF-01', history_effect: 'None', notifications: 'N/A', owner_decisions: 'Q-KYC-001', open_questions: 'All Q-KYC-*', stop_conditions: 'PARKED — no backend' },
  { process_id: 'BP-ACC-001', name: 'Просмотр балансов на Home', mvp_status: 'MVP', actors: 'AUTHORIZED', preconditions: 'Four default accounts exist Q-ACC-001', trigger: 'Authorized home load', happy_path: 'Display KZT/RUB/USD + bonus balances', alternate_paths: 'Hide/show balance toggle', error_paths: 'Fetch failure', money_effect: 'Read-only', backend_owned: 'accounts.list, balances', frontend_owned: 'NEW-HOME-002 carousel', screens: 'NEW-HOME-002', actions: 'NEW-ACT-HOME-A01,NEW-ACT-HOME-G03', history_effect: 'None', notifications: 'N/A', owner_decisions: 'Q-ACC-001,Q-ACC-005', open_questions: 'Q-ACC-003,Q-ACC-004', stop_conditions: null },
  { process_id: 'BP-ACC-002', name: 'Открытие счета', mvp_status: 'PARKED_ILYA', actors: 'AUTHORIZED', preconditions: 'Q-ACC-002', trigger: 'Orphaned accounts UI only', happy_path: 'N/A in current nav', alternate_paths: 'N/A', error_paths: 'N/A', money_effect: 'N/A', backend_owned: 'PARKED', frontend_owned: 'NEW-ORPH-002 unreachable', screens: 'NEW-ORPH-002', actions: 'NONE_IN_CURRENT_APP', history_effect: 'N/A', notifications: 'N/A', owner_decisions: 'Q-ACC-002', open_questions: 'Q-ACC-002', stop_conditions: 'Not reachable in current app' },
  { process_id: 'BP-TOPUP-001', name: 'Пополнение картой', mvp_status: 'MVP', actors: 'AUTHORIZED', preconditions: 'No cash top-up Q-TOPUP-001', trigger: 'Home top-up → card method', happy_path: 'Select card top-up → enter amount/card → submit → balance update', alternate_paths: 'Saved card picker', error_paths: 'Decline; limit exceeded', money_effect: 'Credit account', backend_owned: 'topup.card, dynamic fee Q-TOPUP-004', frontend_owned: 'NEW-TOPUP-002', screens: 'NEW-SHEET-TOPUP-001,NEW-TOPUP-002', actions: 'NEW-ACT-TOP-S02,NEW-ACT-TOP-02', history_effect: 'New top-up operation', notifications: 'UNKNOWN', owner_decisions: 'Q-TOPUP-001,Q-TOPUP-004', open_questions: 'Provider selection', stop_conditions: 'No cash desks' },
  { process_id: 'BP-TOPUP-002', name: 'Пополнение наличными', mvp_status: 'OUT_OF_MVP', actors: 'N/A', preconditions: 'Removed Q-TOPUP-001', trigger: 'Unreachable cash routes', happy_path: 'DO NOT IMPLEMENT', alternate_paths: 'N/A', error_paths: 'N/A', money_effect: 'N/A', backend_owned: 'DO_NOT_IMPLEMENT', frontend_owned: 'NEW-OLD-CASH-TOPUP unreachable', screens: 'NEW-OLD-CASH-TOPUP', actions: 'NONE', history_effect: 'N/A', notifications: 'N/A', owner_decisions: 'Q-TOPUP-001', open_questions: 'N/A', stop_conditions: 'OUT_OF_MVP' },
  { process_id: 'BP-TRF-001', name: 'Между своими счетами', mvp_status: 'MVP_PARTIAL_PENDING', actors: 'AUTHORIZED', preconditions: 'Multiple accounts', trigger: 'Top-up sheet → between accounts', happy_path: 'Select from/to → amount → FX quote → confirm', alternate_paths: 'Over-balance rules', error_paths: 'Insufficient funds', money_effect: 'Transfer between own accounts', backend_owned: 'transfers.internal, FX quote Q-TRF-001', frontend_owned: 'NEW-TOPUP-001', screens: 'NEW-TOPUP-001', actions: 'NEW-ACT-TOP-S01,NEW-ACT-TOP-01', history_effect: 'Internal transfer record', notifications: 'UNKNOWN', owner_decisions: 'Q-TRF-001,Q-TRF-004,Q-ACC-005', open_questions: 'FX markup', stop_conditions: 'FX rules parked' },
  { process_id: 'BP-P2P-001', name: 'P2P Cashello user by phone', mvp_status: 'MVP_PARTIAL_PENDING', actors: 'AUTHORIZED', preconditions: 'Recipient phone Q-P2P-001', trigger: 'Withdraw sheet → Cashhello user', happy_path: 'Enter phone → lookup → amount → confirm → send', alternate_paths: 'User not found', error_paths: 'Limit exceeded', money_effect: 'Debit sender; credit recipient', backend_owned: 'p2p.lookupRecipient, p2p.create, limits Q-P2P-006', frontend_owned: 'NEW-WD-003', screens: 'NEW-WD-003', actions: 'NEW-ACT-WD-S03,NEW-ACT-WD-03,NEW-ACT-WD-04', history_effect: 'P2P operations in history', notifications: 'UNKNOWN', owner_decisions: 'Q-P2P-001,Q-P2P-006', open_questions: 'Q-P2P-002,Q-P2P-003,Q-P2P-005', stop_conditions: 'NOT cash withdrawal — route /withdraw/cashhello-user' },
  { process_id: 'BP-WD-001', name: 'Вывод на карту', mvp_status: 'MVP', actors: 'AUTHORIZED', preconditions: 'Non-cash withdraw Q-WD-001', trigger: 'Withdraw sheet → card', happy_path: 'Enter card/amount → fee quote → submit → processing', alternate_paths: 'Saved cards', error_paths: 'Limit/fee errors', money_effect: 'Debit account', backend_owned: 'withdraw.create, dynamic fee Q-WD-003', frontend_owned: 'NEW-WD-001,NEW-WD-004', screens: 'NEW-WD-001,NEW-WD-004', actions: 'NEW-ACT-WD-S01,NEW-ACT-WD-01', history_effect: 'Withdrawal record', notifications: 'UNKNOWN', owner_decisions: 'Q-WD-001,Q-WD-003', open_questions: 'Provider', stop_conditions: null },
  { process_id: 'BP-WD-002', name: 'Вывод на телефон', mvp_status: 'MVP', actors: 'AUTHORIZED', preconditions: 'Non-cash', trigger: 'Withdraw sheet → phone', happy_path: 'Phone + amount → submit', alternate_paths: 'Saved phones', error_paths: 'Limit errors', money_effect: 'Debit account', backend_owned: 'withdraw.create', frontend_owned: 'NEW-WD-002', screens: 'NEW-WD-002', actions: 'NEW-ACT-WD-S02,NEW-ACT-WD-02', history_effect: 'Withdrawal record', notifications: 'UNKNOWN', owner_decisions: 'Q-WD-003', open_questions: 'Provider mapping', stop_conditions: 'Distinct from P2P' },
  { process_id: 'BP-WD-003', name: 'Вывод наличными', mvp_status: 'OUT_OF_MVP', actors: 'N/A', preconditions: 'Removed Q-WD-001', trigger: 'Unreachable cash routes', happy_path: 'DO NOT IMPLEMENT', alternate_paths: 'N/A', error_paths: 'N/A', money_effect: 'N/A', backend_owned: 'DO_NOT_IMPLEMENT', frontend_owned: 'NEW-OLD-CASH-WD', screens: 'NEW-OLD-CASH-WD', actions: 'NONE', history_effect: 'N/A', notifications: 'N/A', owner_decisions: 'Q-WD-001', open_questions: 'N/A', stop_conditions: 'OUT_OF_MVP' },
  { process_id: 'BP-PAY-001', name: 'Оплата услуги', mvp_status: 'MVP', actors: 'GUEST_OR_AUTHORIZED', preconditions: 'Backend catalog Q-PAY-001', trigger: 'Payment tab or home recent', happy_path: 'Browse/search → service → fill fields → pay from account', alternate_paths: 'Bonus account Q-PAY-003', error_paths: 'Service unavailable', money_effect: 'Debit selected account', backend_owned: 'catalog.*, payments.service', frontend_owned: 'NEW-PAY-001,NEW-PAY-002', screens: 'NEW-PAY-001,NEW-PAY-002', actions: 'NEW-ACT-PAY-01..07', history_effect: 'Payment operation', notifications: 'UNKNOWN', owner_decisions: 'Q-PAY-001,Q-PAY-003', open_questions: 'Field schemas per provider', stop_conditions: null },
  { process_id: 'BP-QR-001', name: 'QR receive', mvp_status: 'FUTURE', actors: 'AUTHORIZED', preconditions: 'Q-QR-* answered', trigger: 'QR tab', happy_path: 'Enter amount → generate QR', alternate_paths: 'N/A', error_paths: 'N/A', money_effect: 'Future credit flow', backend_owned: 'DO NOT IMPLEMENT MVP', frontend_owned: 'NEW-QR-001', screens: 'NEW-QR-001', actions: 'NEW-ACT-QR-01,NEW-ACT-TAB-03', history_effect: 'Future', notifications: 'N/A', owner_decisions: 'Q-QR-001..010', open_questions: 'All QR', stop_conditions: 'NO MVP backend' },
  { process_id: 'BP-HIST-001', name: 'История и чек', mvp_status: 'MVP', actors: 'AUTHORIZED', preconditions: 'Session', trigger: 'History tab', happy_path: 'List → filter by date → detail → receipt', alternate_paths: 'Empty history', error_paths: 'Fetch fail', money_effect: 'Read-only', backend_owned: 'transactions.query, transactions.receipt', frontend_owned: 'NEW-HIST-001..003', screens: 'NEW-HIST-001,NEW-HIST-002,NEW-HIST-003', actions: 'NEW-ACT-HIST-01..05', history_effect: 'Read', notifications: 'N/A', owner_decisions: 'Q-ACC-006 for receipt format', open_questions: 'Receipt PDF format', stop_conditions: null },
  { process_id: 'BP-HIST-002', name: 'Повтор операции', mvp_status: 'MVP_PARTIAL_PENDING', actors: 'AUTHORIZED', preconditions: 'Prior debit op exists', trigger: 'History action sheet repeat', happy_path: 'Prefill withdraw/payment form from op', alternate_paths: 'Unsupported op type', error_paths: 'UNKNOWN', money_effect: 'New operation if confirmed', backend_owned: 'transactions.repeat', frontend_owned: 'NEW-HIST-SHEET-002', screens: 'NEW-HIST-SHEET-002', actions: 'NEW-ACT-HIST-03', history_effect: 'New op if completed', notifications: 'UNKNOWN', owner_decisions: 'Q-P2P-003', open_questions: 'Confirmation rules', stop_conditions: null },
  { process_id: 'BP-CARD-001', name: 'Карта PayDala', mvp_status: 'PARKED_ILYA', actors: 'AUTHORIZED', preconditions: 'Q-CARD-001', trigger: 'Orphaned card routes', happy_path: 'N/A current app', alternate_paths: 'N/A', error_paths: 'N/A', money_effect: 'N/A', backend_owned: 'DO_NOT_IMPLEMENT', frontend_owned: 'NEW-OLD-CARD-001', screens: 'NEW-OLD-CARD-001', actions: 'NONE_IN_CURRENT_APP', history_effect: 'N/A', notifications: 'N/A', owner_decisions: 'Q-CARD-001', open_questions: 'All card', stop_conditions: 'Not in current nav' },
  { process_id: 'BP-CARD-002', name: 'PIN карты', mvp_status: 'PARKED_ILYA', actors: 'AUTHORIZED', preconditions: 'Q-CARD-001', trigger: 'Orphaned /legacy/card/pin', happy_path: 'N/A current app', alternate_paths: 'N/A', error_paths: 'N/A', money_effect: 'N/A', backend_owned: 'DO_NOT_IMPLEMENT', frontend_owned: 'Orphaned card/pin route', screens: 'NEW-OLD-CARD-001', actions: 'NONE_IN_CURRENT_APP', history_effect: 'N/A', notifications: 'N/A', owner_decisions: 'Q-CARD-001', open_questions: 'Card PIN policy', stop_conditions: 'PARKED with card product' },
  { process_id: 'BP-PROFILE-001', name: 'Смена телефона', mvp_status: 'MVP_TARGET', actors: 'AUTHORIZED', preconditions: 'Phone change routes exist in source', trigger: 'NOT_LINKED — Profile shows phone read-only', happy_path: 'Profile → change phone → OTP verify → updated phone', alternate_paths: 'N/A', error_paths: 'OTP fail', money_effect: 'None', backend_owned: 'users.changePhone', frontend_owned: 'CURRENT_UI_GAP — /legacy/profile/phone routes orphaned', screens: 'NEW-PROF-001,NEW-ORPH phone routes', actions: 'NEW-ACT-PROF-GAP-01', history_effect: 'None', notifications: 'UNKNOWN', owner_decisions: 'Q-AUTH-002', open_questions: 'Add change-phone link to Profile UI', stop_conditions: 'CURRENT_UI_GAP — backend may prepare API but UI entry missing' },
  { process_id: 'BP-PROFILE-002', name: 'Выход и удаление аккаунта', mvp_status: 'MVP', actors: 'AUTHORIZED', preconditions: 'Session', trigger: 'Profile logout/delete', happy_path: 'Confirm → revoke session → guest home or auth', alternate_paths: 'Cancel sheet', error_paths: 'UNKNOWN', money_effect: 'None', backend_owned: 'auth.logout, users.delete', frontend_owned: 'NEW-PROF-001 sheets', screens: 'NEW-PROF-001,NEW-PROF-SHEET-001,NEW-PROF-SHEET-002', actions: 'NEW-ACT-PROF-05..07', history_effect: 'None', notifications: 'N/A', owner_decisions: 'Q-AUTH-010', open_questions: 'Delete cooling-off', stop_conditions: null },
  { process_id: 'BP-SUPPORT-001', name: 'Internal help form', mvp_status: 'LATER', actors: 'AUTHORIZED', preconditions: 'Q-PROFILE-007', trigger: 'Orphaned messages/help', happy_path: 'DO NOT IMPLEMENT MVP', alternate_paths: 'N/A', error_paths: 'N/A', money_effect: 'None', backend_owned: 'LATER', frontend_owned: 'NEW-OLD-MSG-001', screens: 'NEW-OLD-MSG-001', actions: 'NONE', history_effect: 'N/A', notifications: 'N/A', owner_decisions: 'Q-PROFILE-007', open_questions: 'Internal chat', stop_conditions: 'Use external support instead' },
  { process_id: 'BP-SUPPORT-002', name: 'External support FAB', mvp_status: 'MVP', actors: 'ANY', preconditions: 'Config URLs', trigger: 'Support FAB any screen', happy_path: 'Open sheet → WA or TG deep link', alternate_paths: 'Link unavailable alert', error_paths: 'Linking failure', money_effect: 'None', backend_owned: 'support.contactConfig only', frontend_owned: 'NEW-SUPPORT-001', screens: 'NEW-SUPPORT-001', actions: 'NEW-ACT-SUP-01..04,NEW-ACT-SUP-GAP-01', history_effect: 'None', notifications: 'N/A', owner_decisions: 'Q-SUPPORT-001,Q-SUPPORT-002', open_questions: 'CURRENT_UI_GAP — phone CTA absent; owner target remains WA+TG+phone per Q-SUPPORT-001', stop_conditions: 'Not ticket system' },
];

writeJson('docs/business/BUSINESS_PROCESS_SPEC.json', PROCESSES);

// --- Markdown generators ---
const routeMd = `# NEW app route map

**Audit date:** ${AUDIT_DATE}  
**Entry:** \`${ENTRY}\`  
**Source:** current \`src/app/**\` + reachability from entry  
**Machine-readable:** [NEW_APP_ROUTE_MAP.json](./NEW_APP_ROUTE_MAP.json)

> Previous Cashhello screenshot/UI generation is **not** evidence for routes. Classification is by current navigation reachability.

## Summary

| Status | Count |
| --- | ---: |
| CURRENT_NEW_APP | ${ROUTES.filter((r) => r.new_app_status === 'CURRENT_NEW_APP').length} |
| STUB | ${ROUTES.filter((r) => r.new_app_status === 'STUB').length} |
| OLD_APP_ONLY / ORPHANED / DEAD_CODE | ${ROUTES.filter((r) => ['OLD_APP_ONLY', 'ORPHANED', 'DEAD_CODE'].includes(r.new_app_status)).length} |
| DEV_ONLY | ${ROUTES.filter((r) => r.new_app_status === 'DEV_ONLY').length} |
| **Total routes** | **${ROUTES.length}** |

## Reachability graph (from entry)

\`\`\`
APP ENTRY (/)
  ↓
GUEST HOME (/legacy/home?guest=1)
  ├── AUTH (/legacy/auth?qaStep=iin)
  ├── SHEETS: topup, withdraw, support
  └── LOGIN CTA → auth

AUTH COMPLETE
  ↓
AUTHORIZED HOME (/legacy/home) + TAB BAR
  ├── PAYMENT (/legacy/payment → /legacy/payment/[id])
  ├── QR (/legacy/qr) [FUTURE backend]
  ├── HISTORY (/legacy/history → detail → receipt)
  ├── PROFILE (/legacy/profile → status, pin, documents stub)
  ├── TOPUP FLOWS (/legacy/topup/between, /legacy/topup/card)
  └── WITHDRAW FLOWS (/legacy/withdraw/card, phone, cashhello-user → loading)
\`\`\`

## All routes

${mdTable(
  ['route', 'component', 'new_app_status', 'runtime_status', 'auth_mode', 'reachable_from'],
  ROUTES.map((r) => [
    `\`${r.route}\``,
    r.screen_component,
    r.new_app_status,
    r.runtime_status,
    r.auth_mode,
    (r.reachable_from || []).join('; ') || '—',
  ]),
)}
`;

fs.writeFileSync(path.join(ROOT, 'docs/business/NEW_APP_ROUTE_MAP.md'), routeMd);

const currentScreens = SCREENS.filter((s) =>
  ['MVP', 'MVP_PARTIAL_PENDING', 'FUTURE', 'PARKED_ILYA', 'STUB'].includes(s.mvp_status),
);
const screenMd = `# NEW app screen catalog

**Audit date:** ${AUDIT_DATE}  
**IDs:** NEW-* stable IDs (not legacy CAS-/LGC- IDs)  
**Machine-readable:** [NEW_APP_SCREEN_CATALOG.json](./NEW_APP_SCREEN_CATALOG.json)

## Summary

| mvp_status | Count |
| --- | ---: |
| MVP | ${SCREENS.filter((s) => s.mvp_status === 'MVP').length} |
| MVP_PARTIAL_PENDING | ${SCREENS.filter((s) => s.mvp_status === 'MVP_PARTIAL_PENDING').length} |
| FUTURE | ${SCREENS.filter((s) => s.mvp_status === 'FUTURE').length} |
| PARKED_ILYA | ${SCREENS.filter((s) => s.mvp_status === 'PARKED_ILYA').length} |
| OUT_OF_MVP | ${SCREENS.filter((s) => s.mvp_status === 'OUT_OF_MVP').length} |
| ORPHANED / STUB / DEV | ${SCREENS.filter((s) => ['ORPHANED', 'STUB', 'DEV_ONLY', 'LATER'].includes(s.mvp_status)).length} |
| **Total screens** | **${SCREENS.length}** |

${mdTable(
  ['screen_id', 'name', 'route', 'mvp_status', 'business_process', 'backend_needed'],
  SCREENS.map((s) => [
    s.screen_id,
    s.name,
    `\`${s.route}\``,
    s.mvp_status,
    s.business_process || '—',
    s.backend_needed,
  ]),
)}
`;

fs.writeFileSync(path.join(ROOT, 'docs/business/NEW_APP_SCREEN_CATALOG.md'), screenMd);

const actionMd = `# NEW app action catalog

**Audit date:** ${AUDIT_DATE}  
**Scope:** interactive controls on **current reachable** new app only  
**Machine-readable:** [NEW_APP_ACTION_CATALOG.json](./NEW_APP_ACTION_CATALOG.json)

Each action documents **what it does**, **where it goes**, and **why** (business purpose).

## Summary

| mvp_status | Actions |
| --- | ---: |
| MVP | ${ACTIONS.filter((a) => a.mvp_status === 'MVP').length} |
| MVP_PARTIAL_PENDING | ${ACTIONS.filter((a) => a.mvp_status === 'MVP_PARTIAL_PENDING').length} |
| FUTURE | ${ACTIONS.filter((a) => a.mvp_status === 'FUTURE').length} |
| PARKED_ILYA | ${ACTIONS.filter((a) => a.mvp_status === 'PARKED_ILYA').length} |
| STUB | ${ACTIONS.filter((a) => a.mvp_status === 'STUB').length} |
| **Total** | **${ACTIONS.length}** |

${mdTable(
  ['action_id', 'screen_id', 'control', 'business_purpose', 'destination', 'mvp_status'],
  ACTIONS.map((a) => [
    a.action_id,
    a.screen_id,
    `${a.control_type}: ${a.control_label}`,
    a.business_purpose,
    a.destination,
    a.mvp_status,
  ]),
)}
`;

fs.writeFileSync(path.join(ROOT, 'docs/business/NEW_APP_ACTION_CATALOG.md'), actionMd);

const bpMd = `# Business process specification

**Audit date:** ${AUDIT_DATE}  
**Source:** derived from current new app screens/actions, reconciled with owner decisions  
**Machine-readable:** [BUSINESS_PROCESS_SPEC.json](./BUSINESS_PROCESS_SPEC.json)

${PROCESSES.map((p) => `## ${p.process_id} — ${p.name}

| Field | Value |
| --- | --- |
| MVP status | ${p.mvp_status} |
| Actors | ${p.actors} |
| Trigger | ${p.trigger} |
| Happy path | ${p.happy_path} |
| Money effect | ${p.money_effect} |
| Backend-owned | ${p.backend_owned} |
| Screens (NEW-*) | ${p.screens} |
| Actions | ${p.actions} |
| Owner decisions | ${p.owner_decisions} |
| Stop conditions | ${p.stop_conditions || '—'} |
`).join('\n')}
`;

fs.writeFileSync(path.join(ROOT, 'docs/business/BUSINESS_PROCESS_SPEC.md'), bpMd);

const matrixMd = `# Screen → API matrix (NEW app)

**Audit date:** ${AUDIT_DATE}  
**Built from:** [NEW_APP_ACTION_CATALOG.json](../business/NEW_APP_ACTION_CATALOG.json)  
**Machine-readable:** [SCREEN_API_MATRIX.json](./SCREEN_API_MATRIX.json)

> **No screenshot_ref.** Previous Cashhello screenshots are deprecated and must not be used.

| action_id | screen_id | route | control | business_purpose | mvp_status | backend_needed | backend_capability |
| --- | --- | --- | --- | --- | --- | --- | --- |
${matrix
  .map(
    (r) =>
      `| ${r.action_id} | ${r.screen_id} | ${r.route || '—'} | ${r.control_label} | ${r.business_purpose} | ${r.mvp_status} | ${r.backend_needed} | ${r.backend_capability || '—'} |`,
  )
  .join('\n')}
`;

fs.writeFileSync(path.join(ROOT, 'docs/backend/SCREEN_API_MATRIX.md'), matrixMd);

// --- TALGAT_HANDOFF ---
const talgatMd = `# Talgat backend handoff — CURRENT NEW CASHELLO ONLY

**THIS HANDOFF DESCRIBES ONLY THE CURRENT NEW CASHELLO APPLICATION.**

Previous Cashhello screenshot/UI generation is **deprecated** and **must not** be used for backend implementation. Deleted screenshot files are not backend requirements.

**Audit date:** ${AUDIT_DATE}  
**HEAD:** \`${endHead()}\`  
**Live:** https://cashello.scholarshiptop.com/legacy/home?guest=1  
**Live vs source:** CURRENT_SOURCE_BUILD (see LIVE_SITE_PARITY_REPORT — bundle tracks repo; screenshots removed intentionally)

---

## 1. Current new app map

**Entry:** \`/\` → \`${ENTRY}\`

| Doc | Purpose |
| --- | --- |
| [NEW_APP_ROUTE_MAP.md](../business/NEW_APP_ROUTE_MAP.md) | All routes + reachability |
| [NEW_APP_SCREEN_CATALOG.md](../business/NEW_APP_SCREEN_CATALOG.md) | NEW-* screen IDs |
| [NEW_APP_ACTION_CATALOG.md](../business/NEW_APP_ACTION_CATALOG.md) | Every button/CTA + business purpose |
| [SCREEN_API_MATRIX.md](./SCREEN_API_MATRIX.md) | Screen → API mapping |
| [BUSINESS_PROCESS_SPEC.md](../business/BUSINESS_PROCESS_SPEC.md) | Business processes |

Folder name \`legacy/\` is a **route namespace only** — it holds the current product UI.

---

## 2. Current MVP (backend implement)

1. **Auth** — phone resolve (login/register unified Q-AUTH-001), WhatsApp OTP (Q-AUTH-002), PIN, single session (Q-AUTH-010)
2. **Accounts** — auto KZT+bonus+USD+RUB (Q-ACC-001), balance reads, single visible balance semantics (Q-ACC-005)
3. **Top-up** — external card + own-account transfer (NO cash Q-TOPUP-001), dynamic fees (Q-TOPUP-004)
4. **Withdraw** — card + phone (NO cash Q-WD-001), dynamic fees (Q-WD-003)
5. **P2P** — \`/legacy/withdraw/cashhello-user\` phone lookup + transfer (Q-P2P-001) — **NOT** \`/withdraw/cash\`
6. **Payments** — backend-owned catalog (Q-PAY-001), bonus account allowed with backend rules (Q-PAY-003)
7. **History + receipts** — query, detail, receipt
8. **Profile** — logout/delete session, change PIN
9. **Support** — external WA+TG+phone config (Q-SUPPORT-001), 24/7 target (Q-SUPPORT-002)

---

## 3. DO NOT IMPLEMENT

| Topic | Reason |
| --- | --- |
| Cash top-up / cash desks | OUT_OF_MVP — Q-TOPUP-001 |
| Cash withdrawal | OUT_OF_MVP — Q-WD-001 |
| QR APIs | FUTURE — Q-QR-* |
| PayDala card / card routes | PARKED_ILYA — Q-CARD-001 |
| KYC provider / auth KYC steps | PARKED_ILYA — Q-KYC-001 |
| Internal messages/help ticket system | LATER — Q-PROFILE-007 |
| Orphaned routes (search, accounts list, card) | Not in current navigation — see purge report |
| Prototype mock fees/limits/balances | Use dynamic quote APIs |

---

## 4. Business rules (owner-approved)

See [OWNER_DECISIONS_RESOLVED.md](../business/OWNER_DECISIONS_RESOLVED.md). Key rules:

- Backend determines login vs register (Q-AUTH-001)
- WhatsApp OTP (Q-AUTH-002)
- One active session/device (Q-AUTH-010)
- Four default accounts (Q-ACC-001)
- No cash top-up (Q-TOPUP-001)
- No cash withdraw (Q-WD-001)
- P2P search by phone only (Q-P2P-001)
- Dynamic fees and limits from backend
- Backend-owned payment catalog
- External support channels only for MVP

---

## 5. Business processes

22 processes in [BUSINESS_PROCESS_SPEC.md](../business/BUSINESS_PROCESS_SPEC.md). MVP count: ${PROCESSES.filter((p) => p.mvp_status === 'MVP').length} full MVP + ${PROCESSES.filter((p) => p.mvp_status === 'MVP_PARTIAL_PENDING').length} partial pending.

---

## 6. Screen / action / API map

- **${ACTIONS.length}** actions across **${SCREENS.filter((s) => !['ORPHANED', 'OUT_OF_MVP', 'DEV_ONLY', 'LATER'].includes(s.mvp_status)).length}** current-product screens
- Matrix: [SCREEN_API_MATRIX.json](./SCREEN_API_MATRIX.json) — **zero screenshot_ref**

---

## 7. Pending Ilya decisions

PARKED_ILYA: Q-ACC-002..004, Q-ACC-006, Q-TRF-001, Q-TRF-004, Q-P2P-002/003/005, Q-CARD-001, Q-KYC-001

Full ledger: [OWNER_DECISIONS_RESOLVED.md](../business/OWNER_DECISIONS_RESOLVED.md) + [OWNER_DECISIONS_PENDING.md](../business/OWNER_DECISIONS_PENDING.md)

---

## 8. First allowed backend task

**Sprint 0 scaffold:** HTTP layer, auth module skeleton, session store, idempotency middleware.

**First feature slice:** \`auth.resolvePhone\` + \`auth.requestOtp\` + \`auth.verifyOtp\` + \`auth.setPin\` + \`auth.loginPin\` wired to NEW-AUTH-* screens (normal auth only — skip KYC prototype steps NEW-AUTH-004..010).

Do **not** implement until PARKED_ILYA rules are needed for that slice.
`;

fs.writeFileSync(path.join(ROOT, 'docs/backend/TALGAT_HANDOFF.md'), talgatMd);

// --- OLD CASHHELLO PURGE REPORT ---
const oldRoutes = ROUTES.filter((r) =>
  ['OLD_APP_ONLY', 'ORPHANED', 'DEAD_CODE'].includes(r.new_app_status),
);
const purgeMd = `# Old Cashhello purge report

**Audit date:** ${AUDIT_DATE}  
**Method:** clean-room reachability from \`${ENTRY}\` — not folder names, not screenshots

## A. Old-app artifacts still in repo

### Routes / screens (${oldRoutes.length})

${oldRoutes.map((r) => `- \`${r.route}\` — ${r.new_app_status} — ${r.notes}`).join('\n')}

### Docs / manifests (historical)

| Artifact | Disposition |
| --- | --- |
| \`docs/business/discovery/PRODUCT_SCREEN_CATALOG.md\` | HISTORICAL_ONLY |
| \`docs/business/discovery/UI_ACTION_CATALOG.md\` | HISTORICAL_ONLY |
| \`docs/business/discovery/CURRENT_FLOW_MAP.md\` | HISTORICAL_ONLY |
| \`docs/business/discovery/BUSINESS_PROCESS_CANDIDATES.md\` | HISTORICAL_ONLY |
| \`docs/business/discovery/manifests/screens.json\` | HISTORICAL_ONLY (CAS-/LGC- IDs) |
| \`docs/business/discovery/manifests/actions.json\` | HISTORICAL_ONLY |
| \`docs/business/discovery/SCREENSHOT_SCOPE_MANIFEST.*\` | DEPRECATE — screenshots deleted |
| \`docs/backend/SCREEN_API_MATRIX.json\` (pre-rebuild) | REBUILT — no screenshot_ref |

### Deleted screenshots

158 annotated PNG files under \`docs/business/discovery/screenshots/annotated/\` deleted (git status D). Intentionally removed — not evidence.

### Old IDs

CAS-*, LGC-SCR-*, HOME-001, PAY-001 etc. in discovery manifests — **DO NOT USE FOR HANDOFF**. Remapped to NEW-* in current catalogs.

## B. Used by current new runtime?

| Artifact class | Current runtime use |
| --- | --- |
| \`/legacy/home\`, payment, history, profile, auth, withdraw/card|phone|cashhello-user, topup/between|card\` | **YES** |
| Cash top-up/withdraw routes | **NO** — unreachable, OUT_OF_MVP |
| Card product routes | **NO** — orphaned, PARKED_ILYA |
| Search, accounts list, messages, help | **NO** — orphaned |
| Stub routes (except documents) | **NO** |
| Discovery CAS-/LGC- screen IDs | **NO** — docs only |
| Deleted screenshots | **NO** |

## C. Marked DO_NOT_USE_FOR_HANDOFF

All \`OLD_APP_ONLY\`, unreachable cash flows, orphaned card/search/messages routes, and screenshot-based manifests.

## D. src/** unchanged

This report is audit-only. No source deletions performed.
`;

fs.writeFileSync(path.join(ROOT, 'docs/business/OLD_CASHHELLO_PURGE_REPORT.md'), purgeMd);

// Deprecate screenshot manifest
const shotDeprecate = `# SCREENSHOT SCOPE MANIFEST — DEPRECATED

**Status:** DEPRECATED as of ${AUDIT_DATE}

Previous Cashhello annotated screenshots were **intentionally deleted**. They represented an older UI generation and are:

- NOT a source of truth
- NOT evidence for backend
- NOT a screen inventory requirement

Use instead:

- [NEW_APP_SCREEN_CATALOG.md](../NEW_APP_SCREEN_CATALOG.md)
- [NEW_APP_ACTION_CATALOG.md](../NEW_APP_ACTION_CATALOG.md)
- [NEW_APP_ROUTE_MAP.md](../NEW_APP_ROUTE_MAP.md)
`;

fs.writeFileSync(
  path.join(ROOT, 'docs/business/discovery/SCREENSHOT_SCOPE_MANIFEST.md'),
  shotDeprecate,
);
writeJson('docs/business/discovery/SCREENSHOT_SCOPE_MANIFEST.json', [
  { status: 'DEPRECATED', reason: 'Screenshots deleted; use NEW_APP_* catalogs', audit_date: AUDIT_DATE },
]);

const sourceInteractionCount = writeSourceInteractions(ROOT);
console.log('WROTE source_interactions.json', `(${sourceInteractionCount} rows)`);

console.log('BUILD COMPLETE');
console.log(
  JSON.stringify(
    {
      routes: ROUTES.length,
      new_app_routes: ROUTES.filter((r) => r.new_app_status === 'CURRENT_NEW_APP').length,
      old_only_routes: oldRoutes.length,
      screens: SCREENS.length,
      actions: ACTIONS.length,
      processes: PROCESSES.length,
      matrix_rows: matrix.length,
    },
    null,
    2,
  ),
);
