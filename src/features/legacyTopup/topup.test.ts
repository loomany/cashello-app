import { accountsCopy, topUpBridgeCopy } from '@/features/legacyAccounts/copy';
import { ACCOUNT_BRIDGES } from '@/features/legacyAccounts/mockData';
import { topupCopy } from '@/features/legacyTopup/copy';
import {
  applyMockTransfer,
  CANONICAL_BALANCES,
  CASH_DESKS,
  convertAmount,
  DEMO_KZT_PER_USD,
  formatFxRateLabel,
  SYNTHETIC_EXTERNAL_CARD,
  TOPUP_BRIDGES,
} from '@/features/legacyTopup/mockData';
import { parseAmountDigits, useLegacyTopupStore } from '@/features/legacyTopup/store';
import { useMockStore } from '@/state/store';

describe('legacy top-up reconstruction (RECON-005)', () => {
  beforeEach(() => {
    useLegacyTopupStore.getState().reset();
  });

  it('routes Account → Top-up methods', () => {
    expect(ACCOUNT_BRIDGES.topup).toBe('/legacy/topup');
    expect(TOPUP_BRIDGES.root).toBe('/legacy/topup');
    expect(TOPUP_BRIDGES.between).toBe('/legacy/topup/between');
    expect(TOPUP_BRIDGES.card).toBe('/legacy/topup/card');
    expect(TOPUP_BRIDGES.cash).toBe('/legacy/topup/cash');
    expect(topUpBridgeCopy.module).toBe('RECON-005');
    expect(accountsCopy.topUp).toBe('Пополнить');
    expect(accountsCopy.topUpTitle).toBe('Способ пополнение');
    expect(topupCopy.methodTitle).toBe('Способ пополнения');
  });

  it('keeps sheet methods without cash desk', () => {
    expect(topupCopy.betweenAccounts).toBe('Между счетами');
    expect(topupCopy.otherBankCard).toBe('Картой другого банка');
  });

  it('enters between-accounts with destination and source picker excluding dest', () => {
    useLegacyTopupStore.getState().setToId('kzt-primary');
    expect(useLegacyTopupStore.getState().toId).toBe('kzt-primary');
    useLegacyTopupStore.getState().setFromId('usd');
    expect(useLegacyTopupStore.getState().fromId).toBe('usd');
    useLegacyTopupStore.getState().setFromId('kzt-primary');
    expect(useLegacyTopupStore.getState().fromId).toBe('kzt-primary');
    expect(useLegacyTopupStore.getState().toId).toBeNull();
  });

  it('accepts amount input and mock confirm updates balances', () => {
    useLegacyTopupStore.setState({
      balances: { 'kzt-primary': 0, rub: 0, usd: 10, bonus: 500 },
    });
    useLegacyTopupStore.getState().setToId('kzt-primary');
    useLegacyTopupStore.getState().setFromId('usd');
    useLegacyTopupStore.getState().setAmountDigits('4');
    expect(parseAmountDigits(useLegacyTopupStore.getState().amountDigits)).toBe(4);
    expect(useLegacyTopupStore.getState().confirmBetween()).toBe(true);
    const next = useLegacyTopupStore.getState();
    expect(next.balances['kzt-primary']).toBeCloseTo(4 * DEMO_KZT_PER_USD, 5);
    expect(next.balances.usd).toBe(6);
    expect(next.lastTransfer?.amount).toBe(4);
  });

  it('uses NBK FX for cross-currency (MOCK / NO LEDGER)', () => {
    const seeded = { 'kzt-primary': 0, rub: 0, usd: 450, bonus: 500 };
    const next = applyMockTransfer(seeded, 'usd', 'kzt-primary', 4);
    expect(DEMO_KZT_PER_USD).toBe(458.48);
    expect(next.usd).toBe(446);
    expect(next['kzt-primary']).toBeCloseTo(4 * 458.48, 5);
  });

  it('formats readable rates for every cross pair (no 0,00)', () => {
    expect(formatFxRateLabel('USD', 'KZT')).toBe('1 $ = 458,48 ₸');
    expect(formatFxRateLabel('KZT', 'USD')).toBe('1 $ = 458,48 ₸');
    expect(formatFxRateLabel('RUB', 'KZT')).toBe('1 ₽ = 5,43 ₸');
    expect(formatFxRateLabel('KZT', 'RUB')).toBe('1 ₽ = 5,43 ₸');
    expect(formatFxRateLabel('USD', 'RUB')).toBe('1 $ = 84,43 ₽');
    expect(formatFxRateLabel('RUB', 'USD')).toBe('1 $ = 84,43 ₽');
    expect(formatFxRateLabel('KZT', 'KZT')).toBe('');
  });

  it('converts all cross pairs via NBK pivot', () => {
    expect(convertAmount(1000, 'KZT', 'USD')).toBeCloseTo(1000 / 458.48, 5);
    expect(convertAmount(10, 'USD', 'KZT')).toBeCloseTo(10 * 458.48, 5);
    expect(convertAmount(1000, 'KZT', 'RUB')).toBeCloseTo(1000 / 5.43, 5);
    expect(convertAmount(100, 'RUB', 'KZT')).toBeCloseTo(100 * 5.43, 5);
    expect(convertAmount(10, 'USD', 'RUB')).toBeCloseTo((10 * 458.48) / 5.43, 5);
    expect(convertAmount(1000, 'RUB', 'USD')).toBeCloseTo((1000 * 5.43) / 458.48, 5);
  });

  it('restores canonical balances on reset and prototype reset', () => {
    const store = useLegacyTopupStore.getState();
    useLegacyTopupStore.setState({
      balances: { 'kzt-primary': 0, rub: 0, usd: 10, bonus: 500 },
    });
    store.setToId('kzt-primary');
    store.setFromId('usd');
    store.setDisplayCurrency('KZT');
    store.setAmountDigits('2000');
    store.confirmBetween();
    store.reset();
    expect(useLegacyTopupStore.getState().balances).toEqual(CANONICAL_BALANCES);
    expect(useLegacyTopupStore.getState().fromId).toBeNull();

    useLegacyTopupStore.getState().setAmountDigits('100');
    useMockStore.getState().resetToCanonical();
    expect(useLegacyTopupStore.getState().balances).toEqual(CANONICAL_BALANCES);
    expect(useLegacyTopupStore.getState().amountDigits).toBe('');
  });

  it('reaches cash flow and external card flow', () => {
    expect(TOPUP_BRIDGES.cash).toBe('/legacy/topup/cash');
    expect(TOPUP_BRIDGES.cashMap).toBe('/legacy/topup/cash-map');
    expect(CASH_DESKS.some((row) => row.id === 'moskva')).toBe(true);
    expect(topupCopy.searchAddress).toBe('Пойск адреса');
    expect(topupCopy.savedAddresses).toContain('сохнаренных');
    expect(SYNTHETIC_EXTERNAL_CARD.panMask).toBe('**** **** **** 2343');
    expect(SYNTHETIC_EXTERNAL_CARD.cvvMask).toBe('***');
    useLegacyTopupStore.getState().fillSyntheticCard();
    useLegacyTopupStore.getState().confirmCardTopUp();
    expect(useLegacyTopupStore.getState().lastCardTopUp).toBe(true);
    useLegacyTopupStore.getState().selectDesk('moskva');
    useLegacyTopupStore.getState().confirmCashDesk();
    expect(useLegacyTopupStore.getState().lastCashDeskId).toBe('moskva');
  });

  it('keeps back navigation routes under /legacy/topup', () => {
    expect(TOPUP_BRIDGES.between.startsWith('/legacy/topup')).toBe(true);
    expect(TOPUP_BRIDGES.card.startsWith('/legacy/topup')).toBe(true);
    expect(TOPUP_BRIDGES.cash.startsWith('/legacy/topup')).toBe(true);
  });
});
