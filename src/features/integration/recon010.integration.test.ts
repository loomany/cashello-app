import { reduceLegacyAuth } from '@/features/legacyAuth/machine';
import { useLegacyAuthStore } from '@/features/legacyAuth/store';
import { INITIAL_LEGACY_AUTH } from '@/features/legacyAuth/types';
import { useLegacyCardStore } from '@/features/legacyCard/store';
import { CARD_BRIDGES } from '@/features/legacyCard/mockData';
import { ACCOUNT_BRIDGES } from '@/features/legacyAccounts/mockData';
import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { HISTORY_BRIDGES } from '@/features/legacyHistory/mockData';
import { useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { DEMO_CHANGE_PHONE_SMS, PROFILE_BRIDGES } from '@/features/legacyProfile/mockData';
import { useLegacyProfileStore } from '@/features/legacyProfile/store';
import { SEARCH_BRIDGES, CANONICAL_SEARCH_ACTIONS } from '@/features/legacySearch/mockData';
import { TOPUP_BRIDGES } from '@/features/legacyTopup/mockData';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { WITHDRAW_BRIDGES } from '@/features/legacyWithdraw/mockData';
import { useLegacyWithdrawStore } from '@/features/legacyWithdraw/store';
import { useMockStore } from '@/state/store';

describe('RECON-010 cross-module integration', () => {
  beforeEach(() => {
    useMockStore.getState().resetToCanonical();
  });

  it('auth PIN completion reaches complete step that launches Home', () => {
    let state = { ...INITIAL_LEGACY_AUTH, step: 'pinCreate' as const };
    for (const d of '123456') state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    for (const d of '123456') state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    expect(state.step).toBe('complete');
    expect(HOME_BRIDGES.profile).toBe('/legacy/profile');
  });

  it('returning-user GO_LOGIN reaches pinLogin then Home complete', () => {
    let state = { ...INITIAL_LEGACY_AUTH, step: 'iin' as const };
    state = reduceLegacyAuth(state, { type: 'GO_LOGIN' });
    expect(state.step).toBe('pinLogin');
    for (const d of '654321') state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    expect(state.step).toBe('complete');
  });

  it('Home bridges reach Accounts and Card routes', () => {
    expect(HOME_BRIDGES.accounts).toBe(ACCOUNT_BRIDGES.list);
    expect(ACCOUNT_BRIDGES.card).toBe(CARD_BRIDGES.root);
    expect(CARD_BRIDGES.limits).toBe('/legacy/card/limits');
    expect(CARD_BRIDGES.pin).toBe('/legacy/card/pin');
  });

  it('between-account transfer updates balances and appends History', () => {
    useLegacyTopupStore.setState({
      balances: { 'kzt-primary': 0, rub: 0, usd: 10, bonus: 500 },
    });
    const topup = useLegacyTopupStore.getState();
    const before = topup.balances['kzt-primary'];
    topup.setFromId('usd');
    topup.setToId('kzt-primary');
    topup.setAmountDigits('2');
    expect(topup.confirmBetween()).toBe(true);
    expect(useLegacyTopupStore.getState().balances['kzt-primary']).toBeCloseTo(before + 2 * 458.48, 5);
    const ops = useLegacyHistoryStore.getState().operations;
    expect(ops[0].title).toBe('Между своими');
    expect(ops[0].id.startsWith('live_')).toBe(true);
  });

  it('withdrawal updates balance and History', () => {
    useLegacyTopupStore.setState({
      balances: { 'kzt-primary': 5000, rub: 0, usd: 0, bonus: 500 },
    });
    const store = useLegacyWithdrawStore.getState();
    store.setMethod('card');
    store.fillSyntheticCard();
    store.setAmountDigits('1500');
    const before = useLegacyTopupStore.getState().balances['kzt-primary'];
    expect(store.confirmAndSettle('success')).toBe(true);
    expect(useLegacyTopupStore.getState().balances['kzt-primary']).toBe(before - 1500);
    expect(useLegacyHistoryStore.getState().operations[0].kind).toBe('card');
  });

  it('History detail and receipt routes are wired', () => {
    const id = useLegacyHistoryStore.getState().operations[0].id;
    expect(HISTORY_BRIDGES.detail(id)).toBe(`/legacy/history/${id}`);
    expect(HISTORY_BRIDGES.receipt(id)).toBe(`/legacy/history/${id}/receipt`);
    expect(useLegacyHistoryStore.getState().getById(id)?.receiptEligible).toBeDefined();
  });

  it('Search actions map to implemented module routes', () => {
    const topup = CANONICAL_SEARCH_ACTIONS.find((a) => a.id === 'topup');
    const card = CANONICAL_SEARCH_ACTIONS.find((a) => a.id === 'open_card');
    const between = CANONICAL_SEARCH_ACTIONS.find((a) => a.id === 'transfer_between');
    expect(topup?.route).toBe(TOPUP_BRIDGES.root);
    expect(card?.route).toBe(CARD_BRIDGES.root);
    expect(between?.route).toBe(TOPUP_BRIDGES.between);
    expect(SEARCH_BRIDGES.withdraw).toBe(WITHDRAW_BRIDGES.root);
  });

  it('change phone updates profile and auth phoneDigits', () => {
    useLegacyProfileStore.getState().setPendingPhoneDigits('7054564356');
    useLegacyProfileStore.getState().setPhoneSms(DEMO_CHANGE_PHONE_SMS);
    expect(useLegacyProfileStore.getState().commitPendingPhone()).toBe(true);
    expect(useLegacyProfileStore.getState().phoneDigits).toBe('7054564356');
    expect(useLegacyAuthStore.getState().phoneDigits).toBe('7054564356');
  });

  it('logout target is legacy auth and profile reset restores phone', () => {
    expect(PROFILE_BRIDGES.auth).toBe('/legacy/auth');
    useLegacyProfileStore.getState().setPendingPhoneDigits('7054564356');
    useLegacyProfileStore.getState().setPhoneSms(DEMO_CHANGE_PHONE_SMS);
    useLegacyProfileStore.getState().commitPendingPhone();
    useLegacyProfileStore.getState().reset();
    expect(useLegacyProfileStore.getState().phoneDigits).toBe('7777777777');
  });

  it('global reset restores auth, card, balances, history, profile', () => {
    useLegacyAuthStore.getState().dispatch({ type: 'ADVANCE_SPLASH' });
    useLegacyCardStore.getState().toggleCvv();
    useLegacyTopupStore.getState().setFromId('usd');
    useLegacyHistoryStore.getState().appendOperation({
      title: 'Test',
      listStatus: 'Успешно',
      amount: 1,
      kind: 'topup',
    });
    useLegacyProfileStore.getState().togglePush();

    useMockStore.getState().resetToCanonical();

    expect(useLegacyAuthStore.getState().step).toBe('splash');
    expect(useLegacyCardStore.getState().face).toBe('pan');
    expect(useLegacyTopupStore.getState().fromId).toBeNull();
    expect(useLegacyHistoryStore.getState().operations.every((o) => o.seed)).toBe(true);
    expect(useLegacyProfileStore.getState().pushEnabled).toBe(true);
    expect(useLegacyProfileStore.getState().phoneDigits).toBe('7777777777');
  });
});
