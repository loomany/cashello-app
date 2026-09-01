/**
 * Cashello handoff closure + final reconciliation — docs/manifests only.
 */
const fs = require('fs');
const path = require('path');
const {
  AUDIT_DATE,
  EVIDENCE_PHASE_C,
  EVIDENCE_RECON,
  FLOW_MVP_STATUS,
  SCREEN_API_SCHEMA_FIELDS,
  classifyScreen,
  classifyAction,
  backendNeeded,
  liveVerificationStatus,
  buildContractRow,
  inferDecisionOwner,
} = require('./handoff-classification');

const ROOT = path.resolve(__dirname, '../../../..');
const DISC = path.join(ROOT, 'docs/business/discovery');
const MANIFESTS = path.join(DISC, 'manifests');

/** @type {Record<string, { status: string; owner_answer?: string; answer_status?: string }>} */
const OWNER_DECISIONS = {
  'Q-AUTH-001': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer:
      'Backend determines new vs returning user by phone after phone entry. No separate login/register chooser in product UX.',
  },
  'Q-AUTH-002': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer:
      'OTP delivery via WhatsApp. Evolution vs Meta provider selection is a later technical decision, not a product blocker.',
  },
  'Q-AUTH-010': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer:
      'Single active authorized device/session per user. A new successful login revokes the previous session/device.',
  },
  'Q-ACC-001': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer:
      'On registration, backend auto-creates four accounts: KZT (primary), bonus, USD, and RUB.',
  },
  'Q-ACC-002': { status: 'PARKED_ILYA', answer_status: 'PARKED_ILYA' },
  'Q-ACC-003': { status: 'PARKED_ILYA', answer_status: 'PARKED_ILYA' },
  'Q-ACC-004': {
    status: 'PARKED_ILYA',
    answer_status: 'PARKED_ILYA',
    owner_answer: 'PARKED_ILYA — negative balance / overdraft policy unresolved.',
  },
  'Q-ACC-005': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer:
      'User sees one visible ordinary balance per currency. When an operation is accepted/sent, amount is visually debited; on failure, amount is restored. No separate visible hold/reserve balance in MVP UX.',
  },
  'Q-ACC-006': {
    status: 'PARKED_ILYA',
    answer_status: 'PARKED_ILYA',
    owner_answer: 'PARKED_ILYA — statement and requisites format unresolved.',
  },
  'Q-TOPUP-001': {
    status: 'ANSWERED',
    answer_status: 'OUT_OF_MVP',
    owner_answer: 'NO cash top-up. NO Cashello cash desks in MVP or approved scope.',
  },
  'Q-TOPUP-004': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer: 'Top-up fees and conditions are dynamic and backend-owned per method.',
  },
  'Q-TOPUP-008': {
    status: 'N/A',
    answer_status: 'NOT_APPLICABLE',
    owner_answer: 'N/A — cash desk top-up removed from MVP (see Q-TOPUP-001).',
  },
  'Q-TOPUP-009': {
    status: 'N/A',
    answer_status: 'NOT_APPLICABLE',
    owner_answer: 'N/A — cash desk top-up removed from MVP (see Q-TOPUP-001).',
  },
  'Q-TRF-001': { status: 'PARKED_ILYA', answer_status: 'PARKED_ILYA' },
  'Q-TRF-004': { status: 'PARKED_ILYA', answer_status: 'PARKED_ILYA' },
  'Q-P2P-001': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer: 'Recipient lookup/search is strictly by phone number.',
  },
  'Q-P2P-002': { status: 'PARKED_ILYA', answer_status: 'PARKED_ILYA' },
  'Q-P2P-003': { status: 'PARKED_ILYA', answer_status: 'PARKED_ILYA' },
  'Q-P2P-005': { status: 'PARKED_ILYA', answer_status: 'PARKED_ILYA' },
  'Q-P2P-006': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer:
      'Limits are operation-specific and backend-driven; may depend on method, user tier, KYC, and other backend rules.',
  },
  'Q-WD-001': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer:
      'Non-cash withdraw methods (card, phone, Cashhello user/P2P) remain in MVP. Cash withdrawal is OUT_OF_MVP.',
  },
  'Q-WD-003': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer: 'Withdraw fees are dynamic and backend-owned per method.',
  },
  'Q-PAY-001': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer:
      'Service catalog is fully backend-owned: categories, services, availability, fees, bonus rules, and conditions.',
  },
  'Q-PAY-003': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer:
      'Bonus account may pay for services. Detailed restrictions are backend-driven.',
  },
  'Q-QR-001': {
    status: 'FUTURE',
    answer_status: 'OUT_OF_MVP',
    owner_answer: 'QR receive/pay flows are FUTURE — not MVP backend contract.',
  },
  'Q-QR-002': {
    status: 'FUTURE',
    answer_status: 'OUT_OF_MVP',
    owner_answer: 'QR receive/pay flows are FUTURE — not MVP backend contract.',
  },
  'Q-QR-003': {
    status: 'FUTURE',
    answer_status: 'OUT_OF_MVP',
    owner_answer: 'QR receive/pay flows are FUTURE — not MVP backend contract.',
  },
  'Q-QR-010': {
    status: 'FUTURE',
    answer_status: 'OUT_OF_MVP',
    owner_answer: 'QR receive/pay flows are FUTURE — not MVP backend contract.',
  },
  'Q-PROFILE-007': {
    status: 'LATER',
    answer_status: 'LATER',
    owner_answer: 'Internal in-app chat/ticket support is LATER — not MVP.',
  },
  'Q-SUPPORT-001': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer: 'External support channels: WhatsApp, Telegram, and phone call.',
  },
  'Q-SUPPORT-002': {
    status: 'ANSWERED',
    answer_status: 'OWNER_APPROVED',
    owner_answer: 'Support availability target: 24/7.',
  },
  'Q-CARD-001': { status: 'PARKED_ILYA', answer_status: 'PARKED_ILYA' },
  'Q-KYC-001': { status: 'PARKED_ILYA', answer_status: 'PARKED_ILYA' },
};

