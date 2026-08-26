import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { PROTOTYPE_STORAGE_KEY } from '@/prototype/config';
import { applyFoundationPayment, createCanonicalSnapshot } from '@/state/actions';
import { DEFAULT_SELECTED_ACCOUNT_ID } from '@/mocks/canonicalDemo';
import { selectCurrencyAccount } from '@/state/homePresentation';
import type { MockSnapshot, SelectedAccountId } from '@/types/domain';
import { useLegacyAccountsStore } from '@/features/legacyAccounts/store';
import { useLegacyAuthStore } from '@/features/legacyAuth/store';
import { useLegacyCardStore } from '@/features/legacyCard/store';
import { useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { useLegacyProfileStore } from '@/features/legacyProfile/store';
import { useLegacySearchStore } from '@/features/legacySearch/store';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { useLegacyWithdrawStore } from '@/features/legacyWithdraw/store';
import { useLegacyPaymentStore } from '@/features/legacyPayment/store';

type MockStore = MockSnapshot & {
  hydrated: boolean;
  balancesHidden: boolean;
  selectedAccountId: SelectedAccountId;
  resetToCanonical: () => void;
  simulateFoundationPayment: () => void;
  toggleBalancesHidden: () => void;
  selectAccount: (id: SelectedAccountId) => void;
};

const initialUi = {
  hydrated: false,
  balancesHidden: false,
  selectedAccountId: DEFAULT_SELECTED_ACCOUNT_ID as SelectedAccountId,
};

export const useMockStore = create<MockStore>()(
  persist(
    (set) => ({
      ...createCanonicalSnapshot(),
      ...initialUi,
      resetToCanonical: () => {
        useLegacyAuthStore.getState().reset();
        useLegacyCardStore.getState().reset();
        useLegacyAccountsStore.getState().reset();
        useLegacyTopupStore.getState().reset();
        useLegacyWithdrawStore.getState().reset();
        useLegacyHistoryStore.getState().reset();
        useLegacySearchStore.getState().reset();
        useLegacyProfileStore.getState().reset();
        useLegacyPaymentStore.getState().reset();
        set({
          ...createCanonicalSnapshot(),
          hydrated: true,
          balancesHidden: false,
          selectedAccountId: DEFAULT_SELECTED_ACCOUNT_ID,
        });
      },
      simulateFoundationPayment: () =>
        set((state) => ({
          ...applyFoundationPayment(state, new Date().toISOString()),
          hydrated: true,
        })),
      toggleBalancesHidden: () => set((state) => ({ balancesHidden: !state.balancesHidden })),
      selectAccount: (id) => set({ selectedAccountId: selectCurrencyAccount(id) }),
    }),
    {
      name: PROTOTYPE_STORAGE_KEY,
      version: 3,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        accounts: state.accounts,
        bonus: state.bonus,
        headlineKztMinor: state.headlineKztMinor,
        paydalaCard: state.paydalaCard,
        linkedCards: state.linkedCards,
        categories: state.categories,
        services: state.services,
        transactions: state.transactions,
      }),
      migrate: () => createCanonicalSnapshot(),
      onRehydrateStorage: () => () => {
        useMockStore.setState({ hydrated: true });
      },
    },
  ),
);
