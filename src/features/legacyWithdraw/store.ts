import { create } from 'zustand';

import { useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import {
  MOCK_FEE_KZT,
  MOCK_MAX_KZT,
  MOCK_MIN_KZT,
  SYNTHETIC_DEST_CARD,
  type WithdrawMethod,
} from '@/features/legacyWithdraw/mockData';

export type WithdrawResult = 'success' | 'error' | 'processing';

type LegacyWithdrawStore = {
  method: WithdrawMethod | null;
  fromId: string;
  toAccountId: string | null;
  deskId: string | null;
  cardFilled: boolean;
  cardDigits: string;
  scanOpen: boolean;
  phoneDigits: string;
  amountDigits: string;
  confirmOpen: boolean;
  lastResult: WithdrawResult | null;
  lastOperation: {
    method: WithdrawMethod;
    amount: number;
    fee: number;
    status: string;
  } | null;
  otherAcknowledged: boolean;
  setMethod: (m: WithdrawMethod) => void;
  setFromId: (id: string) => void;
  setToAccountId: (id: string | null) => void;
  setDeskId: (id: string | null) => void;
  setCardDigits: (digits: string) => void;
  fillSyntheticCard: () => void;
  setScanOpen: (open: boolean) => void;
  setPhoneDigits: (digits: string) => void;
  fillDemoPhone: () => void;
  setAmountDigits: (digits: string) => void;
  fillAll: () => void;
  setConfirmOpen: (open: boolean) => void;
  acknowledgeOther: () => void;
  confirmAndSettle: (result?: WithdrawResult) => boolean;
  reset: () => void;
};

const INITIAL = {
  method: null as WithdrawMethod | null,
  fromId: 'kzt-primary',
  toAccountId: 'kzt-primary' as string | null,
  deskId: null as string | null,
  cardFilled: false,
  cardDigits: '',
  scanOpen: false,
  phoneDigits: '',
  amountDigits: '',
  confirmOpen: false,
  lastResult: null as WithdrawResult | null,
  lastOperation: null as LegacyWithdrawStore['lastOperation'],
  otherAcknowledged: false,
};

/** Up to 20 digits → `4444 4444 4444 4444 4444`. */
export function formatCardPan(digits: string): string {
  const d = digits.replace(/\D/g, '').slice(0, 20);
  return d.replace(/(\d{4})(?=\d)/g, '$1 ').trimEnd();
}

/** Digits → `1 000` / `100 000` / `1 000 000`. */
export function formatAmountGrouped(digits: string): string {
  const d = digits.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  if (!d) return '';
  return d.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function parseWithdrawAmount(digits: string): number {
  const n = Number.parseInt(digits.replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

export const useLegacyWithdrawStore = create<LegacyWithdrawStore>((set, get) => ({
  ...INITIAL,
  setMethod: (m) => set({ method: m, otherAcknowledged: m === 'other' ? false : get().otherAcknowledged }),
  setFromId: (id) => set({ fromId: id }),
  setToAccountId: (id) => set({ toAccountId: id }),
  setDeskId: (id) => set({ deskId: id }),
  setCardDigits: (digits) => {
    const cardDigits = digits.replace(/\D/g, '').slice(0, 20);
    set({ cardDigits, cardFilled: cardDigits.length >= 16 });
  },
  fillSyntheticCard: () =>
    set({ cardDigits: SYNTHETIC_DEST_CARD.digits, cardFilled: true, scanOpen: false }),
  setScanOpen: (open) => set({ scanOpen: open }),
  setPhoneDigits: (digits) => set({ phoneDigits: digits.replace(/\D/g, '').slice(0, 10) }),
  fillDemoPhone: () => set({ phoneDigits: '7052346887' }),
  setAmountDigits: (digits) => set({ amountDigits: digits.replace(/\D/g, '').slice(0, 9) }),
  fillAll: () => set({ amountDigits: String(MOCK_MAX_KZT) }),
  setConfirmOpen: (open) => set({ confirmOpen: open }),
  acknowledgeOther: () => set({ otherAcknowledged: true }),
  confirmAndSettle: (result = 'success') => {
    const { method, fromId, toAccountId, amountDigits, deskId } = get();
    const amount = parseWithdrawAmount(amountDigits);
    if (!method || method === 'other') return false;
    // Card / phone / Cashhello-user LOCAL_DRAFT: any positive amount. Cash keeps 1000–1970 band.
    if (method === 'card' || method === 'phone' || method === 'cashhelloUser') {
      if (amount <= 0) return false;
    } else if (amount < MOCK_MIN_KZT || amount > MOCK_MAX_KZT) {
      return false;
    }
    if (method === 'cash' && !deskId) return false;

    // Card/phone/user: debit Откуда. Cash UI: desk=Откуда, wallet=Куда — debit wallet (MOCK).
    const debitId = method === 'cash' ? (toAccountId ?? 'kzt-primary') : fromId;

    if (result === 'success') {
      const balances = useLegacyTopupStore.getState().balances;
      const src = balances[debitId] ?? 0;
      const debit = Math.min(src, amount);
      useLegacyTopupStore.setState({
        balances: { ...balances, [debitId]: src - debit },
      });
    }

    const status =
      result === 'success'
        ? method === 'cash'
          ? 'Готов к выдаче'
          : 'Успешно'
        : result === 'error'
          ? 'Отклонено'
          : 'В обработке';

    const title =
      method === 'cash'
        ? 'Наличными'
        : method === 'phone'
          ? 'Баланс телефона'
          : method === 'cashhelloUser'
            ? 'Пользователю Cashhello'
            : 'Карта';
    const kind =
      method === 'cash'
        ? 'cash_pickup'
        : method === 'phone'
          ? 'phone'
          : method === 'cashhelloUser'
            ? 'transfer'
            : 'card';
    useLegacyHistoryStore.getState().appendOperation({
      title,
      listStatus: status as 'В обработке' | 'Отклонено' | 'Готов к выдаче' | 'Успешно',
      amount,
      kind,
      fee: MOCK_FEE_KZT,
      direction: method === 'cash' && result === 'success' ? 'in' : 'out',
      destination:
        method === 'card'
          ? SYNTHETIC_DEST_CARD.panMask
          : method === 'phone' || method === 'cashhelloUser'
            ? get().phoneDigits
            : deskId ?? undefined,
      receiptEligible: result === 'success',
      cancellable: result === 'processing',
    });

    set({
      confirmOpen: false,
      lastResult: result,
      lastOperation: {
        method,
        amount,
        fee: MOCK_FEE_KZT,
        status,
      },
      amountDigits: '',
    });
    return true;
  },
  reset: () => set({ ...INITIAL }),
}));

export function formatPhoneDisplay(digits: string): string {
  const d = digits.replace(/\D/g, '').slice(0, 10);
  if (!d) return '';
  const a = d.slice(0, 3);
  const b = d.slice(3, 6);
  const c = d.slice(6, 8);
  const e = d.slice(8, 10);
  let out = '+7';
  if (a) out += ` (${a}`;
  if (a.length === 3) out += ')';
  if (b) out += ` ${b}`;
  if (c) out += ` ${c}`;
  if (e) out += ` ${e}`;
  return out;
}

export function phoneFilled(digits: string): boolean {
  return digits.replace(/\D/g, '').length >= 10;
}

export { SYNTHETIC_DEST_CARD };
