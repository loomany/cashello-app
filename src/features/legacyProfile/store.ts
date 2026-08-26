import { create } from 'zustand';

import { useLegacyAuthStore } from '@/features/legacyAuth/store';
import {
  CANONICAL_IDENTITY,
  CANONICAL_MESSAGES,
  CANONICAL_PHONE_DIGITS,
  DEMO_CHANGE_PHONE_SMS,
  type CanonicalIdentity,
  type LegacyMessage,
} from '@/features/legacyProfile/mockData';

export type PinChangePhase = 'create' | 'repeat' | 'error';

type LegacyProfileState = {
  identity: CanonicalIdentity;
  phoneDigits: string;
  pendingPhoneDigits: string;
  phoneSms: string;
  pushEnabled: boolean;
  fingerprintEnabled: boolean;
  messages: LegacyMessage[];
  helpText: string;
  pinDraft: string;
  pinRepeat: string;
  pinPhase: PinChangePhase;
  sessionPin: string | null;
  setPendingPhoneDigits: (digits: string) => void;
  setPhoneSms: (sms: string) => void;
  commitPendingPhone: () => boolean;
  togglePush: () => void;
  toggleFingerprint: () => void;
  setHelpText: (text: string) => void;
  appendPinDigit: (digit: string) => boolean;
  deletePinDigit: () => void;
  resetPinChange: () => void;
  reset: () => void;
};

const INITIAL = {
  identity: { ...CANONICAL_IDENTITY },
  phoneDigits: CANONICAL_PHONE_DIGITS,
  pendingPhoneDigits: '',
  phoneSms: '',
  pushEnabled: true,
  fingerprintEnabled: true,
  messages: CANONICAL_MESSAGES.map((m) => ({ ...m })),
  helpText: '',
  pinDraft: '',
  pinRepeat: '',
  pinPhase: 'create' as PinChangePhase,
  sessionPin: null as string | null,
};

export const useLegacyProfileStore = create<LegacyProfileState>((set, get) => ({
  ...INITIAL,
  setPendingPhoneDigits: (digits) =>
    set({ pendingPhoneDigits: digits.replace(/\D/g, '').slice(0, 10) }),
  setPhoneSms: (sms) => set({ phoneSms: sms.replace(/\D/g, '').slice(0, 4) }),
  commitPendingPhone: () => {
    const { pendingPhoneDigits, phoneSms } = get();
    if (pendingPhoneDigits.length !== 10) return false;
    if (phoneSms !== DEMO_CHANGE_PHONE_SMS) {
      set({ phoneSms: '' });
      return false;
    }
    set({
      phoneDigits: pendingPhoneDigits,
      pendingPhoneDigits: '',
      phoneSms: '',
    });
    // Keep auth registration phone in sync for one canonical reconstruction identity.
    useLegacyAuthStore.setState({ phoneDigits: pendingPhoneDigits });
    return true;
  },
  togglePush: () => set((s) => ({ pushEnabled: !s.pushEnabled })),
  toggleFingerprint: () => set((s) => ({ fingerprintEnabled: !s.fingerprintEnabled })),
  setHelpText: (text) => set({ helpText: text }),
  appendPinDigit: (digit) => {
    const { pinPhase, pinDraft, pinRepeat, sessionPin } = get();
    if (pinPhase === 'create') {
      const next = `${pinDraft}${digit}`.slice(0, 6);
      if (next.length === 6) {
        set({ pinDraft: next, pinPhase: 'repeat', pinRepeat: '' });
      } else {
        set({ pinDraft: next });
      }
      return false;
    }
    if (pinPhase === 'error') {
      set({ pinPhase: 'repeat', pinRepeat: digit, pinDraft: sessionPin ?? pinDraft });
      return false;
    }
    const next = `${pinRepeat}${digit}`.slice(0, 6);
    if (next.length < 6) {
      set({ pinRepeat: next });
      return false;
    }
    const expected = sessionPin ?? pinDraft;
    if (next === expected) {
      set({
        sessionPin: next,
        pinDraft: '',
        pinRepeat: '',
        pinPhase: 'create',
      });
      return true;
    }
    set({ pinPhase: 'error', pinRepeat: '', pinDraft: expected });
    return false;
  },
  deletePinDigit: () => {
    const { pinPhase, pinDraft, pinRepeat } = get();
    if (pinPhase === 'create') {
      set({ pinDraft: pinDraft.slice(0, -1) });
      return;
    }
    if (pinPhase === 'error') {
      set({ pinPhase: 'repeat', pinRepeat: '' });
      return;
    }
    set({ pinRepeat: pinRepeat.slice(0, -1) });
  },
  resetPinChange: () =>
    set({ pinDraft: '', pinRepeat: '', pinPhase: 'create' }),
  reset: () => {
    useLegacyAuthStore.setState({ phoneDigits: CANONICAL_PHONE_DIGITS });
    set({
      ...INITIAL,
      identity: { ...CANONICAL_IDENTITY },
      messages: CANONICAL_MESSAGES.map((m) => ({ ...m })),
    });
  },
}));

export function phoneReady(digits: string): boolean {
  return digits.replace(/\D/g, '').length === 10;
}
