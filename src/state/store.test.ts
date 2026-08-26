import { useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { homeHref, profileHref, useLegacySessionStore } from '@/features/legacyHome/session';
import { useLegacyPaymentStore } from '@/features/legacyPayment/store';
import { CANONICAL_BALANCES } from '@/features/legacyTopup/mockData';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { useMockStore } from '@/state/store';

describe('Home store interactions', () => {
  afterEach(() => {
    useMockStore.getState().resetToCanonical();
    useLegacySessionStore.getState().enterAuthorized();
  });

  it('toggles balance privacy and restores canonical Home on reset', () => {
    useMockStore.setState({
      balancesHidden: false,
      selectedAccountId: 'acc_usd',
      headlineKztMinor: 1,
    });

    useMockStore.getState().toggleBalancesHidden();
    expect(useMockStore.getState().balancesHidden).toBe(true);

    useMockStore.getState().selectAccount('acc_kzt');
    expect(useMockStore.getState().selectedAccountId).toBe('acc_kzt');

    useMockStore.getState().resetToCanonical();
    const state = useMockStore.getState();
    expect(state.balancesHidden).toBe(false);
    expect(state.selectedAccountId).toBe('acc_kzt');
    expect(state.headlineKztMinor).toBe(128_450_000);
    expect(state.accounts.find((account) => account.currency === 'KZT')?.availableMinor).toBe(115_000_000);
  });
});

describe('resetToCanonical session consistency (WIP-INTEGRATION-001A)', () => {
  afterEach(() => {
    useMockStore.getState().resetToCanonical();
    useLegacySessionStore.getState().enterAuthorized();
  });

  it('keeps guest session after Reset Demo', () => {
    useLegacySessionStore.getState().enterGuest();
    useMockStore.getState().resetToCanonical();
    expect(useLegacySessionStore.getState().isGuest).toBe(true);
  });

  it('keeps authorized session after Reset Demo', () => {
    useLegacySessionStore.getState().enterAuthorized();
    useMockStore.getState().resetToCanonical();
    expect(useLegacySessionStore.getState().isGuest).toBe(false);
  });

  it('keeps guest tab/navigation helpers aligned after Reset Demo', () => {
    useLegacySessionStore.getState().enterGuest();
    useMockStore.getState().resetToCanonical();

    expect(useLegacySessionStore.getState().isGuest).toBe(true);
    expect(homeHref(true)).toBe('/legacy/home?guest=1');
    expect(profileHref(true)).toBe('/legacy/auth?qaStep=iin');
  });

  it('resets payment favorites while preserving guest session', () => {
    useLegacySessionStore.getState().enterGuest();
    const before = useLegacyPaymentStore.getState().isFavorite('ubet');
    useLegacyPaymentStore.getState().toggleFavorite('ubet');
    expect(useLegacyPaymentStore.getState().isFavorite('ubet')).toBe(!before);

    useMockStore.getState().resetToCanonical();

    expect(useLegacySessionStore.getState().isGuest).toBe(true);
    expect(useLegacyPaymentStore.getState().isFavorite('ubet')).toBe(before);
  });

  it('resets canonical legacy stores while preserving authorized session', () => {
    useLegacySessionStore.getState().enterAuthorized();
    useLegacyTopupStore.setState({ balances: { ...CANONICAL_BALANCES, 'kzt-primary': 1 } });
    useLegacyHistoryStore.setState({ operations: [] });

    useMockStore.getState().resetToCanonical();

    expect(useLegacySessionStore.getState().isGuest).toBe(false);
    expect(useLegacyTopupStore.getState().balances['kzt-primary']).toBe(CANONICAL_BALANCES['kzt-primary']);
    expect(useLegacyHistoryStore.getState().operations.length).toBeGreaterThan(0);
  });
});
