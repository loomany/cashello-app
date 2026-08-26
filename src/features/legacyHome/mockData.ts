export type HomeHistoryDirection = 'in' | 'out';

export type HomeHistoryTone = 'yellow' | 'blue' | 'green' | 'red';

export type HomeHistoryRow = {
  id: string;
  title: string;
  status: string;
  amount: string;
  direction: HomeHistoryDirection;
  tone: HomeHistoryTone;
  amountEmphasis: boolean;
  icon?: 'arrow' | 'gift' | 'ubet' | 'phone' | 'card';
};

/** Deterministic synthetic preview matching 765:22510. Not real operations. */
export const HOME_HISTORY: HomeHistoryRow[] = [
  {
    id: 'h1',
    title: 'Баланс телефона',
    status: 'В обработке',
    amount: '1500 ₸',
    direction: 'out',
    tone: 'yellow',
    amountEmphasis: false,
  },
  {
    id: 'h2',
    title: 'Наличными',
    status: 'Готов к выдаче',
    amount: '8000 ₸',
    direction: 'in',
    tone: 'blue',
    amountEmphasis: false,
  },
  {
    id: 'h3',
    title: 'Карта',
    status: 'Успешно',
    amount: '1500 ₸',
    direction: 'in',
    tone: 'green',
    amountEmphasis: true,
  },
  {
    id: 'h4',
    title: 'Наличными',
    status: 'Отклонено',
    amount: '100 000 ₸',
    direction: 'out',
    tone: 'red',
    amountEmphasis: false,
  },
  {
    id: 'h5',
    title: 'Баланс телефона',
    status: 'В обработке',
    amount: '2500 ₸',
    direction: 'in',
    tone: 'yellow',
    amountEmphasis: false,
  },
  {
    id: 'h6',
    title: 'Наличными',
    status: 'Отклонено',
    amount: '-100 000 ₸',
    direction: 'out',
    tone: 'red',
    amountEmphasis: true,
  },
];

export const HOME_BRIDGES = {
  home: '/legacy/home',
  /** Guest Home (HOME-001) — local draft mirror of authorized home + login CTA. */
  guestHome: '/legacy/home?guest=1',
  search: '/legacy/search',
  accounts: '/legacy/accounts',
  history: '/legacy/history',
  payment: '/legacy/payment',
  qr: '/legacy/qr',
  withdraw: '/legacy/withdraw',
  messages: '/legacy/messages',
  profile: '/legacy/profile',
  auth: '/legacy/auth',
  /** Guest entry «Войти» → authorization (skip splash + onboarding). */
  login: '/legacy/auth?qaStep=iin',
  /** Screen 3 — registration promo row stub. */
  registrationStub: '/legacy/stub/registration',
  /** Screen 4 — bonus balance chip stub. */
  bonusStub: '/legacy/stub/bonus',
  /** Withdraw → Пользователю Cashhello (local draft stub). */
  cashhelloUserStub: '/legacy/stub/cashhello-user',
} as const;
