import { DEMO_PHONE } from '@/mocks/canonicalDemo';
import { HOME_SERVICE_IDS } from '@/mocks/demoServices';
import { createCanonicalSnapshot } from '@/state/actions';
import {
  canonicalHomeSeed,
  CURRENCY_ACCOUNT_ORDER,
  HOME_QUICK_ACTIONS,
  homeHeaderIdentity,
  homeServices,
  moneyLabel,
  orderedCurrencyAccounts,
  recentTransactions,
  selectCurrencyAccount,
} from '@/state/homePresentation';

describe('canonical Home wallet seed', () => {
  it('uses the director-demo balances', () => {
    const seed = canonicalHomeSeed(createCanonicalSnapshot());
    expect(seed.headlineKztMinor).toBe(128_450_000);
    expect(seed.kztMinor).toBe(115_000_000);
    expect(seed.usdMinor).toBe(21_000);
    expect(seed.rubMinor).toBe(800_000);
    expect(seed.bonusMinor).toBe(1_245_000);
  });
});

describe('reset', () => {
  it('returns the same canonical Home seed', () => {
    expect(createCanonicalSnapshot().headlineKztMinor).toBe(128_450_000);
    expect(createCanonicalSnapshot().transactions[0]?.id).toBe('txn_009');
    expect(canonicalHomeSeed(createCanonicalSnapshot()).selectedAccountId).toBe('acc_kzt');
  });
});

describe('balance privacy', () => {
  it('masks amounts without dropping the unit cue', () => {
    expect(moneyLabel(false, 128_450_000, 'KZT')).toBe('1 284 500 ₸');
    expect(moneyLabel(true, 128_450_000, 'KZT')).toBe('•••• ₸');
    expect(moneyLabel(true, 1_245_000, 'BONUS')).toBe('•••• Б');
  });
});

describe('currency accounts', () => {
  it('orders KZT then RUB then USD and defaults to KZT', () => {
    const snapshot = createCanonicalSnapshot();
    expect(CURRENCY_ACCOUNT_ORDER).toEqual(['KZT', 'RUB', 'USD']);
    expect(snapshot.accounts.map((account) => account.currency)).toEqual(['KZT', 'RUB', 'USD']);
    expect(orderedCurrencyAccounts(snapshot.accounts).map((account) => account.currency)).toEqual([
      'KZT',
      'RUB',
      'USD',
    ]);
    expect(selectCurrencyAccount('acc_usd')).toBe('acc_usd');
    expect(selectCurrencyAccount('all')).toBe('acc_kzt');
    expect(canonicalHomeSeed(snapshot).selectedAccountId).toBe('acc_kzt');
  });
});

describe('Home services', () => {
  it('starts with Ubet, Oinabet, Tennisi and includes the owner catalog', () => {
    const snapshot = createCanonicalSnapshot();
    const names = homeServices(snapshot.services).map((service) => service.name);
    expect(names.slice(0, 3)).toEqual(['Ubet', 'Oinabet', 'Tennisi']);
    expect(HOME_SERVICE_IDS.slice(0, 3)).toEqual(['svc_ubet', 'svc_oinabet', 'svc_tennisi']);
    expect(names).toEqual([
      'Ubet',
      'Oinabet',
      'Tennisi',
      'Fonbet',
      '1xbet',
      'Parimatch',
      'Робокэш/Займер',
      'CreditBar',
      'i-credit.kz',
      'Kengo',
      'Sat Credit',
      'Steam',
      'Beeline',
      'Altel',
      'Activ',
      'Kcell',
      'Tele 2',
      'izi',
    ]);
    expect(snapshot.services.some((service) => /скоро/i.test(service.name))).toBe(false);
    expect(snapshot.services.every((service) => service.mockEconomics === null || service.mockEconomics.mock)).toBe(
      true,
    );
  });
});

describe('Home header identity', () => {
  it('shows the synthetic phone and not a greeting or personal name', () => {
    const user = createCanonicalSnapshot().user;
    expect(homeHeaderIdentity(user)).toBe(DEMO_PHONE);
    expect(homeHeaderIdentity(user)).toBe('+7 700 123 45 67');
    expect(homeHeaderIdentity(user)).not.toMatch(/Добрый день/i);
    expect(homeHeaderIdentity(user)).not.toBe(user.displayName);
  });
});

describe('Home interactions', () => {
  it('returns five recent operations', () => {
    const recent = recentTransactions(createCanonicalSnapshot().transactions);
    expect(recent).toHaveLength(5);
    expect(recent[0]?.id).toBe('txn_009');
    expect(recent.some((item) => item.status === 'rejected')).toBe(true);
    expect(recentTransactions([])).toEqual([]);
  });
});

describe('Home shell contract', () => {
  it('keeps the four money actions in order', () => {
    expect(HOME_QUICK_ACTIONS).toEqual(['Пополнить', 'Перевести', 'Вывести', 'Оплатить']);
  });
});
