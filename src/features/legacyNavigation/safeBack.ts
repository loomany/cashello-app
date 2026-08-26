import { useCallback } from 'react';
import { useNavigation, useRouter, type Href } from 'expo-router';

/**
 * Legacy owner-review back: prefer real stack history (including parent
 * navigators for nested `/legacy/**` stacks), else replace to module parent.
 * Does not reset stores or re-run mock transactions.
 */
export function goLegacyBack(
  navigation: { canGoBack(): boolean; goBack(): void; getParent(): unknown },
  router: { replace: (href: Href) => void },
  fallbackHref: string,
): 'stack' | 'parent' | 'fallback' {
  let nav: { canGoBack(): boolean; goBack(): void; getParent(): unknown } | undefined = navigation;
  let depth = 0;
  while (nav) {
    if (nav.canGoBack()) {
      nav.goBack();
      return depth === 0 ? 'stack' : 'parent';
    }
    nav = nav.getParent() as typeof nav | undefined;
    depth += 1;
  }
  router.replace(fallbackHref as Href);
  return 'fallback';
}

export function useLegacyBack(fallbackHref: string) {
  const router = useRouter();
  const navigation = useNavigation();

  return useCallback(() => {
    goLegacyBack(navigation, router, fallbackHref);
  }, [fallbackHref, navigation, router]);
}

/** Module parent routes when history is empty (direct entry / refresh). */
export const LEGACY_BACK_FALLBACKS = {
  home: '/legacy/home',
  auth: '/legacy/auth',
  profile: '/legacy/home',
  personal: '/legacy/profile',
  phone: '/legacy/profile',
  phoneVerify: '/legacy/profile/phone',
  profilePin: '/legacy/profile',
  messages: '/legacy/home',
  help: '/legacy/messages',
  search: '/legacy/home',
  accounts: '/legacy/home',
  accountDetail: '/legacy/accounts',
  card: '/legacy/accounts',
  cardLimits: '/legacy/card',
  cardPin: '/legacy/card',
  topup: '/legacy/home',
  topupBetween: '/legacy/topup',
  topupCard: '/legacy/topup',
  topupCash: '/legacy/topup',
  topupCashMap: '/legacy/topup/cash',
  withdraw: '/legacy/home',
  withdrawCard: '/legacy/withdraw',
  withdrawPhone: '/legacy/withdraw',
  withdrawCash: '/legacy/withdraw',
  withdrawCashMap: '/legacy/withdraw/cash',
  withdrawAmount: '/legacy/withdraw',
  history: '/legacy/home',
  historyFilter: '/legacy/history',
  historyDetail: '/legacy/history',
  receipt: (id: string) => `/legacy/history/${id}`,
  payment: '/legacy/home',
  paymentService: '/legacy/payment',
  qr: '/legacy/home',
  profileStatus: '/legacy/profile',
} as const;
