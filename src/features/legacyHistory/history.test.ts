import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { historyCopy } from '@/features/legacyHistory/copy';
import {
  CANONICAL_HISTORY,
  formatHistoryAmount,
  formatHistoryListAmount,
  HISTORY_BRIDGES,
} from '@/features/legacyHistory/mockData';
import { useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { useLegacyWithdrawStore } from '@/features/legacyWithdraw/store';
import { useMockStore } from '@/state/store';

beforeEach(() => {
  useLegacyHistoryStore.getState().reset();
  useLegacyTopupStore.getState().reset();
  useLegacyWithdrawStore.getState().reset();
});

describe('RECON-007 history', () => {
  it('Home bridges to History', () => {
    expect(HOME_BRIDGES.history).toBe('/legacy/history');
    expect(HISTORY_BRIDGES.filter).toBe('/legacy/history/filter');
    expect(HISTORY_BRIDGES.detail('wd-card')).toBe('/legacy/history/wd-card');
    expect(HISTORY_BRIDGES.detail('wd-phone')).toBe('/legacy/history/wd-phone');
  });

  it('canonical seed has WD outs + incoming topups', () => {
    const ops = useLegacyHistoryStore.getState().operations;
    expect(ops.map((o) => o.id)).toEqual([
      'wd-phone',
      'wd-card',
      'in-yubet',
      'out-ubet',
      'in-cashhello',
    ]);
    expect(ops).toHaveLength(5);
    expect(ops[0]?.detailVariant).toBe('withdraw_receipt');
    expect(ops[1]?.detailVariant).toBe('withdraw_receipt');
    expect(ops[2]?.direction).toBe('in');
    expect(ops[3]?.direction).toBe('out');
    expect(ops[4]?.direction).toBe('in');
    expect(formatHistoryListAmount(ops[1]!)).toBe('−100 ₸');
    expect(formatHistoryAmount(ops[0]!)).toBe('−1 000 Тенге');
  });

  it('filter applies and resets locally', () => {
    const store = useLegacyHistoryStore.getState();
    store.setDraftOpType('topup');
    store.applyFilter();
    const filtered = useLegacyHistoryStore.getState().filtered();
    expect(filtered.every((o) => o.kind === 'topup' || o.kind === 'transfer')).toBe(true);
    expect(filtered.map((o) => o.id)).toEqual(['in-yubet', 'in-cashhello']);
    useLegacyHistoryStore.getState().resetFilter();
    expect(useLegacyHistoryStore.getState().appliedOpType).toBe('all');
    expect(useLegacyHistoryStore.getState().filtered().length).toBe(5);
  });

  it('calendar date range filters WD seed days', () => {
    useLegacyHistoryStore.getState().setDateRange('2026-08-26', '2026-08-26');
    const day = useLegacyHistoryStore.getState().filtered();
    expect(day.map((o) => o.id)).toEqual(['wd-phone', 'wd-card']);
    useLegacyHistoryStore.getState().setDateRange('2026-08-25', '2026-08-25');
    expect(useLegacyHistoryStore.getState().filtered().map((o) => o.id)).toEqual([
      'in-yubet',
      'out-ubet',
      'in-cashhello',
    ]);
    useLegacyHistoryStore.getState().setDateRange('2026-07-01', '2026-07-31');
    expect(useLegacyHistoryStore.getState().filtered()).toHaveLength(0);
    useLegacyHistoryStore.getState().setDateRange(null, null);
    expect(useLegacyHistoryStore.getState().filtered()).toHaveLength(5);
  });

  it('list chips filter Пополнение / Списание', () => {
    useLegacyHistoryStore.getState().setListOpType('withdrawal');
    expect(useLegacyHistoryStore.getState().filtered().map((o) => o.id)).toEqual([
      'wd-phone',
      'wd-card',
      'out-ubet',
    ]);
    useLegacyHistoryStore.getState().setListOpType('topup');
    expect(useLegacyHistoryStore.getState().filtered().map((o) => o.id)).toEqual([
      'in-yubet',
      'in-cashhello',
    ]);
    useLegacyHistoryStore.getState().setListOpType('all');
    expect(useLegacyHistoryStore.getState().filtered()).toHaveLength(5);
  });

  it('cancel processing op is visual-only (Отклонено, no balance restore)', () => {
    const before = useLegacyTopupStore.getState().balances['kzt-primary'];
    useLegacyHistoryStore.getState().appendOperation({
      title: 'Туда',
      listStatus: 'В обработке',
      amount: 500,
      kind: 'phone',
      cancellable: true,
    });
    const id = useLegacyHistoryStore.getState().operations[0]!.id;
    useLegacyHistoryStore.getState().cancelOperation(id);
    const after = useLegacyHistoryStore.getState().getById(id);
    expect(after?.listStatus).toBe('Отклонено');
    expect(after?.cancellable).toBe(false);
    expect(useLegacyTopupStore.getState().balances['kzt-primary']).toBe(before);
  });

  it('receipt eligible ops expose receipt route data', () => {
    const op = useLegacyHistoryStore.getState().getById('wd-card');
    expect(op?.receiptEligible).toBe(true);
    expect(op?.destination).toBe('•••• 1242');
    expect(op?.opType).toBe('Вывод на карту');
  });

  it('mock withdraw appends History row', () => {
    const w = useLegacyWithdrawStore.getState();
    w.setMethod('card');
    w.fillSyntheticCard();
    w.setAmountDigits('1500');
    expect(w.confirmAndSettle('success')).toBe(true);
    const ops = useLegacyHistoryStore.getState().operations;
    expect(ops[0]?.title).toBe('Карта');
    expect(ops[0]?.listStatus).toBe('Успешно');
    expect(ops[0]?.seed).toBe(false);
  });

  it('mock cash withdraw uses Готов к выдаче', () => {
    const w = useLegacyWithdrawStore.getState();
    w.setMethod('cash');
    w.setDeskId('desk-1');
    w.setAmountDigits('1500');
    expect(w.confirmAndSettle('success')).toBe(true);
    expect(useLegacyHistoryStore.getState().operations[0]?.listStatus).toBe('Готов к выдаче');
  });

  it('mock between-accounts appends transfer', () => {
    useLegacyTopupStore.setState({
      balances: { 'kzt-primary': 0, rub: 0, usd: 10, bonus: 500 },
    });
    const t = useLegacyTopupStore.getState();
    t.setFromId('usd');
    t.setToId('kzt-primary');
    t.setAmountDigits('4');
    expect(t.confirmBetween()).toBe(true);
    expect(useLegacyHistoryStore.getState().operations[0]?.kind).toBe('transfer');
  });

  it('prototype reset restores canonical History', () => {
    useLegacyWithdrawStore.getState().setMethod('card');
    useLegacyWithdrawStore.getState().fillSyntheticCard();
    useLegacyWithdrawStore.getState().setAmountDigits('1500');
    useLegacyWithdrawStore.getState().confirmAndSettle('success');
    expect(useLegacyHistoryStore.getState().operations[0]?.seed).toBe(false);
    useMockStore.getState().resetToCanonical();
    expect(useLegacyHistoryStore.getState().operations.map((o) => o.id)).toEqual(
      CANONICAL_HISTORY.map((o) => o.id),
    );
  });

  it('exact filter copy', () => {
    expect(historyCopy.filterTitle).toBe('Настроить фильтр');
    expect(historyCopy.apply).toBe('Применить');
    expect(historyCopy.resetFilter).toBe('Сбросить фильтр');
    expect(historyCopy.cancelTitle).toBe('Отменить операцию?');
    expect(historyCopy.receiptMockNote).toContain('фискальным');
  });
});
