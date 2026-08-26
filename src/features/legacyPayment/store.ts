import { create } from 'zustand';

import { PAYMENT_SECTIONS } from '@/features/legacyPayment/mockData';

function seedFavorites(): Record<string, boolean> {
  const map: Record<string, boolean> = {};
  for (const section of PAYMENT_SECTIONS) {
    for (const item of section.items) {
      if (item.favorite) map[item.id] = true;
    }
  }
  return map;
}

type PaymentStore = {
  favorites: Record<string, boolean>;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  reset: () => void;
};

export const useLegacyPaymentStore = create<PaymentStore>((set, get) => ({
  favorites: seedFavorites(),
  isFavorite: (id) => Boolean(get().favorites[id]),
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: { ...state.favorites, [id]: !state.favorites[id] },
    })),
  reset: () => set({ favorites: seedFavorites() }),
}));
