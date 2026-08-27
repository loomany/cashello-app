/**
 * One-shot JSON patch for discovery manifests (support FAB, HOME-002 alias).
 * Safe to re-run: upserts by id.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'manifests');

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
}
function save(name, data) {
  fs.writeFileSync(path.join(dir, name), `${JSON.stringify(data, null, 2)}\n`);
}

const screens = load('screens.json');
const actions = load('actions.json');
const flows = load('flows.json');
const questions = load('owner_questions.json');

function upsert(list, key, record) {
  const i = list.findIndex((row) => row[key] === record[key]);
  if (i >= 0) list[i] = { ...list[i], ...record };
  else list.push(record);
}

const home = screens.find((s) => s.screen_id === 'LGC-SCR-025');
if (home) {
  const aliases = new Set(home.aliases || []);
  aliases.add('HOME-002');
  aliases.add('legacyNodeId 765:22510');
  home.aliases = [...aliases];
}

const guest = screens.find((s) => s.screen_id === 'HOME-001');
if (guest && Array.isArray(guest.exit_actions) && !guest.exit_actions.includes('ACT-HOME-001-13')) {
  guest.exit_actions.push('ACT-HOME-001-13');
}
if (
  guest &&
  Array.isArray(guest.owner_questions) &&
  !guest.owner_questions.includes('Q-SUPPORT-001')
) {
  guest.owner_questions.push('Q-SUPPORT-001', 'Q-SUPPORT-002', 'Q-SUPPORT-003');
}

const authHome = screens.find((s) => s.screen_id === 'LGC-SCR-025');
if (
  authHome &&
  Array.isArray(authHome.exit_actions) &&
  !authHome.exit_actions.includes('ACT-LGC-SCR-025-17')
) {
  authHome.exit_actions.push('ACT-LGC-SCR-025-17');
}

upsert(screens, 'screen_id', {
  screen_id: 'CAS-SUPPORT-002',
  aliases: ['GLOBAL_SUPPORT_SHEET'],
  name: 'Служба поддержки',
  module: 'SUPPORT',
  route: 'overlay on /legacy/*',
  auth_state: 'ANY',
  figma_node: null,
  legacy_node: null,
  component: 'src/features/legacyHome/SupportContactSheet.tsx',
  screenshot: 'screenshots/annotated/CAS-SUPPORT-002__sheet-authorized.png',
  screenshots: [
    {
      state: 'GUEST_SHEET',
      path: 'screenshots/annotated/CAS-SUPPORT-002__sheet-guest.png',
      note: null,
    },
    {
      state: 'AUTHORIZED_SHEET',
      path: 'screenshots/annotated/CAS-SUPPORT-002__sheet-authorized.png',
      note: null,
    },
  ],
  source_status: 'CODE_ONLY',
  states: ['GUEST_SHEET', 'AUTHORIZED_SHEET', 'LINK_UNAVAILABLE'],
  entry_actions: ['ACT-GLOBAL-SUPPORT-01', 'ACT-HOME-001-13', 'ACT-LGC-SCR-025-17'],
  exit_actions: [
    'ACT-CAS-SUPPORT-002-01',
    'ACT-CAS-SUPPORT-002-02',
    'ACT-CAS-SUPPORT-002-03',
    'ACT-CAS-SUPPORT-002-04',
  ],
  owner_questions: [
    'Q-SUPPORT-001',
    'Q-SUPPORT-002',
    'Q-SUPPORT-003',
    'Q-SUPPORT-004',
    'Q-SUPPORT-005',
  ],
});

const supportActions = [
  {
    action_id: 'ACT-GLOBAL-SUPPORT-01',
    screen_id: 'CAS-SUPPORT-002',
    callout: '01',
    label: 'Служба поддержки',
    control_type: 'icon',
    current_destination_type: 'SHEET',
    current_destination: 'CAS-SUPPORT-002 SupportContactSheet',
    handler: 'SupportContactHost setOpen(true)',
    mock_effect: 'Opens in-tree support sheet on every /legacy/* route',
    precondition: 'Any legacy product screen',
    potential_backend_requirement: 'Owner-provided contact URLs and channel policy',
    guest_behavior: 'Visible to guest and authorized; bottom offset 98px guest / 80px authorized',
    component: 'src/features/legacyHome/SupportContactFab.tsx',
    icon_meaning: 'Headset / Support',
    source_trace: [
      'src/app/legacy/_layout.tsx',
      'src/features/legacyHome/SupportContactHost.tsx',
      'src/features/legacyHome/SupportContactFab.tsx',
      'src/features/legacyHome/supportContact.ts',
    ],
    owner_questions: ['Q-SUPPORT-001', 'Q-SUPPORT-003'],
  },
  {
    action_id: 'ACT-HOME-001-13',
    screen_id: 'HOME-001',
    callout: '13',
    label: 'Служба поддержки',
    control_type: 'icon',
    current_destination_type: 'SHEET',
    current_destination: 'CAS-SUPPORT-002',
    handler: 'SupportContactHost',
    mock_effect: 'Opens support sheet',
    precondition: 'HOME-001 visible',
    potential_backend_requirement: 'Same as ACT-GLOBAL-SUPPORT-01',
    guest_behavior: 'Visible and enabled for guest',
    component: 'src/features/legacyHome/SupportContactFab.tsx',
    icon_meaning: 'Headset / Support',
    source_trace: ['src/features/legacyHome/SupportContactFab.tsx'],
    owner_questions: ['Q-SUPPORT-001'],
  },
  {
    action_id: 'ACT-LGC-SCR-025-17',
    screen_id: 'LGC-SCR-025',
    callout: '17',
    label: 'Служба поддержки',
    control_type: 'icon',
    current_destination_type: 'SHEET',
    current_destination: 'CAS-SUPPORT-002',
    handler: 'SupportContactHost',
    mock_effect: 'Opens support sheet',
    precondition: 'Authorized home visible',
    potential_backend_requirement: 'Same as ACT-GLOBAL-SUPPORT-01',
    guest_behavior: 'N/A — authorized home',
    component: 'src/features/legacyHome/SupportContactFab.tsx',
    icon_meaning: 'Headset / Support',
    source_trace: ['src/features/legacyHome/SupportContactFab.tsx'],
    owner_questions: ['Q-SUPPORT-001'],
  },
  {
    action_id: 'ACT-CAS-SUPPORT-002-01',
    screen_id: 'CAS-SUPPORT-002',
    callout: '02',
    label: 'Закрыть',
    control_type: 'icon',
    current_destination_type: 'LOCAL_STATE',
    current_destination: 'close SupportContactSheet',
    handler: 'onClose',
    mock_effect: 'Hides sheet',
    precondition: 'Sheet open',
    potential_backend_requirement: 'None identified from current UI',
    guest_behavior: 'Same',
    component: 'src/features/legacyHome/SupportContactSheet.tsx',
    icon_meaning: 'Close',
    source_trace: ['src/features/legacyHome/SupportContactSheet.tsx'],
    owner_questions: [],
  },
  {
    action_id: 'ACT-CAS-SUPPORT-002-02',
    screen_id: 'CAS-SUPPORT-002',
    callout: '03',
    label: 'Телеграм 24/7',
    control_type: 'row',
    current_destination_type: 'NO_OP_STUB',
    current_destination: 'Alert «Скоро» because SUPPORT_CONTACT_LINKS.telegram is null',
    handler: 'openChannel(telegram)',
    mock_effect: 'Alert: Ссылка на поддержку будет добавлена позже.',
    precondition: 'Sheet open',
    potential_backend_requirement: 'Production Telegram URL',
    guest_behavior: 'Same Alert — no live chat',
    component: 'src/features/legacyHome/SupportContactSheet.tsx',
    icon_meaning: 'Telegram',
    source_trace: [
      'src/features/legacyHome/SupportContactSheet.tsx',
      'src/features/legacyHome/supportContact.ts',
    ],
    owner_questions: ['Q-SUPPORT-001', 'Q-SUPPORT-004', 'Q-SUPPORT-005'],
  },
  {
    action_id: 'ACT-CAS-SUPPORT-002-03',
    screen_id: 'CAS-SUPPORT-002',
    callout: '04',
    label: 'Whatsapp 24/7',
    control_type: 'row',
    current_destination_type: 'NO_OP_STUB',
    current_destination: 'Alert «Скоро» because SUPPORT_CONTACT_LINKS.whatsapp is null',
    handler: 'openChannel(whatsapp)',
    mock_effect: 'Alert: Ссылка на поддержку будет добавлена позже.',
    precondition: 'Sheet open',
    potential_backend_requirement: 'Production WhatsApp URL',
    guest_behavior: 'Same Alert — no live chat',
    component: 'src/features/legacyHome/SupportContactSheet.tsx',
    icon_meaning: 'WhatsApp',
    source_trace: [
      'src/features/legacyHome/SupportContactSheet.tsx',
      'src/features/legacyHome/supportContact.ts',
    ],
    owner_questions: ['Q-SUPPORT-001', 'Q-SUPPORT-004', 'Q-SUPPORT-005'],
  },
  {
    action_id: 'ACT-CAS-SUPPORT-002-04',
    screen_id: 'CAS-SUPPORT-002',
    callout: '05',
    label: 'Затемнение / закрыть',
    control_type: 'overlay',
    current_destination_type: 'LOCAL_STATE',
    current_destination: 'close SupportContactSheet',
    handler: 'overlay onPress onClose',
    mock_effect: 'Hides sheet',
    precondition: 'Sheet open',
    potential_backend_requirement: 'None identified from current UI',
    guest_behavior: 'Same',
    component: 'src/features/legacyHome/SupportContactSheet.tsx',
    icon_meaning: 'Close',
    source_trace: ['src/features/legacyHome/SupportContactSheet.tsx'],
    owner_questions: [],
  },
];
for (const action of supportActions) upsert(actions, 'action_id', action);

upsert(flows, 'flow_id', {
  flow_id: 'BP-SUPPORT-002',
  name: 'Контакт поддержки через глобальный FAB',
  actor: 'ANY',
  entry_screen: 'HOME-001',
  screens: ['HOME-001', 'LGC-SCR-025', 'CAS-SUPPORT-002'],
  actions: ['ACT-GLOBAL-SUPPORT-01', 'ACT-CAS-SUPPORT-002-02', 'ACT-CAS-SUPPORT-002-03'],
  exit_states: ['SHEET_OPEN', 'ALERT_LINK_UNAVAILABLE'],
  owner_questions: [
    'Q-SUPPORT-001',
    'Q-SUPPORT-002',
    'Q-SUPPORT-003',
    'Q-SUPPORT-004',
    'Q-SUPPORT-005',
  ],
});

const supportQuestions = [
  {
    question_id: 'Q-SUPPORT-001',
    module: 'SUPPORT',
    process_ids: ['BP-SUPPORT-002'],
    screen_ids: ['CAS-SUPPORT-002', 'HOME-001', 'LGC-SCR-025'],
    action_ids: ['ACT-GLOBAL-SUPPORT-01', 'ACT-CAS-SUPPORT-002-02', 'ACT-CAS-SUPPORT-002-03'],
    priority: 'P1',
    required_by: 'REQUIRED_BEFORE_PRODUCTION',
    question_ru:
      'Какие каналы поддержки должны быть доступны пользователю в приложении? Сейчас прототип показывает Telegram и WhatsApp, но ссылки пустые.',
    options: [
      'A — только Telegram',
      'B — только WhatsApp',
      'C — Telegram и WhatsApp',
      'D — телефон / email / чат в приложении',
      'OTHER / OWNER EXPLANATION: ______',
    ],
    current_prototype_fact:
      'CURRENT_CODE_FACT: FAB на всех /legacy/* экранах открывает sheet «Служба поддержки». CURRENT_MOCK_BEHAVIOR: SUPPORT_CONTACT_LINKS.telegram/whatsapp = null → Alert «Скоро».',
    why_it_matters:
      'Без рабочих каналов пользователь не может связаться с поддержкой в production.',
    status: 'UNANSWERED',
    decision_type: 'BUSINESS_DECISION',
  },
  {
    question_id: 'Q-SUPPORT-002',
    module: 'SUPPORT',
    process_ids: ['BP-SUPPORT-002', 'BP-SUPPORT-001'],
    screen_ids: ['CAS-SUPPORT-002', 'LGC-SCR-126'],
    action_ids: ['ACT-CAS-SUPPORT-002-02', 'ACT-LGC-SCR-126-02'],
    priority: 'P2',
    required_by: 'CAN_DECIDE_LATER',
    question_ru:
      'Подпись «24/7» означает, что живой оператор реально отвечает круглосуточно, или это только маркетинговый текст?',
    options: [
      'A — живые операторы 24/7',
      'B — бот 24/7, люди в рабочие часы',
      'C — убрать «24/7», указать часы',
      'OTHER / OWNER EXPLANATION: ______',
    ],
    current_prototype_fact: 'PROTOTYPE_UI_ONLY: тексты «Телеграм 24/7» и «Whatsapp 24/7».',
    why_it_matters: 'Нельзя обещать круглосуточную поддержку, если операционно это не так.',
    status: 'UNANSWERED',
    decision_type: 'BUSINESS_DECISION',
  },
  {
    question_id: 'Q-SUPPORT-003',
    module: 'SUPPORT',
    process_ids: ['BP-SUPPORT-002'],
    screen_ids: ['HOME-001', 'CAS-SUPPORT-002'],
    action_ids: ['ACT-HOME-001-13', 'ACT-GLOBAL-SUPPORT-01'],
    priority: 'P1',
    required_by: 'REQUIRED_BEFORE_PRODUCTION',
    question_ru:
      'Гость без аккаунта может писать в поддержку, или канал только для авторизованных пользователей?',
    options: [
      'A — гость может писать',
      'B — только после входа',
      'C — гость видит контакты, но тикеты не принимаются',
      'OTHER / OWNER EXPLANATION: ______',
    ],
    current_prototype_fact:
      'CURRENT_RUNTIME_FACT: FAB виден и гостю, и авторизованному пользователю.',
    why_it_matters:
      'Нужно понять, идентифицируется ли обратившийся и какие данные передавать оператору.',
    status: 'UNANSWERED',
    decision_type: 'BUSINESS_DECISION',
  },
  {
    question_id: 'Q-SUPPORT-004',
    module: 'SUPPORT',
    process_ids: ['BP-SUPPORT-002'],
    screen_ids: ['CAS-SUPPORT-002'],
    action_ids: ['ACT-CAS-SUPPORT-002-02', 'ACT-CAS-SUPPORT-002-03'],
    priority: 'P2',
    required_by: 'REQUIRED_BEFORE_PRODUCTION',
    question_ru: 'Какие рабочие ссылки Telegram и WhatsApp нужно открывать из приложения?',
    options: ['OTHER / OWNER EXPLANATION: укажите URL / username / номер ______'],
    current_prototype_fact:
      'CURRENT_CODE_FACT: SUPPORT_CONTACT_LINKS = { telegram: null, whatsapp: null }.',
    why_it_matters: 'Без URL кнопки останутся заглушкой «Скоро».',
    status: 'UNANSWERED',
    decision_type: 'BUSINESS_DECISION',
  },
  {
    question_id: 'Q-SUPPORT-005',
    module: 'SUPPORT',
    process_ids: ['BP-SUPPORT-002', 'BP-SUPPORT-001'],
    screen_ids: ['CAS-SUPPORT-002', 'LGC-SCR-125', 'LGC-SCR-126'],
    action_ids: ['ACT-GLOBAL-SUPPORT-01', 'ACT-LGC-SCR-125-03'],
    priority: 'P1',
    required_by: 'REQUIRED_BEFORE_BACKEND',
    question_ru:
      'Глобальная кнопка поддержки, экран «Сообщения» и экран «Помощь» — это один процесс или разные? Куда должен попадать пользователь?',
    options: [
      'A — FAB сразу открывает Telegram/WhatsApp',
      'B — FAB открывает внутриприложенческий чат/тикет',
      'C — FAB и «Помощь» — разные каналы',
      'OTHER / OWNER EXPLANATION: ______',
    ],
    current_prototype_fact:
      'CURRENT_CODE_FACT: FAB — внешние каналы-заглушки. LGC-SCR-125/126 — отдельные экраны сообщений/помощи без отправки.',
    why_it_matters: 'Иначе в продукте будет три несогласованных «поддержки».',
    status: 'UNANSWERED',
    decision_type: 'BUSINESS_DECISION',
  },
];
for (const q of supportQuestions) upsert(questions, 'question_id', q);

save('screens.json', screens);
save('actions.json', actions);
save('flows.json', flows);
save('owner_questions.json', questions);
console.log(
  JSON.stringify(
    {
      screens: screens.length,
      actions: actions.length,
      flows: flows.length,
      questions: questions.length,
    },
    null,
    2,
  ),
);
