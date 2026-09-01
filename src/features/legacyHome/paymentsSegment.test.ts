import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import {
  HOME_RECENT_OPERATIONS_LIMIT,
  recentOperationPaymentHref,
  resolvePaymentsSegmentHref,
} from '@/features/legacyHome/paymentsSegment';
import {
  GUEST_RECENT_OPERATION,
  homeRecentOperationsPreview,
} from '@/features/legacyHome/recentOperationsPreview';
import { HISTORY_BRIDGES } from '@/features/legacyHistory/mockData';
import { PAYMENT_BRIDGES } from '@/features/legacyPayment/mockData';

describe('Home payments segment (VIS2)', () => {
  it('authorized Все → /legacy/payment', () => {
    expect(resolvePaymentsSegmentHref('all', false)).toBe(PAYMENT_BRIDGES.root);
    expect(resolvePaymentsSegmentHref('all', false)).toBe('/legacy/payment');
  });

  it('authorized История → /legacy/history', () => {
    expect(resolvePaymentsSegmentHref('history', false)).toBe(HISTORY_BRIDGES.root);
    expect(resolvePaymentsSegmentHref('history', false)).toBe('/legacy/history');
  });

  it('guest Все → auth login', () => {
    expect(resolvePaymentsSegmentHref('all', true)).toBe(HOME_BRIDGES.login);
    expect(resolvePaymentsSegmentHref('all', true)).toBe('/legacy/auth?qaStep=iin');
  });

  it('guest История → auth login', () => {
    expect(resolvePaymentsSegmentHref('history', true)).toBe(HOME_BRIDGES.login);
    expect(resolvePaymentsSegmentHref('history', true)).toBe('/legacy/auth?qaStep=iin');
  });

  it('Последние stays on Home (no navigation href)', () => {
    expect(resolvePaymentsSegmentHref('recent', false)).toBeNull();
    expect(resolvePaymentsSegmentHref('recent', true)).toBeNull();
  });

  it('authorized Home shows exactly 4 recent rows', () => {
    expect(HOME_RECENT_OPERATIONS_LIMIT).toBe(4);
    expect(homeRecentOperationsPreview(HOME_RECENT_OPERATIONS_LIMIT)).toHaveLength(4);
  });

  it('guest registration bonus row unchanged', () => {
    expect(GUEST_RECENT_OPERATION.title).toBe('Бонус за регистрацию');
    expect(GUEST_RECENT_OPERATION.amount).toBe('+500 Б');
    expect(GUEST_RECENT_OPERATION.subtitle).toBe('За регистрацию вам будет начислено 500 бонусов');
  });

  it('recent operation row → PAY-002 with phone + amount prefill', () => {
    const row = homeRecentOperationsPreview(1)[0]!;
    expect(row.amount).toBe('−5 000 ₸');
    expect(row.bonus).toBe('+100 Б');
    expect(recentOperationPaymentHref(row)).toBe(
      '/legacy/payment/ubet?phone=7078789911&amount=5000',
    );
  });
});
