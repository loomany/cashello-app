import { accountsCopy, cardBridgeCopy, topUpBridgeCopy } from '@/features/legacyAccounts/copy';
import {
  ACCOUNT_BRIDGES,
  DEFAULT_PRIMARY_ACCOUNT_ID,
  LEGACY_ACCOUNTS,
  OPEN_ACCOUNT_OPTIONS,
} from '@/features/legacyAccounts/mockData';
import { useLegacyAccountsStore } from '@/features/legacyAccounts/store';
import { HOME_BRIDGES } from '@/features/legacyHome/mockData';

describe('legacy accounts reconstruction (RECON-003)', () => {
  beforeEach(() => {
    useLegacyAccountsStore.getState().reset();
  });

  it('routes Home to All Accounts', () => {
    expect(HOME_BRIDGES.accounts).toBe('/legacy/accounts');
    expect(ACCOUNT_BRIDGES.list).toBe('/legacy/accounts');
  });

  it('renders All Accounts copy and three demo rows', () => {
    expect(accountsCopy.title).toBe('Счета');
    expect(LEGACY_ACCOUNTS).toHaveLength(3);
    expect(LEGACY_ACCOUNTS.map((row) => row.balance)).toEqual(['2 000 ₸', '43 000 ₸', '450 $']);
    expect(LEGACY_ACCOUNTS.map((row) => row.currency)).toEqual(['KZT', 'KZT', 'USD']);
  });

  it('marks the first KZT account as primary by default', () => {
    expect(useLegacyAccountsStore.getState().primaryAccountId).toBe(DEFAULT_PRIMARY_ACCOUNT_ID);
    expect(LEGACY_ACCOUNTS[0]?.id).toBe('kzt-primary');
    expect(accountsCopy.primary).toBe('Основной');
  });

  it('selects account detail routes deterministically', () => {
    expect(ACCOUNT_BRIDGES.detail('kzt-primary')).toBe('/legacy/accounts/kzt-primary');
    expect(ACCOUNT_BRIDGES.detail('kzt-secondary')).toBe('/legacy/accounts/kzt-secondary');
    expect(ACCOUNT_BRIDGES.detail('usd')).toBe('/legacy/accounts/usd');
    expect(LEGACY_ACCOUNTS.find((row) => row.id === 'kzt-primary')?.hasCard).toBe(false);
    expect(LEGACY_ACCOUNTS.find((row) => row.id === 'usd')?.hasCard).toBe(true);
  });

  it('keeps open-account currencies reachable without creating accounts', () => {
    expect(accountsCopy.openSheetTitle).toBe('Вид счета');
    expect(OPEN_ACCOUNT_OPTIONS.map((row) => row.id)).toEqual(['KZT', 'USD', 'RUB']);
    useLegacyAccountsStore.getState().markOpenCurrency('RUB');
    expect(useLegacyAccountsStore.getState().lastOpenCurrency).toBe('RUB');
    expect(LEGACY_ACCOUNTS.some((row) => row.currency === 'RUB')).toBe(false);
  });

  it('exposes card and top-up / between-accounts bridges', () => {
    expect(ACCOUNT_BRIDGES.card).toBe('/legacy/card');
    expect(ACCOUNT_BRIDGES.topup).toBe('/legacy/topup');
    expect(cardBridgeCopy.module).toBe('RECON-004');
    expect(topUpBridgeCopy.module).toBe('RECON-005');
    expect(accountsCopy.betweenAccounts).toBe('Между счетами');
    expect(accountsCopy.topUpTitle).toBe('Способ пополнение');
    expect(accountsCopy.openCard).toBe('Открыть карту');
    expect(accountsCopy.cardMore).toBe('Подробнее');
  });

  it('resets primary and mock flags deterministically', () => {
    useLegacyAccountsStore.getState().setPrimary('usd');
    useLegacyAccountsStore.getState().markOpenCurrency('USD');
    useLegacyAccountsStore.getState().markDownload('statement');
    useLegacyAccountsStore.getState().reset();
    const state = useLegacyAccountsStore.getState();
    expect(state.primaryAccountId).toBe('kzt-primary');
    expect(state.lastOpenCurrency).toBeNull();
    expect(state.lastDownload).toBeNull();
  });
});
