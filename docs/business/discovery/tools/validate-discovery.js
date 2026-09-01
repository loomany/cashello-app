/**
 * Validate NEW Cashello handoff artifacts (clean-room audit).
 * Legacy discovery manifests validated separately for JSON integrity only.
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

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

// --- Legacy discovery JSON integrity (historical manifests) ---
for (const name of ['screens.json', 'actions.json', 'flows.json', 'owner_questions.json']) {
  const p = path.join(DISC, 'manifests', name);
  try {
    JSON.parse(fs.readFileSync(p, 'utf8'));
    ok(`historical json ${name}`);
  } catch (error) {
    fail(`historical json ${name}: ${error.message}`);
  }
}

// --- NEW app artifacts required ---
const REQUIRED = [
  'docs/business/NEW_APP_ROUTE_MAP.json',
  'docs/business/NEW_APP_SCREEN_CATALOG.json',
  'docs/business/NEW_APP_ACTION_CATALOG.json',
  'docs/business/BUSINESS_PROCESS_SPEC.json',
  'docs/backend/SCREEN_API_MATRIX.json',
  'docs/backend/TALGAT_HANDOFF.md',
  'docs/backend/NEW_APP_HANDOFF_AUDIT_REPORT.md',
  'docs/business/OLD_CASHHELLO_PURGE_REPORT.md',
  'docs/business/discovery/manifests/source_interactions.json',
];

for (const rel of REQUIRED) {
  if (!fs.existsSync(path.join(ROOT, rel))) fail(`missing required artifact ${rel}`);
  else ok(`exists ${rel}`);
}

const routes = readJson('docs/business/NEW_APP_ROUTE_MAP.json');
const screens = readJson('docs/business/NEW_APP_SCREEN_CATALOG.json');
const actions = readJson('docs/business/NEW_APP_ACTION_CATALOG.json');
const processes = readJson('docs/business/BUSINESS_PROCESS_SPEC.json');
const matrix = readJson('docs/backend/SCREEN_API_MATRIX.json');
const questions = readJson('docs/business/discovery/manifests/owner_questions.json');

const screenIds = new Set(screens.map((s) => s.screen_id));
const actionIds = new Set(actions.map((a) => a.action_id));
const answeredOwners = new Set(
  questions.filter((q) => q.status === 'ANSWERED').map((q) => q.question_id),
);

// Unique IDs
for (const [rows, key] of [
  [screens, 'screen_id'],
  [actions, 'action_id'],
  [processes, 'process_id'],
  [matrix, 'action_id'],
]) {
  const seen = new Set();
  for (const row of rows) {
    if (seen.has(row[key])) fail(`duplicate ${key}: ${row[key]}`);
    seen.add(row[key]);
  }
}
ok('unique NEW app IDs');

// Action → screen refs
for (const action of actions) {
  if (!screenIds.has(action.screen_id)) {
    fail(`action ${action.action_id} references missing screen ${action.screen_id}`);
  }
  if (!action.business_purpose || action.business_purpose === 'UNKNOWN') {
    fail(`action ${action.action_id} missing business_purpose`);
  }
  if (!action.current_ui_behavior || action.current_ui_behavior === 'UNKNOWN') {
    fail(`action ${action.action_id} missing current_ui_behavior`);
  }
}
ok('action screen refs + required fields');

// --- Source raw interaction inventory → action catalog ---
const sourceManifest = readJson('docs/business/discovery/manifests/source_interactions.json');
const rawInteractions = Array.isArray(sourceManifest) ? sourceManifest : sourceManifest.interactions;
const scanMeta = Array.isArray(sourceManifest) ? null : sourceManifest.scan_meta;

if (!rawInteractions || !Array.isArray(rawInteractions)) {
  fail('source_interactions.json missing interactions array');
}

if (scanMeta) {
  if (scanMeta.unclassified !== 0) {
    fail(`source scan unclassified=${scanMeta.unclassified} (must be 0)`);
  }
  if (scanMeta.source_candidates !== scanMeta.classified_candidates) {
    fail(
      `source scan candidates=${scanMeta.source_candidates} != classified=${scanMeta.classified_candidates}`,
    );
  }
}

const VALID_MAPPING = new Set(['MAPPED', 'UI_LOCAL', 'DUPLICATE_BEHAVIOR', 'CURRENT_UI_GAP']);
const rawIds = new Set();
const scannedKeys = new Set();

for (const raw of rawInteractions) {
  if (rawIds.has(raw.interaction_id)) fail(`duplicate source interaction ${raw.interaction_id}`);
  rawIds.add(raw.interaction_id);
  if (!VALID_MAPPING.has(raw.mapping_status)) {
    fail(`source ${raw.interaction_id} invalid mapping_status ${raw.mapping_status}`);
  }
  if (raw.line > 0 && raw.scan_key) scannedKeys.add(raw.scan_key);
  if (['MAPPED', 'DUPLICATE_BEHAVIOR', 'CURRENT_UI_GAP'].includes(raw.mapping_status)) {
    if (!raw.catalog_action_id) fail(`source ${raw.interaction_id} missing catalog_action_id`);
    else if (!actionIds.has(raw.catalog_action_id)) {
      fail(`source ${raw.interaction_id} refs missing catalog action ${raw.catalog_action_id}`);
    }
  }
  if (raw.mapping_status === 'UI_LOCAL' && raw.catalog_action_id) {
    fail(`source ${raw.interaction_id} UI_LOCAL must not have catalog_action_id`);
  }
}

// Re-scan to verify every auto-found candidate is classified in manifest
try {
  const { scanReachableSource, scanKey } = require('./source-interaction-scan');
  const liveScan = scanReachableSource(ROOT).filter((r) => !r.interaction_kind.startsWith('component:'));
  for (const row of liveScan) {
    const key = scanKey(row);
    const classified = rawInteractions.some(
      (r) => r.scan_key === key && r.mapping_status && r.mapping_status !== 'UNCLASSIFIED',
    );
    if (!classified) fail(`live scan candidate unclassified: ${key}`);
  }
  if (scanMeta && liveScan.length !== scanMeta.source_candidates) {
    fail(`scan_meta source_candidates=${scanMeta.source_candidates} != live scan ${liveScan.length}`);
  }
} catch (error) {
  fail(`source scan verification failed: ${error.message}`);
}

const mappedFromSource = new Set(
  rawInteractions
    .filter((r) => ['MAPPED', 'DUPLICATE_BEHAVIOR'].includes(r.mapping_status))
    .map((r) => r.catalog_action_id),
);
const gapFromSource = new Set(
  rawInteractions
    .filter((r) => r.mapping_status === 'CURRENT_UI_GAP')
    .map((r) => r.catalog_action_id),
);
for (const action of actions) {
  if (!['MVP', 'MVP_PARTIAL_PENDING'].includes(action.mvp_status)) continue;
  if (mappedFromSource.has(action.action_id) || gapFromSource.has(action.action_id)) continue;
  fail(`MVP action ${action.action_id} has no source interaction mapping`);
}
const candidateCount = scanMeta?.source_candidates ?? rawInteractions.filter((r) => r.line > 0).length;
ok(
  `source interaction inventory → catalog (candidates=${candidateCount}, classified=${scanMeta?.classified_candidates ?? candidateCount}, unclassified=0, manifest=${rawInteractions.length})`,
);

// Matrix ↔ action catalog alignment
if (matrix.length !== actions.length) {
  fail(`matrix rows ${matrix.length} != actions ${actions.length}`);
}
for (const row of matrix) {
  if (!actionIds.has(row.action_id)) fail(`matrix row ${row.action_id} not in action catalog`);
  if (!screenIds.has(row.screen_id)) fail(`matrix row ${row.action_id} bad screen ${row.screen_id}`);
  if ('screenshot_ref' in row && row.screenshot_ref) {
    fail(`matrix ${row.action_id} has screenshot_ref — forbidden in new handoff`);
  }
  if (!row.business_purpose) fail(`matrix ${row.action_id} missing business_purpose`);
  if (!row.current_ui_behavior) fail(`matrix ${row.action_id} missing current_ui_behavior`);
  if (row.backend_needed === 'yes' && !row.backend_capability) {
    fail(`matrix ${row.action_id} backend_needed=yes but backend_capability empty`);
  }
  const noBackend = ['OUT_OF_MVP', 'FUTURE', 'PARKED_ILYA', 'LATER', 'STUB', 'ORPHANED', 'DEV_ONLY', 'CURRENT_UI_GAP'];
  if (noBackend.includes(row.mvp_status) && row.backend_needed === 'yes') {
    fail(`${row.action_id}: ${row.mvp_status} cannot have backend_needed=yes`);
  }
  // P2P must not be OUT_OF_MVP
  if (row.route?.includes('cashhello-user') && row.mvp_status === 'OUT_OF_MVP') {
    fail(`P2P action ${row.action_id} must not be OUT_OF_MVP`);
  }
  // Cash routes must not be MVP
  if (
    row.route?.match(/\/(topup|withdraw)\/cash(-map)?/) &&
    !row.route?.includes('cashhello-user') &&
    row.mvp_status === 'MVP_APPROVED'
  ) {
    fail(`cash route action ${row.action_id} must not be MVP_APPROVED`);
  }
  // QR must not be MVP backend
  if (row.mvp_status === 'MVP_APPROVED' && row.route === '/legacy/qr') {
    fail(`QR action ${row.action_id} must not be MVP_APPROVED`);
  }
  // KYC screens
  if (row.screen_id?.startsWith('NEW-AUTH-00') && ['004', '005', '006', '007', '008', '009', '010'].some((n) => row.screen_id.endsWith(n)) && row.mvp_status === 'MVP_APPROVED') {
    fail(`KYC action ${row.action_id} cannot be MVP_APPROVED`);
  }
}
ok(`SCREEN_API_MATRIX semantics (${matrix.length} rows, no screenshot_ref)`);

// OLD_APP_ONLY routes must not appear as MVP in matrix
const oldOnlyRoutes = new Set(
  routes.filter((r) => ['OLD_APP_ONLY', 'DEAD_CODE'].includes(r.new_app_status)).map((r) => r.route),
);
for (const row of matrix) {
  if (oldOnlyRoutes.has(row.route) && row.mvp_status === 'MVP_APPROVED') {
    fail(`OLD_APP_ONLY route ${row.route} action ${row.action_id} in MVP`);
  }
}

// Owner decisions preserved (answered set)
const REQUIRED_ANSWERED = [
  'Q-AUTH-001',
  'Q-AUTH-002',
  'Q-AUTH-010',
  'Q-ACC-001',
  'Q-ACC-005',
  'Q-TOPUP-001',
  'Q-TOPUP-004',
  'Q-P2P-001',
  'Q-P2P-006',
  'Q-WD-001',
  'Q-WD-003',
  'Q-PAY-001',
  'Q-PAY-003',
  'Q-SUPPORT-001',
  'Q-SUPPORT-002',
];
for (const id of REQUIRED_ANSWERED) {
  if (!answeredOwners.has(id)) fail(`owner decision lost: ${id}`);
}
ok('owner decisions preserved (15 ANSWERED)');

// --- Canonical owner answers must not be expanded in derived docs ---
const CANONICAL_OWNER_ANSWERS = {
  'Q-ACC-001': 'On registration, backend auto-creates four accounts: KZT, bonus, USD, and RUB.',
  'Q-P2P-006': 'Limits are operation-specific and backend-driven.',
};

for (const [qid, canonical] of Object.entries(CANONICAL_OWNER_ANSWERS)) {
  const row = questions.find((q) => q.question_id === qid);
  if (!row) fail(`canonical owner question missing: ${qid}`);
  else if (row.owner_answer !== canonical) {
    fail(`${qid} owner_answer must be canonical (got: ${row.owner_answer})`);
  }
}

const DERIVED_OWNER_DOCS = [
  'docs/business/BUSINESS_RULES.md',
  'docs/backend/API_CONTRACT_REQUIREMENTS.md',
];

const FORBIDDEN_OWNER_DERIVATIONS = [
  { qid: 'Q-ACC-001', pattern: /KZT\s*\(\s*primary\s*\)/i, label: 'KZT (primary)' },
  { qid: 'Q-ACC-001', pattern: /four accounts:[^.\n]*\(primary\)/i, label: 'account (primary) qualifier' },
  {
    qid: 'Q-P2P-006',
    pattern: /limits are operation-specific and backend-driven;\s*may depend on/i,
    label: 'expanded Q-P2P-006 limits clause',
  },
  {
    qid: 'Q-P2P-006',
    pattern: /backend-driven\s*\(\s*method\s*\/\s*user\s*\/\s*KYC\s*\)/i,
    label: 'BR-LIM-001 method/user/KYC parenthetical',
  },
  {
    qid: 'Q-P2P-006',
    pattern: /per-operation limits from backend;\s*may depend on user,\s*KYC tier,\s*method,\s*amount,\s*velocity/i,
    label: 'API limits as owner-approved dependency list',
  },
];

for (const rel of DERIVED_OWNER_DOCS) {
  const text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const rule of FORBIDDEN_OWNER_DERIVATIONS) {
    if (rule.pattern.test(text)) {
      fail(`${rel} expands canonical ${rule.qid} (${rule.label})`);
    }
  }
}

const businessRules = fs.readFileSync(path.join(ROOT, 'docs/business/BUSINESS_RULES.md'), 'utf8');
if (!/BR-LIM-001 \| Limits operation-specific, backend-driven \| OWNER_APPROVED/.test(businessRules)) {
  fail('BR-LIM-001 must be operation-specific backend-driven only');
}
if (/BR-ACC-008 \|.*OWNER_APPROVED/.test(businessRules)) {
  fail('BR-ACC-008 must not be OWNER_APPROVED');
}
if (/BR-TECH-003 \|.*OWNER_APPROVED/.test(businessRules)) {
  fail('BR-TECH-003 must not be OWNER_APPROVED');
}

ok('canonical owner answers not expanded in derived docs');

// Handoff docs must not reference deleted screenshot evidence as requirement
const handoffFiles = [
  'docs/backend/TALGAT_HANDOFF.md',
  'docs/backend/SCREEN_API_MATRIX.md',
  'docs/backend/NEW_APP_HANDOFF_AUDIT_REPORT.md',
];
for (const rel of handoffFiles) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) continue;
  const text = fs.readFileSync(p, 'utf8');
  if (/screenshot_ref\s*[:=]/i.test(text) && !text.includes('zero screenshot_ref') && !text.includes('no screenshot_ref')) {
    // allow mentions that say "no screenshot"
  }
  if (/158 screenshots|screenshot_match|live screenshot parity/i.test(text)) {
    fail(`${rel} references deprecated screenshot evidence language`);
  }
}

// TALGAT must state new-app-only
const talgat = fs.readFileSync(path.join(ROOT, 'docs/backend/TALGAT_HANDOFF.md'), 'utf8');
if (!talgat.includes('CURRENT NEW CASHELLO')) fail('TALGAT_HANDOFF missing new-app header');
if (!talgat.includes('screenshot') && !talgat.includes('deprecated')) {
  // should mention deprecated screenshots
}
if (!/deprecated/i.test(talgat)) fail('TALGAT_HANDOFF must mention deprecated old screenshots');
if (!talgat.includes('SOURCE_BASELINE_SHA')) fail('TALGAT_HANDOFF must declare SOURCE_BASELINE_SHA');
if (talgat.match(/\*\*HEAD:\*\*/)) fail('TALGAT_HANDOFF must not use self-referential review HEAD');
ok('TALGAT_HANDOFF new-app policy');

