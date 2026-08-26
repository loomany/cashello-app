import {
  SUPPORT_CONTACT_LINKS,
  SUPPORT_FAB_AUTH_BOTTOM,
  SUPPORT_FAB_GUEST_BOTTOM,
  supportContactCopy,
} from '@/features/legacyHome/supportContact';

describe('support contact CTA', () => {
  it('exposes required copy and placeholder links', () => {
    expect(supportContactCopy.bonusLabel).toBe('+2% бонус');
    expect(supportContactCopy.sheetTitle).toBe('Служба поддержки');
    expect(supportContactCopy.telegram).toBe('Телеграм 24/7');
    expect(supportContactCopy.whatsapp).toBe('Whatsapp 24/7');
    expect(SUPPORT_CONTACT_LINKS.telegram).toBeNull();
    expect(SUPPORT_CONTACT_LINKS.whatsapp).toBeNull();
  });

  it('positions FAB above guest login and authorized tab bar', () => {
    expect(SUPPORT_FAB_GUEST_BOTTOM).toBeGreaterThan(70);
    expect(SUPPORT_FAB_AUTH_BOTTOM).toBeGreaterThan(50);
    expect(SUPPORT_FAB_GUEST_BOTTOM).toBeGreaterThan(SUPPORT_FAB_AUTH_BOTTOM);
  });
});
