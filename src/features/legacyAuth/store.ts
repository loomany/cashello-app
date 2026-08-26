import { create } from 'zustand';

import { reduceLegacyAuth } from '@/features/legacyAuth/machine';
import { INITIAL_LEGACY_AUTH, type LegacyAuthAction, type LegacyAuthSnapshot } from '@/features/legacyAuth/types';

type LegacyAuthStore = LegacyAuthSnapshot & {
  dispatch: (action: LegacyAuthAction) => void;
  reset: () => void;
};

export const useLegacyAuthStore = create<LegacyAuthStore>((set) => ({
  ...INITIAL_LEGACY_AUTH,
  dispatch: (action) => set((state) => reduceLegacyAuth(state, action)),
  reset: () => set({ ...INITIAL_LEGACY_AUTH }),
}));
