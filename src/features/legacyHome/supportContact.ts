/** Support CTA copy and placeholder links (no real contacts until owner provides them). */
export const supportContactCopy = {
  bonusLabel: '+2% бонус',
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
export const SUPPORT_FAB_GUEST_BOTTOM = 86;
export const SUPPORT_FAB_AUTH_BOTTOM = 68;
