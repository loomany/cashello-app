/**
 * Shared handoff classification rules — docs/audit only.
 * Fixes: cashhello-user != cash; KYC parked; account action Q-ACC mapping.
 */
const AUDIT_DATE = '2026-09-01';
const EVIDENCE_PHASE_C = 'CURSOR_CASHELLO_FULL_HANDOFF_AUDIT_TZ.md Phase C';
const EVIDENCE_RECON = 'CASHELLO_HANDOFF_FINAL_RECONCILIATION';

const KYC_SCREEN_IDS = new Set([
  'CAS-AUTH-004',
  'CAS-AUTH-005',
  'CAS-AUTH-006',
  'CAS-AUTH-007',
  'CAS-AUTH-008',
  'CAS-AUTH-009',
  'CAS-AUTH-010',
  'LGC-SCR-068',
]);

const NORMAL_AUTH_SCREEN_IDS = new Set([
  'CAS-AUTH-001',
  'CAS-AUTH-002',
  'CAS-AUTH-003',
  'CAS-AUTH-011',
  'CAS-AUTH-012',
  'CAS-AUTH-013',
  'CAS-AUTH-014',
  'CAS-AUTH-015',
]);

const P2P_SCREEN_IDS = new Set(['CAS-WD-005']);
const P2P_ROUTE = '/legacy/withdraw/cashhello-user';

const ACCOUNT_ACTION_OVERRIDES = {
  'ACT-LGC-SCR-029-02': { mvp_status: 'PARKED_ILYA', owner: 'Q-ACC-002', note: 'Open account — Q-ACC-002 PARKED_ILYA' },
  'ACT-LGC-SCR-031-02': { mvp_status: 'PARKED_ILYA', owner: 'Q-ACC-002', note: 'Confirm open account — Q-ACC-002' },
  'ACT-LGC-SCR-031-03': { mvp_status: 'PARKED_ILYA', owner: 'Q-ACC-002', note: 'Open account currency — Q-ACC-002' },
  'ACT-LGC-SCR-029-06': { mvp_status: 'PARKED_ILYA', owner: 'Q-ACC-003', note: 'Set primary — Q-ACC-003 PARKED_ILYA' },
  'ACT-LGC-SCR-034-01': { mvp_status: 'PARKED_ILYA', owner: 'Q-ACC-006', note: 'Statement — Q-ACC-006 PARKED_ILYA' },
  'ACT-LGC-SCR-034-02': { mvp_status: 'PARKED_ILYA', owner: 'Q-ACC-006', note: 'Requisites — Q-ACC-006 PARKED_ILYA' },
  'ACT-LGC-SCR-032-04': { mvp_status: 'PARKED_ILYA', owner: 'Q-ACC-004', note: 'Balance display — Q-ACC-004 negative balance PARKED_ILYA' },
};

const QR_NAV_ACTION_IDS = new Set([
  'ACT-HOME-001-05',
  'ACT-LGC-SCR-025-14',
  'ACT-HOME-001-12',
]);

const SUPPORT_MVP_SCREEN_IDS = new Set(['CAS-SUPPORT-002']);
const SUPPORT_MVP_ACTION_IDS = new Set([
  'ACT-GLOBAL-SUPPORT-01',
  'ACT-CAS-SUPPORT-002-02',
  'ACT-CAS-SUPPORT-002-03',
]);

const INTERNAL_SUPPORT_SCREEN_IDS = new Set(['LGC-SCR-125', 'LGC-SCR-126']);

/** Routes that are cash pickup/desk — NOT cashhello-user */
function isCashRoute(route) {
  if (!route) return false;
  if (route.includes('cashhello-user')) return false;
  return /\/(topup|withdraw)\/cash(-map)?(\?|$|\/)/.test(route);
}

function isP2PRoute(route) {
  return route === P2P_ROUTE || route?.includes('/withdraw/cashhello-user');
}

