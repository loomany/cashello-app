import { accountsCopy, cardBridgeCopy, topUpBridgeCopy } from '@/features/legacyAccounts/copy';
import { ACCOUNT_BRIDGES } from '@/features/legacyAccounts/mockData';
import { cardCopy } from '@/features/legacyCard/copy';
import {
  CARD_BRIDGES,
  DEMO_CARD,
  LIMIT_PRESETS,
  remainderCopy,
} from '@/features/legacyCard/mockData';
import { useLegacyCardStore } from '@/features/legacyCard/store';

describe('legacy card reconstruction (RECON-004)', () => {
  beforeEach(() => {
    useLegacyCardStore.getState().reset();
  });

  it('keeps Account → Card and defers top-up', () => {
    expect(ACCOUNT_BRIDGES.card).toBe('/legacy/card');
    expect(CARD_BRIDGES.root).toBe('/legacy/card');
    expect(CARD_BRIDGES.limits).toBe('/legacy/card/limits');
    expect(CARD_BRIDGES.pin).toBe('/legacy/card/pin');
    expect(ACCOUNT_BRIDGES.topup).toBe('/legacy/topup');
    expect(CARD_BRIDGES.topup).toBe('/legacy/topup');
    expect(cardBridgeCopy.module).toBe('RECON-004');
    expect(topUpBridgeCopy.module).toBe('RECON-005');
    expect(accountsCopy.cardMore).toBe('Подробнее');
    expect(accountsCopy.openCard).toBe('Открыть карту');
  });

  it('renders primary Card copy and safe synthetic data', () => {
    expect(cardCopy.title).toBe('Карта');
    expect(cardCopy.showCvv).toBe('Показать сvv');
    expect(cardCopy.hideCvv).toBe('Скрыть cvv');
    expect(cardCopy.changeLimit).toBe('Изиенить лимит');
    expect(cardCopy.internetPay).toBe('Оплата в интернете ');
    expect(cardCopy.blockBody).toBe('Пока карта заблокирована, операции по карте будут недоступны ');
    expect(DEMO_CARD.panMask).toBe('**** **** **** 2343');
    expect(DEMO_CARD.panMask.includes('6534')).toBe(false);
    expect(DEMO_CARD.cvvMask).toBe('***');
    expect(DEMO_CARD.cvvMask).not.toBe('456');
  });

  it('toggles CVV face and mock-blocks the card', () => {
    const store = useLegacyCardStore.getState();
    expect(store.face).toBe('pan');
    store.toggleCvv();
    expect(useLegacyCardStore.getState().face).toBe('cvv');
    store.toggleCvv();
    expect(useLegacyCardStore.getState().face).toBe('pan');
    store.openBlockSheet();
    expect(useLegacyCardStore.getState().blockSheetOpen).toBe(true);
    store.confirmBlock();
    expect(useLegacyCardStore.getState().blocked).toBe(true);
    expect(useLegacyCardStore.getState().blockSheetOpen).toBe(false);
  });

  it('reaches limits and updates the mock monthly internet-pay cap', () => {
    expect(remainderCopy(50_000, 50_000)).toBe('Остаток 50 000₸/  50 000₸');
    expect(LIMIT_PRESETS.map((row) => row.label)).toEqual([
      '10 000₸',
      '20 000₸',
      '50 000₸',
      '100 000₸',
      '500 000₸',
      'Без лимита',
    ]);
    const store = useLegacyCardStore.getState();
    store.openLimitSheet();
    store.setLimitDraft(10_000);
    store.applyLimit();
    const next = useLegacyCardStore.getState();
    expect(next.limitCap).toBe(10_000);
    expect(next.limitRemaining).toBe(10_000);
    expect(next.limitSheetOpen).toBe(false);
    store.openLimitSheet();
    store.setLimitDraft(null);
    store.applyLimit();
    expect(useLegacyCardStore.getState().limitCap).toBeNull();
    expect(remainderCopy(0, null)).toBe('Остаток Без лимита');
  });

  it('walks mock card-PIN change without touching auth PIN', () => {
    const store = useLegacyCardStore.getState();
    store.startPin();
    for (const d of '111111') store.pinDigit(d);
    expect(useLegacyCardStore.getState().pinPhase).toBe('create');
    for (const d of '222222') store.pinDigit(d);
    expect(useLegacyCardStore.getState().pinPhase).toBe('repeat');
    for (const d of '000000') store.pinDigit(d);
    expect(useLegacyCardStore.getState().pinError).toBe(true);
    expect(useLegacyCardStore.getState().pinChanged).toBe(false);
    for (const d of '222222') store.pinDigit(d);
    expect(useLegacyCardStore.getState().pinChanged).toBe(true);
    expect(cardCopy.pinOld).toBe('Введите старый PIN-код');
    expect(cardCopy.pinRepeat).toBe('Повторите новый PIN-код');
  });

  it('resets card mock state deterministically', () => {
    const store = useLegacyCardStore.getState();
    store.toggleCvv();
    store.confirmBlock();
    store.setLimitDraft(100_000);
    store.applyLimit();
    store.tapApplePay();
    store.reset();
    const next = useLegacyCardStore.getState();
    expect(next.face).toBe('pan');
    expect(next.blocked).toBe(false);
    expect(next.limitCap).toBe(50_000);
    expect(next.applePayTapped).toBe(false);
    expect(next.pinChanged).toBe(false);
  });
});
