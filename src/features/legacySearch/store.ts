import { create } from 'zustand';

import { CANONICAL_RECENT_QUERIES } from '@/features/legacySearch/mockData';

type LegacySearchState = {
  query: string;
  recent: string[];
  setQuery: (query: string) => void;
  clearQuery: () => void;
  remember: (title: string) => void;
  reset: () => void;
};

const INITIAL = {
  query: '',
  recent: [...CANONICAL_RECENT_QUERIES],
};

export const useLegacySearchStore = create<LegacySearchState>((set, get) => ({
  ...INITIAL,
  setQuery: (query) => set({ query }),
  clearQuery: () => set({ query: '' }),
  remember: (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const next = [trimmed, ...get().recent.filter((q) => q !== trimmed)].slice(0, 8);
    set({ recent: next });
  },
  reset: () => set({ ...INITIAL, recent: [...CANONICAL_RECENT_QUERIES] }),
}));
