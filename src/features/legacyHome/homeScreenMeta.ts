export const AUTHORIZED_HOME_SCREEN_ID = 'LGC-SCR-025' as const;
export const AUTHORIZED_HOME_LEGACY_NODE_ID = '765:22510' as const;
export const GUEST_HOME_SCREEN_ID = 'HOME-001' as const;
export const GUEST_HOME_LEGACY_NODE_ID = '7:5' as const;

/** Legacy URL alias — opens Home; query no longer selects a separate screen identity. */
export const HOME_HISTORY_LINK_FILTER_ALIAS = '/legacy/home?historyLink=filter';

export function resolveHomeScreenMeta(isGuest: boolean): {
  screenId: typeof GUEST_HOME_SCREEN_ID | typeof AUTHORIZED_HOME_SCREEN_ID;
  legacyNodeId: typeof GUEST_HOME_LEGACY_NODE_ID | typeof AUTHORIZED_HOME_LEGACY_NODE_ID;
} {
  return isGuest
    ? { screenId: GUEST_HOME_SCREEN_ID, legacyNodeId: GUEST_HOME_LEGACY_NODE_ID }
    : { screenId: AUTHORIZED_HOME_SCREEN_ID, legacyNodeId: AUTHORIZED_HOME_LEGACY_NODE_ID };
}

/** historyLink query is ignored; both canonical and alias URLs share authorized Home identity. */
export function resolveAuthorizedHomeScreenMeta(_historyLinkFilter?: boolean) {
  return resolveHomeScreenMeta(false);
}