function classifyScreen(screen) {
  const id = screen.screen_id;
  const route = screen.route || '';

  if (route === '/dev/foundation') return 'TECH_ONLY';
  if (route.includes('/stub/')) return 'STUB';
  if (P2P_SCREEN_IDS.has(id) || isP2PRoute(route)) return 'MVP_PARTIAL_PENDING';
  if (isCashRoute(route)) return 'OUT_OF_MVP';
  if (KYC_SCREEN_IDS.has(id)) return 'PARKED_ILYA';
  if (screen.module === 'QR' || id === 'QR-001') return 'FUTURE';
  if (screen.module === 'CARD' || route.includes('/legacy/card')) return 'PARKED_ILYA';
  if (INTERNAL_SUPPORT_SCREEN_IDS.has(id) || route.includes('/messages') || route === '/legacy/help')
    return 'LATER';
  if (SUPPORT_MVP_SCREEN_IDS.has(id)) return 'MVP_APPROVED';
  if (screen.module === 'AUTH' && NORMAL_AUTH_SCREEN_IDS.has(id)) return 'MVP_APPROVED';
  if (screen.module === 'AUTH' && KYC_SCREEN_IDS.has(id)) return 'PARKED_ILYA';
  return 'MVP_APPROVED';
}

function classifyAction(action, screen) {
  const override = ACCOUNT_ACTION_OVERRIDES[action.action_id];
  if (override) return override.mvp_status;

  if (QR_NAV_ACTION_IDS.has(action.action_id)) return 'FUTURE';
  if (SUPPORT_MVP_ACTION_IDS.has(action.action_id)) return 'MVP_APPROVED';

  const dest = action.current_destination || '';
  if (dest === '/legacy/qr' || dest.includes('/legacy/qr')) return 'FUTURE';
  if (isP2PRoute(dest) || action.screen_id === 'CAS-WD-005') return 'MVP_PARTIAL_PENDING';
  if (isCashRoute(dest) || isCashRoute(screen.route)) return 'OUT_OF_MVP';

  if (KYC_SCREEN_IDS.has(screen.screen_id)) return 'PARKED_ILYA';
  if (INTERNAL_SUPPORT_SCREEN_IDS.has(screen.screen_id)) return 'LATER';

  return classifyScreen(screen);
}

/** config_only: support links MVP without financial API */
function backendNeeded(mvpStatus, action, screen) {
  if (['OUT_OF_MVP', 'FUTURE', 'PARKED_ILYA', 'LATER', 'STUB', 'TECH_ONLY'].includes(mvpStatus))
    return 'no';
  if (
    SUPPORT_MVP_ACTION_IDS.has(action?.action_id) ||
    SUPPORT_MVP_SCREEN_IDS.has(screen?.screen_id)
  )
    return 'config_only';
  if (mvpStatus === 'MVP_PARTIAL_PENDING') return 'yes';
  if (mvpStatus === 'MVP_APPROVED') return 'yes';
  return 'no';
}

function liveVerificationStatus(screen, shot) {
  const route = screen.route || '';
  const guestHome =
    (screen.screen_id === 'HOME-001' || screen.screen_id === 'LGC-SCR-025') &&
    shot?.state !== 'CAPTURE_GAP';
  if (guestHome && shot?.capture_status === 'CAPTURED') return 'MANUAL_RUNTIME_VERIFIED';
  if (shot?.capture_status === 'CAPTURE_GAP') return 'NOT_VERIFIED';
  return 'LIVE_BUILD_MATCH_ONLY';
}

