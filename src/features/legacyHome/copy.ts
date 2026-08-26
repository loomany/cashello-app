/** Exact visible late-UI copy from live Figma Home (765:22510). Do not polish. */

export const homeCopy = {
  title: 'Cashhello',
  search: 'Поиск',
  balanceLabel: 'Счет ₸',
  balanceAmount: '234 888 ₸',
  balanceLabelRub: 'Счет ₽',
  balanceAmountRub: '43 900 ₽',
  balanceLabelUsd: 'Счет $',
  balanceAmountUsd: '123 $',
  allAccounts: 'Все',
  services: 'Сервисы',
  history: 'История',
  seeAll: 'См. все',
  filter: 'Фильтр',
  withdraw: 'Вывести деньги',
  withdrawAction: 'Вывести',
  hideBalance: 'Скрыть',
  showBalance: 'Показать',
  headerBonus: '500 Б',
  registrationBonus: 'Бонус за регистрацию',
  registrationBonusStatus: '',
  registrationBonusAmount: '+500 Б',
  searchCancel: 'Отменить',
  searchHistory: 'История поиска',
} as const;

export const homeAccounts = [
  { id: 'kzt', label: homeCopy.balanceLabel, amount: homeCopy.balanceAmount },
  { id: 'rub', label: homeCopy.balanceLabelRub, amount: homeCopy.balanceAmountRub },
  { id: 'usd', label: homeCopy.balanceLabelUsd, amount: homeCopy.balanceAmountUsd },
] as const;

export const homeServicesPreview = [
  {
    id: 'ubet',
    name: 'Ubet',
    logo: require('../../../assets/legacy/home/services/ubet.png'),
    background: '#000000',
    badge: '+2% Бонус',
  },
  {
    id: 'beeline',
    name: 'Beeline',
    logo: require('../../../assets/legacy/home/services/beeline.png'),
    background: '#F7F7F7',
    badge: null,
  },
  {
    id: 'zaimer',
    name: 'Zaimer',
    logo: require('../../../assets/legacy/home/services/zaimer.png'),
    background: '#FFFFFF',
    badge: null,
  },
] as const;

export const homePromoBanners = [
  {
    id: 'promo-ubet',
    title: 'Выводи средства на кошелек Cashhello',
    logo: require('../../../assets/legacy/home/services/ubet.png'),
    logoBackground: '#000000',
    cardBackground: '#0B1020',
    titleColor: '#FFFFFF',
    accent: 'и участвуй в розыгрыше Iphone',
  },
  {
    id: 'promo-zaimer',
    title: 'Zaimer — лучшие условия для получения микрозайма',
    logo: require('../../../assets/legacy/home/services/zaimer.png'),
    logoBackground: '#FFFFFF',
    cardBackground: '#1226AA',
    titleColor: '#FFFFFF',
    accent: null,
  },
  {
    id: 'promo-beeline',
    title: 'Оплачивай сотовых операторов без комиссии',
    logo: require('../../../assets/legacy/home/services/beeline.png'),
    logoBackground: '#F7F7F7',
    cardBackground: '#1A1A1A',
    titleColor: '#FFFFFF',
    accent: 'Beeline',
  },
] as const;

/** @deprecated Prefer `CANONICAL_RECENT_QUERIES` from legacySearch — kept for Home bridge tests. */
export const searchHistoryQueries = [
  'Пополнить счет',
  'Удалить счет',
  'Открыть карту',
  'Перевод между счетами',
  'Конвертация',
] as const;

export const deferredCopy = {
  /** Historical RECON-002 bridge copy — modules below are implemented; DeferredBridge unused. */
  accountsTitle: 'Все счета',
  accountsModule: 'RECON-003',
  accountsBody: 'All Accounts — IMPLEMENTED (RECON-003).',
  historyTitle: 'История',
  historyModule: 'RECON-007',
  historyBody: 'History reconstructed in RECON-007.',
  withdrawTitle: 'Вывести деньги',
  withdrawModule: 'RECON-006',
  withdrawBody: 'Withdrawal reconstructed as MOCK STATE ONLY. No bank payout, telecom, cash-desk API, or ledger.',
  messagesTitle: 'Сообщения',
  messagesModule: 'RECON-009',
  messagesBody: 'Messages / Уведомления — IMPLEMENTED (RECON-009).',
  profileTitle: 'Профиль',
  profileModule: 'RECON-009',
  profileBody: 'Profile / account — IMPLEMENTED (RECON-009).',
  back: 'Назад',
  deferred: 'DEFERRED MODULE ENTRY',
} as const;
