import { PAYMENT_BRIDGES, PAYMENT_CATEGORIES, PAYMENT_SECTIONS, getPaymentService } from '@/features/legacyPayment/mockData';
import { paymentCopy } from '@/features/legacyPayment/copy';

describe('LOCAL_DRAFT payment catalog', () => {
  it('wires payment bridge and core copy', () => {
    expect(PAYMENT_BRIDGES.root).toBe('/legacy/payment');
    expect(paymentCopy.title).toBe('Оплата');
    expect(paymentCopy.searchPlaceholder).toBe('Что хотите пополнить?');
  });

  it('has bookmakers, digital and MFO sections with logos', () => {
    expect(PAYMENT_SECTIONS.map((s) => s.id)).toEqual(['bookmakers', 'digital', 'mfo']);
    expect(PAYMENT_SECTIONS[0]?.items.some((i) => i.id === 'ubet' && i.available && i.logo)).toBe(true);
    expect(PAYMENT_SECTIONS[0]?.items.some((i) => i.id === 'fonbet' && !i.available)).toBe(true);
    expect(PAYMENT_SECTIONS[2]?.items.some((i) => i.id === 'zaimer' && i.logo)).toBe(true);
  });

  it('exposes category options for sheet filter', () => {
    expect(PAYMENT_CATEGORIES.map((c) => c.id)).toEqual(['all', 'bookmakers', 'digital', 'mfo']);
  });

  it('resolves service detail bridge', () => {
    expect(PAYMENT_BRIDGES.service('ubet')).toBe('/legacy/payment/ubet');
    expect(getPaymentService('ubet')?.name).toBe('Ubet');
    expect(getPaymentService('missing')).toBeUndefined();
  });
});
