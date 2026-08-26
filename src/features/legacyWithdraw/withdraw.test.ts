import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { homeCopy } from '@/features/legacyHome/copy';
import { CANONICAL_BALANCES } from '@/features/legacyTopup/mockData';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { withdrawCopy, deferredWithdrawCopy } from '@/features/legacyWithdraw/copy';
import {
  MOCK_FEE_KZT,
  MOCK_MAX_KZT,
  MOCK_MIN_KZT,
  SYNTHETIC_DEST_CARD,
  WITHDRAW_BRIDGES,
} from '@/features/legacyWithdraw/mockData';
import { parseWithdrawAmount, useLegacyWithdrawStore } from '@/features/legacyWithdraw/store';
import { useMockStore } from '@/state/store';

describe('legacy withdrawal reconstruction (RECON-006)', () => {
  beforeEach(() => {
    useLegacyWithdrawStore.getState().reset();
    useLegacyTopupStore.getState().reset();
  });

  it('routes Home → withdrawal', () => {
    expect(HOME_BRIDGES.withdraw).toBe('/legacy/withdraw');
    expect(WITHDRAW_BRIDGES.root).toBe('/legacy/withdraw');
    expect(homeCopy.withdraw).toBe('Вывести деньги');
    expect(deferredWithdrawCopy.module).toBe('RECON-006');
  });

  it('shows method selection labels in source order', () => {
    expect(withdrawCopy.methodTitle).toBe('Способ вывода');
    expect(withdrawCopy.card).toBe('Карта');
    expect(withdrawCopy.phone).toBe('Баланс телефона');
    expect(withdrawCopy.cash).toBe('Снять в кассе наличными');
    expect(withdrawCopy.other).toBe('Другое');
  });

  it('reaches card branch', () => {
    expect(WITHDRAW_BRIDGES.card).toBe('/legacy/withdraw/card');
    useLegacyWithdrawStore.getState().setMethod('card');
    useLegacyWithdrawStore.getState().fillSyntheticCard();
    expect(useLegacyWithdrawStore.getState().cardFilled).toBe(true);
    expect(SYNTHETIC_DEST_CARD.last4).toBe('2343');
  });

  it('reaches phone branch', () => {
    expect(WITHDRAW_BRIDGES.phone).toBe('/legacy/withdraw/phone');
    useLegacyWithdrawStore.getState().setMethod('phone');
    useLegacyWithdrawStore.getState().fillDemoPhone();
    expect(useLegacyWithdrawStore.getState().phoneDigits).toBe('7052346887');
  });

  it('reaches cash branch', () => {
    expect(WITHDRAW_BRIDGES.cash).toBe('/legacy/withdraw/cash');
    expect(WITHDRAW_BRIDGES.cashMap).toBe('/legacy/withdraw/cash-map');
    useLegacyWithdrawStore.getState().setMethod('cash');
    useLegacyWithdrawStore.getState().setDeskId('moskva');
    expect(useLegacyWithdrawStore.getState().deskId).toBe('moskva');
  });

  it('handles other branch without inventing a rail', () => {
    useLegacyWithdrawStore.getState().setMethod('other');
    useLegacyWithdrawStore.getState().acknowledgeOther();
    expect(useLegacyWithdrawStore.getState().otherAcknowledged).toBe(true);
    expect(useLegacyWithdrawStore.getState().confirmAndSettle()).toBe(false);
  });

  it('supports source account selection and amount input', () => {
    const store = useLegacyWithdrawStore.getState();
    store.setMethod('card');
    store.setFromId('rub');
    store.fillSyntheticCard();
    store.setAmountDigits('1500');
    expect(parseWithdrawAmount(useLegacyWithdrawStore.getState().amountDigits)).toBe(1500);
    expect(MOCK_MIN_KZT).toBe(1000);
    expect(MOCK_MAX_KZT).toBe(1970);
    expect(MOCK_FEE_KZT).toBe(30);
    store.fillAll();
    expect(parseWithdrawAmount(useLegacyWithdrawStore.getState().amountDigits)).toBe(1970);
  });

  it('completes main mock success and debits balance', () => {
    useLegacyTopupStore.setState({
      balances: { 'kzt-primary': 5000, rub: 0, usd: 0, bonus: 500 },
    });
    const before = useLegacyTopupStore.getState().balances['kzt-primary'];
    const store = useLegacyWithdrawStore.getState();
    store.setMethod('card');
    store.setFromId('kzt-primary');
    store.fillSyntheticCard();
    store.setAmountDigits('1500');
    expect(store.confirmAndSettle('success')).toBe(true);
    expect(useLegacyTopupStore.getState().balances['kzt-primary']).toBe(before - 1500);
    expect(useLegacyWithdrawStore.getState().lastResult).toBe('success');
    expect(useLegacyWithdrawStore.getState().lastOperation?.status).toBe('Успешно');
  });

  it('supports rejected and processing scenarios', () => {
    const store = useLegacyWithdrawStore.getState();
    store.setMethod('card');
    store.setAmountDigits('1500');
    store.confirmAndSettle('error');
    expect(useLegacyWithdrawStore.getState().lastOperation?.status).toBe('Отклонено');
    store.setAmountDigits('1500');
    store.confirmAndSettle('processing');
    expect(useLegacyWithdrawStore.getState().lastOperation?.status).toBe('В обработке');
  });

  it('supports ready-for-pickup on cash success', () => {
    const store = useLegacyWithdrawStore.getState();
    store.setMethod('cash');
    store.setDeskId('moskva');
    store.setToAccountId('kzt-primary');
    store.setAmountDigits('1500');
    expect(store.confirmAndSettle('success')).toBe(true);
    expect(useLegacyWithdrawStore.getState().lastOperation?.status).toBe('Готов к выдаче');
  });

  it('reset and prototype reset restore state', () => {
    const store = useLegacyWithdrawStore.getState();
    store.setMethod('card');
    store.setAmountDigits('1500');
    store.confirmAndSettle('success');
    store.reset();
    expect(useLegacyWithdrawStore.getState().method).toBeNull();
    expect(useLegacyWithdrawStore.getState().amountDigits).toBe('');
    useLegacyTopupStore.getState().reset();
    expect(useLegacyTopupStore.getState().balances).toEqual(CANONICAL_BALANCES);

    useLegacyWithdrawStore.getState().setMethod('phone');
    useMockStore.getState().resetToCanonical();
    expect(useLegacyWithdrawStore.getState().method).toBeNull();
    expect(useLegacyTopupStore.getState().balances).toEqual(CANONICAL_BALANCES);
  });

  it('keeps back navigation under /legacy/withdraw', () => {
    expect(WITHDRAW_BRIDGES.card.startsWith('/legacy/withdraw')).toBe(true);
    expect(WITHDRAW_BRIDGES.phone.startsWith('/legacy/withdraw')).toBe(true);
    expect(WITHDRAW_BRIDGES.cash.startsWith('/legacy/withdraw')).toBe(true);
    expect(WITHDRAW_BRIDGES.amount.startsWith('/legacy/withdraw')).toBe(true);
    expect(WITHDRAW_BRIDGES.loading.startsWith('/legacy/withdraw')).toBe(true);
  });
});
