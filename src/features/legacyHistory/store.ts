import { create } from 'zustand';

import { opDayKey } from '@/features/legacyHistory/dateUtils';
import {
  cloneCanonicalHistory,
  type HistoryListStatus,
  type HistoryOpKind,
  type LegacyHistoryOp,
  statusTone,
} from '@/features/legacyHistory/mockData';

export type FilterPeriod = 'current' | 'previous' | 'custom';
export type FilterOpType = 'all' | 'withdrawal' | 'topup';

type LegacyHistoryStore = {
  operations: LegacyHistoryOp[];
  periodChip: FilterPeriod;
  /** Inclusive range YYYY-MM-DD; null = no calendar filter. */
  dateFrom: string | null;
  dateTo: string | null;
  draftOpType: FilterOpType;
  draftAccountId: string;
  draftPeriod: FilterPeriod;
  appliedOpType: FilterOpType;
  appliedAccountId: string;
  appliedPeriod: FilterPeriod;
  seq: number;
  setPeriodChip: (period: FilterPeriod) => void;
  setDateRange: (from: string | null, to: string | null) => void;
  setListOpType: (t: FilterOpType) => void;
  setDraftOpType: (t: FilterOpType) => void;
  setDraftAccountId: (id: string) => void;
  setDraftPeriod: (period: FilterPeriod) => void;
  applyFilter: () => void;
  resetFilter: () => void;
  appendOperation: ( partial: {
    title: string;
    listStatus: HistoryListStatus;
    amount: number;
    kind: HistoryOpKind;
    direction?: LegacyHistoryOp['direction'];
    accountId?: string;
    accountMask?: string;
    fee?: number;
    destination?: string;
    receiptEligible?: boolean;
    cancellable?: boolean;
  }) => string;
  cancelOperation: (id: string) => void;
  getById: (id: string) => LegacyHistoryOp | undefined;
  filtered: () => LegacyHistoryOp[];
  reset: () => void;
};

const FILTER_INITIAL = {
  periodChip: 'custom' as FilterPeriod,
  dateFrom: null as string | null,
  dateTo: null as string | null,
  draftOpType: 'all' as FilterOpType,
  draftAccountId: 'all',
  draftPeriod: 'custom' as FilterPeriod,
  appliedOpType: 'all' as FilterOpType,
  appliedAccountId: 'all',
  appliedPeriod: 'custom' as FilterPeriod,
};

function matchesKind(op: LegacyHistoryOp, type: FilterOpType): boolean {
  if (type === 'all') return true;
  if (type === 'withdrawal') {
    return op.kind === 'withdrawal' || op.kind === 'phone' || op.kind === 'cash_pickup' || op.kind === 'card';
  }
  return op.kind === 'topup' || op.kind === 'transfer';
}

function matchesPeriod(op: LegacyHistoryOp, period: FilterPeriod): boolean {
  const d = new Date(op.createdAt);
  const month = d.getUTCMonth();
  // Demo: «Текущий месяц» = August seed; «Предыдущий месяц» = July seed.
  if (period === 'current') return month === 7;
  if (period === 'previous') return month === 6;
  return true;
}

function matchesDateRange(op: LegacyHistoryOp, from: string | null, to: string | null): boolean {
  if (!from && !to) return true;
  const day = opDayKey(op.createdAt);
  if (from && day < from) return false;
  if (to && day > to) return false;
  return true;
}

export const useLegacyHistoryStore = create<LegacyHistoryStore>((set, get) => ({
  operations: cloneCanonicalHistory(),
  ...FILTER_INITIAL,
  seq: 0,
  setPeriodChip: (period) =>
    set({
      periodChip: period,
      appliedPeriod: period,
      // Month chips clear explicit calendar range.
      dateFrom: null,
      dateTo: null,
    }),
  setDateRange: (from, to) =>
    set({
      dateFrom: from,
      dateTo: to,
      periodChip: 'custom',
      appliedPeriod: 'custom',
    }),
  setListOpType: (t) =>
    set({
      appliedOpType: t,
      draftOpType: t,
    }),
  setDraftOpType: (t) => set({ draftOpType: t }),
  setDraftAccountId: (id) => set({ draftAccountId: id }),
  setDraftPeriod: (period) => set({ draftPeriod: period }),
  applyFilter: () => {
    const { draftOpType, draftAccountId, draftPeriod } = get();
    set({
      appliedOpType: draftOpType,
      appliedAccountId: draftAccountId,
      appliedPeriod: draftPeriod,
      periodChip: draftPeriod,
      dateFrom: null,
      dateTo: null,
    });
  },
  resetFilter: () =>
    set({
      ...FILTER_INITIAL,
    }),
  appendOperation: (partial) => {
    const seq = get().seq + 1;
    const id = `live_${seq}`;
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const dateLabel = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
    const timeLabel = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const direction = partial.direction ?? (partial.listStatus === 'Готов к выдаче' ? 'in' : 'out');
    const tone = statusTone(partial.listStatus);
    const op: LegacyHistoryOp = {
      id,
      title: partial.title,
      listStatus: partial.listStatus,
      amount: partial.amount,
      currency: '₸',
      direction,
      tone,
      amountEmphasis: partial.listStatus === 'Успешно',
      kind: partial.kind,
      createdAt: now.toISOString(),
      accountId: partial.accountId ?? 'kzt-primary',
      accountMask: partial.accountMask ?? 'KZ31 · 2070',
      fee: partial.fee ?? 30,
      receiptNumber: `SYN-9${String(100000000 + seq).slice(-9)}`,
      payerName: 'Керейдин А.Е.',
      destination: partial.destination,
      dateLabel,
      timeLabel,
      receiptEligible:
        partial.receiptEligible ??
        (partial.listStatus === 'Успешно' || partial.listStatus === 'Готов к выдаче'),
      cancellable: partial.cancellable ?? partial.listStatus === 'В обработке',
      seed: false,
    };
    set({ operations: [op, ...get().operations], seq });
    return id;
  },
  cancelOperation: (id) => {
    set({
      operations: get().operations.map((op) =>
        op.id === id && op.cancellable
          ? {
              ...op,
              listStatus: 'Отклонено' as HistoryListStatus,
              tone: 'red' as const,
              cancellable: false,
              receiptEligible: false,
              amountEmphasis: false,
            }
          : op,
      ),
    });
  },
  getById: (id) => get().operations.find((op) => op.id === id),
  filtered: () => {
    const { operations, appliedOpType, appliedAccountId, periodChip, dateFrom, dateTo } = get();
    return operations.filter((op) => {
      if (!matchesKind(op, appliedOpType)) return false;
      if (appliedAccountId !== 'all' && op.accountId !== appliedAccountId) return false;
      if (dateFrom || dateTo) {
        if (!matchesDateRange(op, dateFrom, dateTo)) return false;
      } else if (!matchesPeriod(op, periodChip)) {
        return false;
      }
      return true;
    });
  },
  reset: () =>
    set({
      operations: cloneCanonicalHistory(),
      ...FILTER_INITIAL,
      seq: 0,
    }),
}));
