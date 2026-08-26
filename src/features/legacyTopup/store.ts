import { create } from 'zustand';

import type { AccountCurrency } from '@/features/legacyAccounts/mockData';
import { accountById } from '@/features/legacyTopup/mockData';
import { useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { applyMockTransfer, CANONICAL_BALANCES } from '@/features/legacyTopup/mockData';

type Picker = 'none' | 'from' | 'to';

type LegacyTopupStore = {
  balances: Record<string, number>;
  fromId: string | null;
  toId: string | null;
  amountDigits: string;
  displayCurrency: AccountCurrency;
  picker: Picker;
  lastTransfer: { fromId: string; toId: string; amount: number } | null;
  cardFilled: boolean;
  scanOpen: boolean;
  lastCardTopUp: boolean;
  selectedDeskId: string | null;
  lastCashDeskId: string | null;
  setToId: (id: string) => void;
  setFromId: (id: string) => void;
  setAmountDigits: (digits: string) => void;
  setDisplayCurrency: (unit: AccountCurrency) => void;
  setPicker: (picker: Picker) => void;
  fillAll: () => void;
  confirmBetween: () => boolean;
  fillSyntheticCard: () => void;
  setScanOpen: (open: boolean) => void;
  confirmCardTopUp: () => void;
  selectDesk: (id: string) => void;
  confirmCashDesk: () => void;
  reset: () => void;
};

const INITIAL = {
  balances: { ...CANONICAL_BALANCES },
  fromId: null as string | null,
  toId: null as string | null,
  amountDigits: '',
  displayCurrency: 'KZT' as AccountCurrency,
  picker: 'none' as Picker,
  lastTransfer: null as LegacyTopupStore['lastTransfer'],
  cardFilled: false,
  scanOpen: false,
  lastCardTopUp: false,
  selectedDeskId: null as string | null,
  lastCashDeskId: null as string | null,
};

export function parseAmountDigits(digits: string): number {
  const n = Number.parseInt(digits.replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

export const useLegacyTopupStore = create<LegacyTopupStore>((set, get) => ({
  ...INITIAL,
  setToId: (id) =>
    set((state) => ({
      toId: id,
      fromId: state.fromId === id ? null : state.fromId,
    })),
  setFromId: (id) =>
    set((state) => ({
      fromId: id,
      toId: state.toId === id ? null : state.toId,
      displayCurrency: accountById(id)?.currency ?? state.displayCurrency,
      picker: 'none',
    })),
  setAmountDigits: (digits) => set({ amountDigits: digits.replace(/\D/g, '').slice(0, 9) }),
  setDisplayCurrency: (unit) => set({ displayCurrency: unit }),
  setPicker: (picker) => set({ picker }),
  fillAll: () => {
    const { fromId, balances } = get();
    const bal = fromId ? Math.floor(balances[fromId] ?? 0) : 0;
    set({ amountDigits: bal > 0 ? String(bal) : '' });
  },
  confirmBetween: () => {
    const { fromId, toId, amountDigits, balances } = get();
    const amount = parseAmountDigits(amountDigits);
    if (!fromId || !toId || amount <= 0) return false;
    const next = applyMockTransfer(balances, fromId, toId, amount);
    useLegacyHistoryStore.getState().appendOperation({
      title: 'Между своими',
      listStatus: 'Успешно',
      amount,
      kind: 'transfer',
      direction: 'out',
      accountId: fromId,
      fee: 0,
      destination: toId,
      receiptEligible: true,
      cancellable: false,
    });
    set({
      balances: next,
      lastTransfer: { fromId, toId, amount },
      amountDigits: '',
    });
    return true;
  },
  fillSyntheticCard: () => set({ cardFilled: true, scanOpen: false }),
  setScanOpen: (open) => set({ scanOpen: open }),
  confirmCardTopUp: () => {
    useLegacyHistoryStore.getState().appendOperation({
      title: 'Пополнение',
      listStatus: 'Успешно',
      amount: 1500,
      kind: 'topup',
      direction: 'in',
      fee: 0,
      receiptEligible: true,
      cancellable: false,
    });
    set({ lastCardTopUp: true, cardFilled: true });
  },
  selectDesk: (id) => set({ selectedDeskId: id }),
  confirmCashDesk: () => {
    const { selectedDeskId } = get();
    if (!selectedDeskId) return;
    useLegacyHistoryStore.getState().appendOperation({
      title: 'Пополнение',
      listStatus: 'В обработке',
      amount: 8000,
      kind: 'topup',
      direction: 'in',
      fee: 0,
      destination: selectedDeskId,
      receiptEligible: false,
      cancellable: true,
    });
    set({ lastCashDeskId: selectedDeskId });
  },
  reset: () => set({ ...INITIAL, balances: { ...CANONICAL_BALANCES } }),
}));
