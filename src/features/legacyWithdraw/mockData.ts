import type { AccountCurrency } from '@/features/legacyAccounts/mockData';
import { CASH_DESKS, formatLegacyBalance } from '@/features/legacyTopup/mockData';

export { CASH_DESKS, formatLegacyBalance };

export const WITHDRAW_BRIDGES = {
  root: '/legacy/withdraw',
  card: '/legacy/withdraw/card',
  phone: '/legacy/withdraw/phone',
  cashhelloUser: '/legacy/withdraw/cashhello-user',
  cash: '/legacy/withdraw/cash',
  cashMap: '/legacy/withdraw/cash-map',
  amount: '/legacy/withdraw/amount',
  loading: '/legacy/withdraw/loading',
} as const;

export type WithdrawMethod = 'card' | 'phone' | 'cashhelloUser' | 'cash' | 'other';

/** Synthetic destination. DEMO / NOT A REAL CARD. No Kaspi product branding. */
export const SYNTHETIC_DEST_CARD = {
  holder: 'Танирберген И.А.',
  last4: '2343',
  panMask: '**** **** **** 2343',
  digits: '4444444444442343',
} as const;

/** Demo saved cards for LOCAL_DRAFT withdraw card picker. DEMO / NOT REAL. */
export const DEMO_SAVED_CARDS = [
  { id: 'card-1', holder: 'Танирберген И.А.', last4: '2343', digits: '4444444444442343' },
  { id: 'card-2', holder: 'Алиева М.К.', last4: '8812', digits: '5555555555558812' },
  { id: 'card-3', holder: 'Нурланов С.Б.', last4: '0091', digits: '4111111111110091' },
  { id: 'card-4', holder: 'Касымова А.Т.', last4: '6720', digits: '4000000000006720' },
  { id: 'card-5', holder: 'Жумабаев Е.Р.', last4: '4455', digits: '5200828282824455' },
] as const;

export const DEMO_PHONE = '+7 (705) 234 68 87';

/** Demo saved phones for LOCAL_DRAFT phone / Cashhello-user withdraw. DEMO / NOT REAL. */
export const DEMO_SAVED_PHONES = [
  { id: 'phone-1', digits: '7052346887', label: '+7 (705) 234 68 87' },
  { id: 'phone-2', digits: '7771234567', label: '+7 (777) 123 45 67' },
  { id: 'phone-3', digits: '7019988776', label: '+7 (701) 998 87 76' },
  { id: 'phone-4', digits: '7475551212', label: '+7 (747) 555 12 12' },
  { id: 'phone-5', digits: '7001112233', label: '+7 (700) 111 22 33' },
] as const;

/** LEGACY DESIGN DISPLAY / MOCK — not production economics. */
export const MOCK_FEE_KZT = 30;
export const MOCK_MIN_KZT = 1000;
export const MOCK_MAX_KZT = 1970;

export function formatWithdrawAmount(amount: number, currency: AccountCurrency = 'KZT'): string {
  const grouped = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return currency === 'USD' ? `${grouped} $` : `${grouped} ₸`;
}
