/** Support CTA copy and placeholder links (no real contacts until owner provides them). */
export const supportContactCopy = {
  sheetTitle: 'Служба поддержки',
  telegram: 'Телеграм 24/7',
  whatsapp: 'Whatsapp 24/7',
  linkUnavailableTitle: 'Скоро',
  linkUnavailableBody: 'Ссылка на поддержку будет добавлена позже.',
} as const;

/** TODO: replace with owner-provided URLs when available. */
export const SUPPORT_CONTACT_LINKS = {
  telegram: null as string | null,
  whatsapp: null as string | null,
} as const;

/** Bottom inset above fixed Home chrome (before safe-area). */
export const SUPPORT_FAB_GUEST_BOTTOM = 98;
export const SUPPORT_FAB_AUTH_HOME_BOTTOM = 80;
export const SUPPORT_FAB_DEFAULT_BOTTOM = 20;

export function resolveSupportFabBottom(pathname: string, isGuest: boolean): number {
  const onHome = pathname === '/legacy/home' || pathname.endsWith('/home');
  if (onHome) {
    return isGuest ? SUPPORT_FAB_GUEST_BOTTOM : SUPPORT_FAB_AUTH_HOME_BOTTOM;
  }
  return SUPPORT_FAB_DEFAULT_BOTTOM;
}
