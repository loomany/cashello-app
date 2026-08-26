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

/** Bottom inset above fixed bottom chrome (before safe-area). */
export const SUPPORT_FAB_GUEST_BOTTOM = 98;
export const SUPPORT_FAB_AUTH_BOTTOM = 80;

/** Same anchor on every legacy screen — above tab bar / guest CTA. */
export function resolveSupportFabBottom(isGuest: boolean): number {
  return isGuest ? SUPPORT_FAB_GUEST_BOTTOM : SUPPORT_FAB_AUTH_BOTTOM;
}
