/**
 * Deterministic demo accounts matching late UI 648:19007.
 * Figma sample identifiers are DEMO / NOT REAL ACCOUNT (visual length only).
 */

export type AccountCurrency = 'KZT' | 'USD' | 'RUB';

export type LegacyAccount = {
  id: string;
  balance: string;
  maskPrefix: string;
  maskSuffix: string;
  iban: string;
  currency: AccountCurrency;
  hasCard: boolean;
};

export const DEMO_REQUISITES = {
  name: 'Танирберген И.А.',
  knp: '711',
  bik: 'HUP452',
  kbe: '12',
  bin: '95043432454',
} as const;

/** Masked card face from 821:29038. DEMO / NOT A REAL PAN. */
export const DEMO_CARD_FACE = {
  panMask: '**** **** **** 2343',
  holder: 'Танирберген И.А.',
  validThru: '03/24',
} as const;

export const LEGACY_ACCOUNTS: LegacyAccount[] = [
  {
    id: 'kzt-primary',
    balance: '2 000 ₸',
    maskPrefix: 'KZ31',
    maskSuffix: '2070',
    iban: 'KZ31 5634 9870 2070',
    currency: 'KZT',
    hasCard: false,
  },
  {
    id: 'kzt-secondary',
    balance: '43 000 ₸',
    maskPrefix: 'KZ12',
    maskSuffix: '6597',
    iban: 'KZ12 0000 0000 6597',
    currency: 'KZT',
    hasCard: false,
  },
  {
    id: 'usd',
    balance: '450 $',
    maskPrefix: 'KZ66',
    maskSuffix: '6056',
    iban: 'KZ66 0000 0000 6056',
    currency: 'USD',
    hasCard: true,
  },
];

export const DEFAULT_PRIMARY_ACCOUNT_ID = 'kzt-primary';

export const OPEN_ACCOUNT_OPTIONS: { id: AccountCurrency; label: 'tenge' | 'dollar' | 'ruble' }[] = [
  { id: 'KZT', label: 'tenge' },
  { id: 'USD', label: 'dollar' },
  { id: 'RUB', label: 'ruble' },
];

export const ACCOUNT_BRIDGES = {
  list: '/legacy/accounts',
  detail: (id: string) => `/legacy/accounts/${id}`,
  card: '/legacy/card',
  topup: '/legacy/topup',
  history: '/legacy/history',
} as const;