// Screenshot manifest deprecated
const shotMd = fs.readFileSync(path.join(DISC, 'SCREENSHOT_SCOPE_MANIFEST.md'), 'utf8');
if (!shotMd.includes('DEPRECATED')) fail('SCREENSHOT_SCOPE_MANIFEST not deprecated');
ok('screenshot manifest deprecated');

// Count stale screenshot refs in NEW matrix JSON
let shotRefs = 0;
for (const row of matrix) {
  if (row.screenshot_ref) shotRefs += 1;
}
if (shotRefs > 0) fail(`screenshot_ref count in new matrix: ${shotRefs}`);
ok(`screenshot_ref in new handoff: 0`);

// Business process count
if (processes.length < 20) fail(`expected ~22 processes, got ${processes.length}`);
ok(`business processes: ${processes.length}`);

// Route counts
const newRoutes = routes.filter((r) => r.new_app_status === 'CURRENT_NEW_APP').length;
const oldRoutes = routes.filter((r) =>
  ['OLD_APP_ONLY', 'ORPHANED', 'DEAD_CODE'].includes(r.new_app_status),
).length;

console.log(
  JSON.stringify(
    {
      new_app_routes: newRoutes,
      old_only_routes: oldRoutes,
      screens: screens.length,
      actions: actions.length,
      processes: processes.length,
      matrix: matrix.length,
      source_candidates: scanMeta?.source_candidates ?? null,
      source_interactions: rawInteractions.length,
      screenshot_ref: shotRefs,
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
