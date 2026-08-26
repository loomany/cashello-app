import type { AccountCurrency, LegacyAccount } from '@/features/legacyAccounts/mockData';
import { LEGACY_ACCOUNTS } from '@/features/legacyAccounts/mockData';

/** Canonical major units. MOCK STATE ONLY / NO LEDGER. */
export const CANONICAL_BALANCES: Record<string, number> = {
  'kzt-primary': 234_888,
  rub: 43_900,
  usd: 123,
  bonus: 500,
};

/**
 * Official (market) NBK rates for 2026-08-26.
 * Source: https://nationalbank.kz/ru/exchangerates/ezhednevnye-oficialnye-rynochnye-kursy-valyut
 * Display / mock conversion only — NOT a live FX feed.
 */
export const NBK_RATE_AS_OF = '2026-08-26';
export const NBK_KZT_PER_USD = 458.48;
export const NBK_KZT_PER_RUB = 5.43;
/** @deprecated Use NBK_KZT_PER_USD */
export const DEMO_KZT_PER_USD = NBK_KZT_PER_USD;

export function currencyUnit(currency: AccountCurrency): string {
  if (currency === 'USD') return '$';
  if (currency === 'RUB') return '₽';
  return '₸';
}

export function toKzt(amount: number, currency: AccountCurrency): number {
  if (currency === 'USD') return amount * NBK_KZT_PER_USD;
  if (currency === 'RUB') return amount * NBK_KZT_PER_RUB;
  return amount;
}

export function fromKzt(amountKzt: number, currency: AccountCurrency): number {
  if (currency === 'USD') return amountKzt / NBK_KZT_PER_USD;
  if (currency === 'RUB') return amountKzt / NBK_KZT_PER_RUB;
  return amountKzt;
}

/** Convert amount from one account currency to another via NBK KZT pivot. */
export function convertAmount(
  amount: number,
  from: AccountCurrency,
  to: AccountCurrency,
): number {
  if (from === to) return amount;
  return fromKzt(toKzt(amount, from), to);
}

function formatFxNumber(value: number, digits = 2): string {
  const fixed = value.toFixed(digits);
  const [whole, frac] = fixed.split('.');
  const grouped = (whole ?? '0').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return frac ? `${grouped},${frac}` : grouped;
}

/**
 * Readable FX line. If 1 source unit is &lt; 1 destination unit, show the inverse
 * so we never print `1 ₸ = 0,00 $` — e.g. `1 $ = 458,48 ₸`.
 */
export function formatFxRateLabel(from: AccountCurrency, to: AccountCurrency): string {
  if (from === to) return '';
  const forward = convertAmount(1, from, to);
  if (forward >= 1) {
    return `1 ${currencyUnit(from)} = ${formatFxNumber(forward)} ${currencyUnit(to)}`;
  }
  const inverse = convertAmount(1, to, from);
  return `1 ${currencyUnit(to)} = ${formatFxNumber(inverse)} ${currencyUnit(from)}`;
}

export const TOPUP_BRIDGES = {
  root: '/legacy/topup',
  between: '/legacy/topup/between',
  card: '/legacy/topup/card',
  cash: '/legacy/topup/cash',
  cashMap: '/legacy/topup/cash-map',
} as const;

export type CashDesk = {
  id: string;
  title: string;
  distance: string;
  address: string;
  hours: string;
  phones?: string[];
};

export const CASH_DESKS: CashDesk[] = [
  {
    id: 'taugul',
    title: 'Микрорайон Таугуль 2',
    distance: '400 м',
    address: 'ул. Пятницкого, 15/16',
    hours: 'Круглосуточно',
  },
  {
    id: 'auezov',
    title: '4-й микрорайон',
    distance: '500 м',
    address: 'Ауэзовский район',
    hours: 'Открыто',
  },
  {
    id: 'moskva',
    title: 'ТРЦ MOSKVA Metropolitan',
    distance: '700 м',
    address: '8-й микрорайон, 37/1цокольный этаж',
    hours: 'Открыто до 21:00',
    phones: ['+7 727 000 00 00'],
  },
  {
    id: 'micro8',
    title: '8-й микрорайон, 8',
    distance: '800 м',
    address: '8-й микрорайон, 8',
    hours: 'Открыто',
  },
  {
    id: 'tigrohoud',
    title: 'ТЦ Тигрохауд',
    distance: '400 м',
    address: 'ТЦ Тигрохауд',
    hours: 'Открыто до 19:00',
  },
];

/** Synthetic display only. DEMO / NOT A REAL PAN. */
export const SYNTHETIC_EXTERNAL_CARD = {
  panMask: '**** **** **** 2343',
  expiry: '03/24',
  cvvMask: '***',
} as const;

export function formatLegacyBalance(amount: number, currency: AccountCurrency): string {
  const grouped = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (currency === 'USD') return `${grouped} $`;
  if (currency === 'RUB') return `${grouped} ₽`;
  return `${grouped} ₸`;
}

export function formatAmountWithUnit(amount: number, currency: AccountCurrency): string {
  const grouped = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (currency === 'USD') return `${grouped} $`;
  if (currency === 'RUB') return `${grouped} ₽`;
  return `${grouped} ₸`;
}

export function accountById(id: string | null): LegacyAccount | undefined {
  if (!id) return undefined;
  return LEGACY_ACCOUNTS.find((row) => row.id === id);
}

/**
 * Amount is always in the source account currency.
 * Cross-currency uses NBK KZT pivot rates (display / mock only).
 */
export function applyMockTransfer(
  balances: Record<string, number>,
  fromId: string,
  toId: string,
  amount: number,
  _displayCurrency?: AccountCurrency,
): Record<string, number> {
  const from = accountById(fromId);
  const to = accountById(toId);
  if (!from || !to || fromId === toId || amount <= 0) return balances;

  const next = { ...balances };
  const destBal = next[toId] ?? 0;
  const srcBal = next[fromId] ?? 0;
  const debit = Math.min(amount, srcBal);
  const credit = convertAmount(debit, from.currency, to.currency);

  next[fromId] = srcBal - debit;
  next[toId] = destBal + credit;
  return next;
}
