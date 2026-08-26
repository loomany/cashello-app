import { create } from 'zustand';

import { DEFAULT_PRIMARY_ACCOUNT_ID } from '@/features/legacyAccounts/mockData';

type LegacyAccountsStore = {
  primaryAccountId: string;
  lastOpenCurrency: string | null;
  lastDownload: 'statement' | 'requisites' | null;
  setPrimary: (id: string) => void;
  markOpenCurrency: (currency: string) => void;
  markDownload: (kind: 'statement' | 'requisites') => void;
  reset: () => void;
};

const INITIAL = {
  primaryAccountId: DEFAULT_PRIMARY_ACCOUNT_ID,
  lastOpenCurrency: null as string | null,
  lastDownload: null as 'statement' | 'requisites' | null,
};

export const useLegacyAccountsStore = create<LegacyAccountsStore>((set) => ({
  ...INITIAL,
  setPrimary: (id) => set({ primaryAccountId: id }),
  markOpenCurrency: (currency) => set({ lastOpenCurrency: currency }),
  markDownload: (kind) => set({ lastDownload: kind }),
  reset: () => set({ ...INITIAL }),
}));