function loadJson(name) {
  return JSON.parse(fs.readFileSync(path.join(MANIFESTS, name), 'utf8'));
}

function saveJson(name, data) {
  fs.writeFileSync(path.join(MANIFESTS, name), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function applyOwnerDecisions(questions) {
  let updated = 0;
  for (const q of questions) {
    const decision = OWNER_DECISIONS[q.question_id];
    if (decision) {
      q.status = decision.status;
      q.answer_status = decision.answer_status;
      if (decision.owner_answer) q.owner_answer = decision.owner_answer;
      q.answered_at = AUDIT_DATE;
      q.answer_evidence = `${EVIDENCE_PHASE_C}; ${EVIDENCE_RECON}`;
      updated += 1;
    }
    const owner = inferDecisionOwner(q);
    if (owner) q.decision_owner = owner;
    else if (q.status === 'ANSWERED' || q.status === 'N/A') q.decision_owner = 'OWNER';
    else if (!q.decision_owner) q.decision_owner = 'UNASSIGNED';
  }
  return updated;
}

function applyFlowStatus(flows) {
  for (const flow of flows) {
    flow.mvp_status = FLOW_MVP_STATUS[flow.flow_id] || 'UNKNOWN';
    flow.mvp_status_updated_at = AUDIT_DATE;
    flow.mvp_status_evidence = `${EVIDENCE_PHASE_C}; ${EVIDENCE_RECON}`;
  }
}

function generateScreenshotManifest(screens) {
  const rows = [];
  for (const screen of screens) {
    const shots = screen.screenshots?.length
      ? screen.screenshots
      : screen.screenshot
        ? [{ path: screen.screenshot, state: 'PRIMARY', capture_status: 'CAPTURED' }]
        : [];
    for (const shot of shots) {
      const mvp = classifyScreen(screen);
      const file = path.basename(shot.path);
      const liveStatus = liveVerificationStatus(screen, shot);
      rows.push({
        file,
        screen_id: screen.screen_id,
        route: screen.route,
        state: shot.state || null,
        variant: shot.state || file,
        capture_status: shot.capture_status || 'UNKNOWN',
        current_source_match: shot.capture_status === 'CAPTURE_GAP' ? 'GAP' : 'SOURCE_MATCH',
        live_verification: liveStatus,
        mvp_status: mvp,
        backend_needed: backendNeeded(mvp, null, screen),
        owner_dependency: (screen.owner_questions || []).join(', ') || null,
        notes:
          screen.screen_id === 'CAS-WD-005'
            ? 'P2P Cashhello-user flow (BP-P2P-001) — NOT cash withdrawal'
            : shot.note || null,
      });
    }
  }
  return rows;
}

function generateScreenApiMatrix(screens, actions) {
  const screenById = Object.fromEntries(screens.map((s) => [s.screen_id, s]));
  return actions.map((action) => {
    const screen = screenById[action.screen_id] || { screen_id: action.screen_id };
    const shot = screen.screenshot ? screen.screenshot.split('/').pop() : null;
    return buildContractRow(action, screen, shot);
  });
}

function generateMvpScopeRows(flows) {
  return flows.map((flow) => ({
    module: flow.flow_id.split('-').slice(1).join('-'),
    screen_flow: flow.name,
    flow_id: flow.flow_id,
    current_ui: 'PROTOTYPE_MOCK',
    approved_mvp: flow.mvp_status,
    backend_needed: ['MVP', 'MVP_PARTIAL_PENDING'].includes(flow.mvp_status)
      ? flow.flow_id === 'BP-SUPPORT-002'
        ? 'config_only'
        : 'yes'
      : 'no',
    owner_dependency: (flow.owner_questions || [])
      .filter((id) => {
        const d = OWNER_DECISIONS[id];
        return !d || d.status === 'PARKED_ILYA' || d.status === 'UNANSWERED';
      })
      .join(', '),
    status: flow.mvp_status,
    notes:
      flow.flow_id === 'BP-P2P-001'
        ? 'Route /legacy/withdraw/cashhello-user — P2P not cash'
        : null,
  }));
}

function writeScreenApiMatrixMarkdown(matrix, outPath) {
  const cols = SCREEN_API_SCHEMA_FIELDS;
  const lines = [
    '# Screen API Matrix',
    '',
    `**Generated:** audit-handoff-closure.js · **Reconciliation:** ${EVIDENCE_RECON}`,
    `**Audit date:** ${AUDIT_DATE}`,
    `**Actions:** ${matrix.length}`,
    '',
    'Full contract schema in `SCREEN_API_MATRIX.json`. Capability names are draft — not final REST paths.',
    '',
    `| ${cols.join(' | ')} |`,
    `| ${cols.map(() => '---').join(' | ')} |`,
  ];
  for (const row of matrix) {
    lines.push(`| ${cols.map((c) => String(row[c] ?? '').replace(/\|/g, '/').replace(/\n/g, ' ')).join(' | ')} |`);
  }
  fs.writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8');
}

function writeScreenshotManifestMarkdown(rows, outPath) {
  const lines = [
    '# Screenshot scope manifest',
    '',
    `**Reconciliation:** ${EVIDENCE_RECON}`,
    `**Audit date:** ${AUDIT_DATE}`,
    `**Entries:** ${rows.length}`,
    '',
    'live_verification: `MANUAL_RUNTIME_VERIFIED` only where guest/authorized home was manually checked; others `LIVE_BUILD_MATCH_ONLY` (bundle hash parity, not per-state click-through).',
    '',
    '| file | screen_id | route | variant | mvp_status | backend_needed | live_verification | owner_dependency | notes |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ];
  for (const row of rows) {
    lines.push(
      `| ${row.file} | ${row.screen_id} | ${row.route} | ${row.variant || ''} | ${row.mvp_status} | ${row.backend_needed} | ${row.live_verification} | ${row.owner_dependency || ''} | ${(row.notes || '').replace(/\|/g, '/')} |`,
    );
  }
  fs.writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8');
}

function generateBusinessProcessSpec(flows, questions) {
  const qByFlow = {};
  for (const f of flows) {
    qByFlow[f.flow_id] = f;
  }

  const templates = {
    'BP-AUTH-001': {
      actors: 'GUEST → AUTHORIZED',
      preconditions: 'Valid phone; WhatsApp reachable',
      trigger: 'Guest taps auth entry or gated financial action',
      happy_path: 'Phone → WhatsApp OTP → verify → create PIN → confirm → authorized home',
      alternate_error: 'Invalid phone; OTP fail; PIN mismatch',
      monetary_effect: 'None',
      backend_owned: 'auth.resolvePhone, auth.requestOtp, auth.verifyOtp, auth.setPin, session',
      ui_states: '/legacy/auth steps (normal auth only — not KYC prototype)',
      history_impact: 'None',
      notifications: 'PARKED_ILYA',
    },
    'BP-P2P-001': {
      actors: 'AUTHORIZED sender',
      preconditions: 'Sufficient balance; recipient phone known',
      trigger: 'Withdraw sheet → Cashhello user OR /legacy/withdraw/cashhello-user',
      happy_path: 'Enter phone → lookup → amount → confirm → success',
      alternate_error: 'User not found; limit exceeded; insufficient funds',
      monetary_effect: 'Debit sender; credit recipient on success',
      backend_owned: 'p2p.lookupRecipient (phone only), p2p.quote, p2p.create',
      ui_states: 'CAS-WD-005 screens',
      history_impact: 'Append transfer operation',
      notifications: 'UNKNOWN',
      notes: 'Route contains cashhello-user — classified as P2P NOT cash withdrawal',
    },
    'BP-WD-003': {
      actors: 'AUTHORIZED',
      preconditions: 'N/A — OUT_OF_MVP',
      trigger: 'Cash withdraw path in prototype UI only',
      happy_path: 'DO NOT IMPLEMENT',
      alternate_error: 'N/A',
      monetary_effect: 'N/A',
      backend_owned: 'DO_NOT_IMPLEMENT',
      ui_states: 'LEGACY_ONLY prototype',
      history_impact: 'N/A',
      notifications: 'N/A',
      notes: 'Distinct from BP-P2P-001 /cashhello-user',
    },
  };

  const lines = [
    '# Business process specification',
    '',
    `**Reconciliation:** ${EVIDENCE_RECON}`,
    `**Audit date:** ${AUDIT_DATE}`,
    '',
    'Approved processes + explicit pending. Mock values are not production truth.',
    '',
  ];

  for (const flow of flows) {
    const t = templates[flow.flow_id] || {};
    const pending = (flow.owner_questions || []).filter((id) => {
      const q = questions.find((x) => x.question_id === id);
      return !q || q.status === 'UNANSWERED' || q.status === 'PARKED_ILYA';
    });

    lines.push(`## ${flow.flow_id} — ${flow.name}`);
    lines.push('');
    lines.push(`| Field | Value |`);
    lines.push(`| --- | --- |`);
    lines.push(`| MVP status | ${flow.mvp_status} |`);
    lines.push(`| Actors | ${t.actors || flow.actor || 'UNKNOWN'} |`);
    lines.push(`| Preconditions | ${t.preconditions || 'OWNER_DECISION_REQUIRED'} |`);
    lines.push(`| Trigger | ${t.trigger || `Entry: ${flow.entry_screen}`} |`);
    lines.push(`| Happy path | ${t.happy_path || 'OWNER_DECISION_REQUIRED'} |`);
    lines.push(`| Alternate/error paths | ${t.alternate_error || 'OWNER_DECISION_REQUIRED'} |`);
    lines.push(`| Monetary effect | ${t.monetary_effect || 'OWNER_DECISION_REQUIRED'} |`);
    lines.push(`| Backend-owned rules | ${t.backend_owned || (flow.mvp_status.includes('MVP') ? 'See SCREEN_API_MATRIX' : 'DO_NOT_IMPLEMENT')} |`);
    lines.push(`| UI states | ${t.ui_states || (flow.screens || []).join(', ')} |`);
    lines.push(`| History impact | ${t.history_impact || 'OWNER_DECISION_REQUIRED'} |`);
    lines.push(`| Notifications | ${t.notifications || 'OWNER_DECISION_REQUIRED'} |`);
    lines.push(`| Owner dependencies | ${pending.length ? pending.join(', ') : 'None blocking'} |`);
    if (t.notes) lines.push(`| Notes | ${t.notes} |`);
    lines.push('');
  }

  return lines.join('\n');
}

function main() {
  const questions = loadJson('owner_questions.json');
  const flows = loadJson('flows.json');
  const screens = loadJson('screens.json');
  const actions = loadJson('actions.json');

  const qUpdated = applyOwnerDecisions(questions);
  applyFlowStatus(flows);
  saveJson('owner_questions.json', questions);
  saveJson('flows.json', flows);

  const screenshotRows = generateScreenshotManifest(screens);
  const apiMatrix = generateScreenApiMatrix(screens, actions);
  const mvpRows = generateMvpScopeRows(flows);
  const bpSpec = generateBusinessProcessSpec(flows, questions);

  fs.writeFileSync(path.join(DISC, 'SCREENSHOT_SCOPE_MANIFEST.json'), `${JSON.stringify(screenshotRows, null, 2)}\n`);
  writeScreenshotManifestMarkdown(screenshotRows, path.join(DISC, 'SCREENSHOT_SCOPE_MANIFEST.md'));

  fs.writeFileSync(path.join(ROOT, 'docs/backend/SCREEN_API_MATRIX.json'), `${JSON.stringify(apiMatrix, null, 2)}\n`);
  writeScreenApiMatrixMarkdown(apiMatrix, path.join(ROOT, 'docs/backend/SCREEN_API_MATRIX.md'));

  fs.writeFileSync(path.join(ROOT, 'docs/business/MVP_SCOPE_MATRIX.json'), `${JSON.stringify(mvpRows, null, 2)}\n`);
  fs.writeFileSync(path.join(ROOT, 'docs/business/BUSINESS_PROCESS_SPEC.md'), bpSpec);

  const bpBreakdown = {};
  for (const f of flows) bpBreakdown[f.mvp_status] = (bpBreakdown[f.mvp_status] || 0) + 1;

  console.log(
    JSON.stringify(
      {
        owner_questions_updated: qUpdated,
        flows: flows.length,
        bp_status_breakdown: bpBreakdown,
        bp_status_sum: Object.values(bpBreakdown).reduce((a, b) => a + b, 0),
        screenshot_rows: screenshotRows.length,
        api_matrix_rows: apiMatrix.length,
        p2p_cas_wd_005: apiMatrix.filter((r) => r.screen_id === 'CAS-WD-005').map((r) => r.mvp_status),
        cashhello_misclassified: apiMatrix.filter(
          (r) => r.screen_id === 'CAS-WD-005' && r.mvp_status === 'OUT_OF_MVP',
        ).length,
      },
      null,
      2,
    ),
  );
}

main();
