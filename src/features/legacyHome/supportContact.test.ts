import {
  SUPPORT_CONTACT_LINKS,
  SUPPORT_FAB_AUTH_HOME_BOTTOM,
  SUPPORT_FAB_DEFAULT_BOTTOM,
  SUPPORT_FAB_GUEST_BOTTOM,
  resolveSupportFabBottom,
  supportContactCopy,
} from '@/features/legacyHome/supportContact';

describe('support contact CTA', () => {
  it('exposes required copy and placeholder links', () => {
    expect(supportContactCopy.sheetTitle).toBe('Служба поддержки');
    expect(supportContactCopy.telegram).toBe('Телеграм 24/7');
    expect(supportContactCopy.whatsapp).toBe('Whatsapp 24/7');
    expect(SUPPORT_CONTACT_LINKS.telegram).toBeNull();
    expect(SUPPORT_CONTACT_LINKS.whatsapp).toBeNull();
  });

  it('positions FAB above guest login, home tab bar, and default screens', () => {
    expect(SUPPORT_FAB_GUEST_BOTTOM).toBeGreaterThan(80);
    expect(SUPPORT_FAB_AUTH_HOME_BOTTOM).toBeGreaterThan(60);
    expect(SUPPORT_FAB_DEFAULT_BOTTOM).toBe(20);
    expect(resolveSupportFabBottom('/legacy/home', true)).toBe(SUPPORT_FAB_GUEST_BOTTOM);
    expect(resolveSupportFabBottom('/legacy/home', false)).toBe(SUPPORT_FAB_AUTH_HOME_BOTTOM);
    expect(resolveSupportFabBottom('/legacy/payment', false)).toBe(SUPPORT_FAB_DEFAULT_BOTTOM);
    expect(resolveSupportFabBottom('/legacy/history', true)).toBe(SUPPORT_FAB_DEFAULT_BOTTOM);
  });
});
