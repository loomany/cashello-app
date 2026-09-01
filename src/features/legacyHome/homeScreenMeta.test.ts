import {
  AUTHORIZED_HOME_LEGACY_NODE_ID,
  AUTHORIZED_HOME_SCREEN_ID,
  HOME_HISTORY_LINK_FILTER_ALIAS,
  resolveAuthorizedHomeScreenMeta,
  resolveHomeScreenMeta,
} from '@/features/legacyHome/homeScreenMeta';

describe('Home screen identity (historyLink alias cleanup)', () => {
  it('authorized Home is always LGC-SCR-025 regardless of historyLink=filter alias', () => {
    expect(resolveAuthorizedHomeScreenMeta()).toEqual({
      screenId: AUTHORIZED_HOME_SCREEN_ID,
      legacyNodeId: AUTHORIZED_HOME_LEGACY_NODE_ID,
    });
    expect(resolveAuthorizedHomeScreenMeta(true)).toEqual({
      screenId: AUTHORIZED_HOME_SCREEN_ID,
      legacyNodeId: AUTHORIZED_HOME_LEGACY_NODE_ID,
    });
  });

  it('canonical and alias routes share the same authorized identity', () => {
    const canonical = resolveHomeScreenMeta(false);
    const alias = resolveAuthorizedHomeScreenMeta(true);
    expect(alias).toEqual(canonical);
    expect(HOME_HISTORY_LINK_FILTER_ALIAS).toBe('/legacy/home?historyLink=filter');
  });
});