function mapApiOperation(action, screen, mvpStatus) {
  if (mvpStatus === 'FUTURE') return 'qr.future — NO MVP BACKEND';
  if (mvpStatus === 'OUT_OF_MVP') return 'DO_NOT_IMPLEMENT';
  if (mvpStatus === 'PARKED_ILYA') {
    if (KYC_SCREEN_IDS.has(screen.screen_id)) return 'kyc.parked';
    if (screen.module === 'CARD') return 'card.parked';
    return 'PARKED_ILYA';
  }
  if (mvpStatus === 'LATER') return 'LATER';

  const id = action.action_id;
  if (SUPPORT_MVP_ACTION_IDS.has(id)) return 'support.contactConfig';

  if (isP2PRoute(screen.route) || screen.screen_id === 'CAS-WD-005') {
    if ((action.label || '').toLowerCase().includes('отправ') || action.handler?.includes('confirm'))
      return 'p2p.create';
    return 'p2p.lookupRecipient';
  }

  const mod = screen.module;
  const label = (action.label || '').toLowerCase();
  if (mod === 'AUTH') {
    if (label.includes('whatsapp') || label.includes('код') || label.includes('sms'))
      return 'auth.verifyOtp';
    if (label.includes('телефон') || label.includes('phone')) return 'auth.resolvePhone';
    if (label.includes('pin')) return 'auth.setPin';
    return 'auth.flow';
  }
  if (mod === 'TOPUP') {
    if (screen.route?.includes('between')) return 'transfers.internal';
    if (screen.route?.includes('card')) return 'topup.card';
    return 'topup.methods';
  }
  if (mod === 'WITHDRAW' && !isP2PRoute(screen.route)) return 'withdraw.create';
  if (mod === 'PAYMENT') {
    if (label.includes('оплат')) return 'payments.service';
    return 'catalog.browse';
  }
  if (mod === 'HISTORY') return 'transactions.query';
  if (mod === 'ACCOUNTS') return 'accounts.list';
  if (mod === 'PROFILE') return 'users.me';
  return 'ui.local';
}

function buildContractRow(action, screen, shotFile) {
  const mvpStatus = classifyAction(action, screen);
  const ownerIds = [
    ...(action.owner_questions || []),
    ACCOUNT_ACTION_OVERRIDES[action.action_id]?.owner,
  ].filter(Boolean);
  const uniqueOwner = [...new Set(ownerIds)].join(', ') || null;

  const destRoute =
    action.current_destination_type === 'ROUTE'
      ? action.current_destination
      : action.current_destination || 'UNKNOWN';

  let notes = ACCOUNT_ACTION_OVERRIDES[action.action_id]?.note || null;
  if (QR_NAV_ACTION_IDS.has(action.action_id))
    notes = 'Home/tab QR navigation — destination FUTURE / NO MVP BACKEND';
  if (mvpStatus === 'FUTURE' && destRoute.includes('/legacy/qr'))
    notes = (notes ? notes + '; ' : '') + 'Navigates to QR — no MVP backend contract';

  const blocker =
    mvpStatus === 'PARKED_ILYA'
      ? 'PARKED_ILYA'
      : mvpStatus === 'FUTURE'
        ? 'FUTURE_NO_MVP_BACKEND'
        : mvpStatus === 'OUT_OF_MVP'
          ? 'OUT_OF_SCOPE'
          : mvpStatus === 'LATER'
            ? 'LATER'
            : null;

  const financial = ['WITHDRAW', 'TOPUP', 'PAYMENT'].includes(screen.module) && mvpStatus.includes('MVP');

  return {
    action_id: action.action_id,
    screen_id: action.screen_id,
    route: screen.route || null,
    auth_mode: screen.auth_state || 'UNKNOWN',
    control_label: action.label,
    current_ui_behavior: `${action.handler || 'UNKNOWN'} → ${action.current_destination || 'UNKNOWN'}`,
    destination_route: destRoute,
    mvp_status: mvpStatus,
    owner_decision_id: uniqueOwner || 'OWNER_DECISION_REQUIRED',
    backend_capability: backendNeeded(mvpStatus, action, screen),
    suggested_api_operation: mapApiOperation(action, screen, mvpStatus),
    request_data: financial ? 'OWNER_DECISION_REQUIRED' : 'UNKNOWN',
    response_data_needed_by_ui: financial ? 'OWNER_DECISION_REQUIRED' : 'UNKNOWN',
    loading_state: action.handler?.includes('loading') ? 'CURRENT_UI_ONLY' : 'UNKNOWN',
    success_state: action.mock_effect?.includes('Alert') ? 'PROTOTYPE_ALERT' : 'UNKNOWN',
    empty_state: 'UNKNOWN',
    error_state: 'OWNER_DECISION_REQUIRED',
    retry_behavior: 'UNKNOWN',
    screenshot_ref: shotFile || (screen.screenshot ? screen.screenshot.split('/').pop() : null),
    source_ref: action.component || (action.source_trace || [])[0] || 'UNKNOWN',
    notes: notes || blocker,
    blocker,
  };
}

