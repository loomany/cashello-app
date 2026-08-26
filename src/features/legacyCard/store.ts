import { create } from 'zustand';

import { DEFAULT_LIMIT_CAP } from '@/features/legacyCard/mockData';

export type CardFace = 'pan' | 'cvv';
export type CardPinPhase = 'old' | 'create' | 'repeat';

type LegacyCardStore = {
  face: CardFace;
  blocked: boolean;
  blockSheetOpen: boolean;
  limitSheetOpen: boolean;
  limitCap: number | null;
  limitRemaining: number;
  limitDraft: number | null;
  pinPhase: CardPinPhase;
  pinEntry: string;
  pinCreated: string;
  pinError: boolean;
  pinChanged: boolean;
  applePayTapped: boolean;
  googlePayTapped: boolean;
  toggleCvv: () => void;
  openBlockSheet: () => void;
  closeBlockSheet: () => void;
  confirmBlock: () => void;
  openLimitSheet: () => void;
  closeLimitSheet: () => void;
  setLimitDraft: (value: number | null) => void;
  applyLimit: () => void;
  startPin: () => void;
  pinDigit: (digit: string) => void;
  pinDelete: () => void;
  pinBack: () => 'stay' | 'leave';
  tapApplePay: () => void;
  tapGooglePay: () => void;
  reset: () => void;
};

const INITIAL = {
  face: 'pan' as CardFace,
  blocked: false,
  blockSheetOpen: false,
  limitSheetOpen: false,
  limitCap: DEFAULT_LIMIT_CAP as number | null,
  limitRemaining: DEFAULT_LIMIT_CAP,
  limitDraft: DEFAULT_LIMIT_CAP as number | null,
  pinPhase: 'old' as CardPinPhase,
  pinEntry: '',
  pinCreated: '',
  pinError: false,
  pinChanged: false,
  applePayTapped: false,
  googlePayTapped: false,
};

const PIN_LENGTH = 6;

export const useLegacyCardStore = create<LegacyCardStore>((set, get) => ({
  ...INITIAL,
  toggleCvv: () => set((s) => ({ face: s.face === 'pan' ? 'cvv' : 'pan' })),
  openBlockSheet: () => set({ blockSheetOpen: true }),
  closeBlockSheet: () => set({ blockSheetOpen: false }),
  confirmBlock: () => set({ blocked: true, blockSheetOpen: false }),
  openLimitSheet: () =>
    set((s) => ({
      limitSheetOpen: true,
      limitDraft: s.limitCap,
    })),
  closeLimitSheet: () => set({ limitSheetOpen: false }),
  setLimitDraft: (value) => set({ limitDraft: value }),
  applyLimit: () =>
    set((s) => ({
      limitCap: s.limitDraft,
      limitRemaining: s.limitDraft ?? 0,
      limitSheetOpen: false,
    })),
  startPin: () =>
    set({
      pinPhase: 'old',
      pinEntry: '',
      pinCreated: '',
      pinError: false,
      pinChanged: false,
    }),
  pinDigit: (digit) => {
    const { pinPhase, pinEntry, pinCreated } = get();
    if (pinEntry.length >= PIN_LENGTH) return;
    const next = pinEntry + digit;
    if (next.length < PIN_LENGTH) {
      set({ pinEntry: next, pinError: false });
      return;
    }
    if (pinPhase === 'old') {
      set({ pinPhase: 'create', pinEntry: '', pinError: false });
      return;
    }
    if (pinPhase === 'create') {
      set({ pinPhase: 'repeat', pinEntry: '', pinCreated: next, pinError: false });
      return;
    }
    if (next === pinCreated) {
      set({
        pinPhase: 'old',
        pinEntry: '',
        pinCreated: '',
        pinError: false,
        pinChanged: true,
      });
      return;
    }
    set({ pinEntry: '', pinError: true });
  },
  pinDelete: () => set((s) => ({ pinEntry: s.pinEntry.slice(0, -1), pinError: false })),
  pinBack: () => {
    const { pinPhase } = get();
    if (pinPhase === 'repeat') {
      set({ pinPhase: 'create', pinEntry: '', pinError: false });
      return 'stay';
    }
    if (pinPhase === 'create') {
      set({ pinPhase: 'old', pinEntry: '', pinCreated: '', pinError: false });
      return 'stay';
    }
    return 'leave';
  },
  tapApplePay: () => set({ applePayTapped: true }),
  tapGooglePay: () => set({ googlePayTapped: true }),
  reset: () => set({ ...INITIAL }),
}));
