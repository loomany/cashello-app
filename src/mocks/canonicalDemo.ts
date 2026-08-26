import { DEMO_CATEGORIES, DEMO_SERVICES } from '@/mocks/demoServices';
import type { MockSnapshot } from '@/types/domain';

/**
 * Reproducible director-demo seed.
 * Synthetic only — no real personal data, no real PAN.
 *
 * Infrastructure simulation amounts are NOT approved fees or cashback rates.
 */
export const FOUNDATION_SIMULATION = {
  kztDebitMinor: 450_000,
  cashbackCreditMinor: 9_000,
  serviceName: 'Beeline',
} as const;

/** Canonical synthetic demo phone shown on Home. Not a real customer number. */
export const DEMO_PHONE = '+7 700 123 45 67';

export const DEFAULT_SELECTED_ACCOUNT_ID = 'acc_kzt';

export const canonicalDemoState: MockSnapshot = {
  user: {
    id: 'usr_demo_001',
    displayName: 'Aida Nurlanova',
    phone: DEMO_PHONE,
    email: 'aida.nurlanova@example.demo',
    city: 'Almaty',
    verificationStatus: 'FULL',
  },
  accounts: [
    { id: 'acc_kzt', currency: 'KZT', availableMinor: 115_000_000 },
    { id: 'acc_rub', currency: 'RUB', availableMinor: 800_000 },
    { id: 'acc_usd', currency: 'USD', availableMinor: 21_000 },
  ],
  bonus: {
    id: 'acc_bonus',
    balanceMinor: 1_245_000,
  },
  headlineKztMinor: 128_450_000,
  paydalaCard: {
    id: 'card_paydala_001',
    last4: '4412',
    expiry: '09/28',
    status: 'active',
    boundAccountId: 'acc_kzt',
  },
  linkedCards: [
    {
      id: 'card_ext_001',
      bankName: 'Halyk Bank',
      last4: '2291',
      expiry: '11/27',
      status: 'active',
    },
    {
      id: 'card_ext_002',
      bankName: 'ForteBank',
      last4: '7740',
      expiry: '04/29',
      status: 'active',
    },
  ],
  categories: DEMO_CATEGORIES,
  services: DEMO_SERVICES,
  transactions: [
    {
      id: 'txn_009',
      type: 'top_up',
      status: 'success',
      amountMinor: 5_000_000,
      currency: 'KZT',
      title: 'Пополнение',
      subtitle: 'Kaspi (демо)',
      createdAt: '2026-08-17T11:24:00.000Z',
      accountId: 'acc_kzt',
    },
    {
      id: 'txn_008',
      type: 'withdrawal',
      status: 'processing',
      amountMinor: -8_000_000,
      currency: 'KZT',
      title: 'Вывод',
      subtitle: 'Карта ···· 2291',
      createdAt: '2026-08-17T09:40:00.000Z',
      accountId: 'acc_kzt',
    },
    {
      id: 'txn_007',
      type: 'service_payment',
      status: 'success',
      amountMinor: -450_000,
      currency: 'KZT',
      title: 'Оплата связи',
      subtitle: 'Beeline',
      createdAt: '2026-08-16T18:40:00.000Z',
      accountId: 'acc_kzt',
    },
    {
      id: 'txn_006',
      type: 'cashback',
      status: 'success',
      amountMinor: 12_000,
      currency: 'BONUS',
      title: 'Кешбэк',
      subtitle: 'Оплата связи',
      createdAt: '2026-08-16T18:40:02.000Z',
      accountId: 'acc_bonus',
    },
    {
      id: 'txn_005',
      type: 'p2p',
      status: 'success',
      amountMinor: -1_200_000,
      currency: 'KZT',
      title: 'Перевод',
      subtitle: 'на +7 707 000 11 22',
      createdAt: '2026-08-16T14:22:00.000Z',
      accountId: 'acc_kzt',
    },
    {
      id: 'txn_004',
      type: 'withdrawal',
      status: 'rejected',
      amountMinor: -3_000_000,
      currency: 'KZT',
      title: 'Вывод',
      subtitle: 'Карта ···· 7740',
      createdAt: '2026-08-16T16:08:00.000Z',
      accountId: 'acc_kzt',
    },
    {
      id: 'txn_003',
      type: 'bookmaker_payout',
      status: 'success',
      amountMinor: 4_500_000,
      currency: 'KZT',
      title: 'Выплата',
      subtitle: 'Ubet',
      createdAt: '2026-08-15T09:12:00.000Z',
      accountId: 'acc_kzt',
    },
  ],
};