/** decision_owner for unanswered questions — no invented answers */
function inferDecisionOwner(q) {
  if (q.status === 'PARKED_ILYA') return 'ILYA';
  if (q.status === 'LATER') return 'LATER';
  if (q.status === 'ANSWERED' || q.status === 'N/A' || q.status === 'FUTURE') return null;

  const id = q.question_id;
  const mod = q.module;

  if (id.startsWith('Q-CARD-') || id.startsWith('Q-KYC-')) return 'ILYA';
  if (id.startsWith('Q-ACC-')) return 'ILYA';
  if (id.startsWith('Q-TRF-') || id.startsWith('Q-P2P-')) return 'ILYA';
  if (id.startsWith('Q-QR-')) return 'ILYA';
  if (id.startsWith('Q-ERR-')) return 'ILYA';
  if (id.startsWith('Q-SUPPORT-') || id === 'Q-PROFILE-007' || id === 'Q-PROFILE-008') return 'FRONTEND';
  if (id.startsWith('Q-AUTH-002') || id === 'Q-AUTH-003') return 'PROVIDER_COMPLIANCE';
  if (id.startsWith('Q-AUTH-')) return 'ILYA';
  if (id.startsWith('Q-PAY-') || id.startsWith('Q-TOPUP-') || id.startsWith('Q-WD-')) return 'ILYA';
  if (id.startsWith('Q-HIST-')) return 'ILYA';
  if (id.startsWith('Q-PROFILE-')) return 'ILYA';
  if (id.startsWith('Q-NOTIF-')) return 'ILYA';
  if (mod === 'ERR') return 'BACKEND_TECH';
  if (q.required_by === 'CAN_DECIDE_LATER') return 'LATER';
  if (q.priority === 'P0') return 'ILYA';
  return 'UNASSIGNED';
}

const FLOW_MVP_STATUS = {
  'BP-AUTH-001': 'MVP',
  'BP-AUTH-002': 'MVP',
  'BP-KYC-001': 'PARKED_ILYA',
  'BP-ACC-001': 'MVP',
  'BP-ACC-002': 'PARKED_ILYA',
  'BP-TOPUP-001': 'MVP',
  'BP-TOPUP-002': 'OUT_OF_MVP',
  'BP-TRF-001': 'MVP_PARTIAL_PENDING',
  'BP-P2P-001': 'MVP_PARTIAL_PENDING',
  'BP-WD-001': 'MVP',
  'BP-WD-002': 'MVP',
  'BP-WD-003': 'OUT_OF_MVP',
  'BP-PAY-001': 'MVP',
  'BP-QR-001': 'FUTURE',
  'BP-HIST-001': 'MVP',
  'BP-HIST-002': 'MVP_PARTIAL_PENDING',
  'BP-CARD-001': 'PARKED_ILYA',
  'BP-CARD-002': 'PARKED_ILYA',
  'BP-PROFILE-001': 'MVP',
  'BP-PROFILE-002': 'MVP',
  'BP-SUPPORT-001': 'LATER',
  'BP-SUPPORT-002': 'MVP',
};

const SCREEN_API_SCHEMA_FIELDS = [
  'action_id',
  'screen_id',
  'route',
  'auth_mode',
  'control_label',
  'current_ui_behavior',
  'destination_route',
  'mvp_status',
  'owner_decision_id',
  'backend_capability',
  'suggested_api_operation',
  'request_data',
  'response_data_needed_by_ui',
  'loading_state',
  'success_state',
  'empty_state',
  'error_state',
  'retry_behavior',
  'screenshot_ref',
  'source_ref',
  'notes',
  'blocker',
];

module.exports = {
  AUDIT_DATE,
  EVIDENCE_PHASE_C,
  EVIDENCE_RECON,
  KYC_SCREEN_IDS,
  P2P_SCREEN_IDS,
  FLOW_MVP_STATUS,
  SCREEN_API_SCHEMA_FIELDS,
  isCashRoute,
  isP2PRoute,
  classifyScreen,
  classifyAction,
  backendNeeded,
  liveVerificationStatus,
  buildContractRow,
  inferDecisionOwner,
  QR_NAV_ACTION_IDS,
  SUPPORT_MVP_ACTION_IDS,
};
