import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import type { RecentOperationPreview } from '@/features/legacyHome/recentOperationsPreview';
import { HISTORY_BRIDGES } from '@/features/legacyHistory/mockData';
import { PAYMENT_BRIDGES } from '@/features/legacyPayment/mockData';

/** Authorized Home «Последние» preview row count (VIS2-003). */
export const HOME_RECENT_OPERATIONS_LIMIT = 4;

export type PaymentsTab = 'recent' | 'all' | 'history';

export const PAYMENTS_TABS: {
  id: PaymentsTab;
  labelKey: 'paymentsRecent' | 'paymentsAll' | 'paymentsHistory';
}[] = [
  { id: 'recent', labelKey: 'paymentsRecent' },
  { id: 'all', labelKey: 'paymentsAll' },
  { id: 'history', labelKey: 'paymentsHistory' },
];

/** `null` = stay on Home (Последние). Otherwise push target href. */
export function resolvePaymentsSegmentHref(tab: PaymentsTab, isGuest: boolean): string | null {
  if (tab === 'recent') return null;
  if (isGuest) return HOME_BRIDGES.login;
  if (tab === 'all') return PAYMENT_BRIDGES.root;
  return HISTORY_BRIDGES.root;
}

export function recentOperationPaymentHref(row: RecentOperationPreview): string {
  return PAYMENT_BRIDGES.service(row.serviceId, {
    phoneDigits: row.phoneDigits,
    amountKzt: row.amountKzt,
  });
}
