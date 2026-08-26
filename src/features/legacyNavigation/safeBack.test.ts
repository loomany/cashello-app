import { goLegacyBack, LEGACY_BACK_FALLBACKS } from '@/features/legacyNavigation/safeBack';

describe('QA-001 legacy safe back', () => {
  it('uses current stack when canGoBack', () => {
    const goBack = jest.fn();
    const replace = jest.fn();
    const navigation = {
      canGoBack: () => true,
      goBack,
      getParent: () => undefined,
    };
    const result = goLegacyBack(navigation, { replace }, LEGACY_BACK_FALLBACKS.profile);
    expect(result).toBe('stack');
    expect(goBack).toHaveBeenCalledTimes(1);
    expect(replace).not.toHaveBeenCalled();
  });

  it('walks to parent navigator before fallback', () => {
    const parentGoBack = jest.fn();
    const replace = jest.fn();
    const parent = {
      canGoBack: () => true,
      goBack: parentGoBack,
      getParent: () => undefined,
    };
    const navigation = {
      canGoBack: () => false,
      goBack: jest.fn(),
      getParent: () => parent,
    };
    const result = goLegacyBack(navigation, { replace }, LEGACY_BACK_FALLBACKS.profile);
    expect(result).toBe('parent');
    expect(parentGoBack).toHaveBeenCalledTimes(1);
    expect(replace).not.toHaveBeenCalled();
  });

  it('replaces to fallback when no history', () => {
    const replace = jest.fn();
    const navigation = {
      canGoBack: () => false,
      goBack: jest.fn(),
      getParent: () => undefined,
    };
    const result = goLegacyBack(navigation, { replace }, LEGACY_BACK_FALLBACKS.personal);
    expect(result).toBe('fallback');
    expect(replace).toHaveBeenCalledWith(LEGACY_BACK_FALLBACKS.personal);
  });

  it('documents module fallbacks for owner review', () => {
    expect(LEGACY_BACK_FALLBACKS.profile).toBe('/legacy/home');
    expect(LEGACY_BACK_FALLBACKS.personal).toBe('/legacy/profile');
    expect(LEGACY_BACK_FALLBACKS.cardLimits).toBe('/legacy/card');
    expect(LEGACY_BACK_FALLBACKS.accountDetail).toBe('/legacy/accounts');
    expect(LEGACY_BACK_FALLBACKS.historyDetail).toBe('/legacy/history');
    expect(LEGACY_BACK_FALLBACKS.receipt('h3')).toBe('/legacy/history/h3');
    expect(LEGACY_BACK_FALLBACKS.help).toBe('/legacy/messages');
  });
});
