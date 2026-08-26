import { create } from 'zustand';

import { HOME_BRIDGES } from '@/features/legacyHome/mockData';

type LegacySessionStore = {
  /** Unauthenticated browse mode (HOME-001 guest). */
  isGuest: boolean;
  enterGuest: () => void;
  enterAuthorized: () => void;
};

/**
 * Prototype session: guest may browse, financial / account actions gate to login.
 * Survives navigation (unlike `?guest=1` alone).
 */
export const useLegacySessionStore = create<LegacySessionStore>((set) => ({
  isGuest: false,
  enterGuest: () => set({ isGuest: true }),
  enterAuthorized: () => set({ isGuest: false }),
}));

export function homeHref(isGuest: boolean): string {
  return isGuest ? HOME_BRIDGES.guestHome : HOME_BRIDGES.home;
}

export function profileHref(isGuest: boolean): string {
  return isGuest ? HOME_BRIDGES.login : HOME_BRIDGES.profile;
}

export function loginHref(): string {
  return HOME_BRIDGES.login;
}

type ReplaceRouter = { replace: (href: never) => void };

/** Brand from product screens — keep guest vs authorized home. */
export function navigateHome(router: ReplaceRouter) {
  const isGuest = useLegacySessionStore.getState().isGuest;
  router.replace(homeHref(isGuest) as never);
}

/**
 * Leave auth mid-flow (logo / close / back from entry).
 * Always guest — user is not authorized yet.
 */
export function exitAuthToGuestHome(router: ReplaceRouter) {
  useLegacySessionStore.getState().enterGuest();
  router.replace(HOME_BRIDGES.guestHome as never);
}

/** Guest-facing balance label (no real money). */
export function guestBalanceLabel(currency: 'KZT' | 'RUB' | 'USD' | 'bonus'): string {
  if (currency === 'bonus') return '0 Б';
  if (currency === 'USD') return '0 $';
  if (currency === 'RUB') return '0 ₽';
  return '0 ₸';
}
