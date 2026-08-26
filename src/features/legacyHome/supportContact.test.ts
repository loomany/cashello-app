import {
  SUPPORT_CONTACT_LINKS,
  SUPPORT_FAB_AUTH_BOTTOM,
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

  it('keeps FAB anchored above bottom chrome on every screen', () => {
    expect(SUPPORT_FAB_GUEST_BOTTOM).toBe(98);
    expect(SUPPORT_FAB_AUTH_BOTTOM).toBe(80);
    expect(resolveSupportFabBottom(true)).toBe(SUPPORT_FAB_GUEST_BOTTOM);
    expect(resolveSupportFabBottom(false)).toBe(SUPPORT_FAB_AUTH_BOTTOM);
    expect(resolveSupportFabBottom(false)).toBe(resolveSupportFabBottom(false));
  });
});
