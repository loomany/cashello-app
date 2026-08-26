import { DEFAULT_SELECTED_ACCOUNT_ID } from '@/mocks/canonicalDemo';
import { HOME_SERVICE_IDS } from '@/mocks/demoServices';
import { formatMoney, maskedMoney } from '@/lib/formatMoney';
import type {
  CatalogService,
  CurrencyCode,
  MockSnapshot,
  SelectedAccountId,
  Transaction,
  TransactionStatus,
  UserProfile,
  WalletAccount,
} from '@/types/domain';

export const HOME_RECENT_LIMIT = 5;

export const HOME_QUICK_ACTIONS = ['Пополнить', 'Перевести', 'Вывести', 'Оплатить'] as const;

export const CURRENCY_ACCOUNT_ORDER: CurrencyCode[] = ['KZT', 'RUB', 'USD'];

export function recentTransactions(transactions: Transaction[], limit = HOME_RECENT_LIMIT): Transaction[] {
  return [...transactions]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}

export function selectCurrencyAccount(next: SelectedAccountId): SelectedAccountId {
  return next === 'all' ? DEFAULT_SELECTED_ACCOUNT_ID : next;
}

export function orderedCurrencyAccounts(accounts: WalletAccount[]): WalletAccount[] {
  return CURRENCY_ACCOUNT_ORDER.map((currency) => accounts.find((account) => account.currency === currency)).filter(
    (account): account is WalletAccount => Boolean(account),
  );
}

export function homeServices(services: CatalogService[]): CatalogService[] {
  const byId = new Map(services.map((service) => [service.id, service]));
  const ordered = HOME_SERVICE_IDS.map((id) => byId.get(id)).filter((service): service is CatalogService =>
    Boolean(service),
  );
  const extras = services.filter((service) => !(HOME_SERVICE_IDS as readonly string[]).includes(service.id));
  return [...ordered, ...extras];
}

export function homeHeaderIdentity(user: UserProfile): string {
  return user.phone;
}

export function moneyLabel(hidden: boolean, amountMinor: number, unit: Parameters<typeof formatMoney>[1]): string {
  return hidden ? maskedMoney(unit) : formatMoney(amountMinor, unit, true);
}

export function statusCopy(status: TransactionStatus): { label: string; tone: 'success' | 'warning' | 'danger' } {
  if (status === 'success') return { label: 'Успешно', tone: 'success' };
  if (status === 'rejected' || status === 'failed') return { label: 'Отклонено', tone: 'danger' };
  return { label: 'В обработке', tone: 'warning' };
}

export function displayServiceName(name: string): string {
  return name.replace(' (demo)', '').replace(' (демо)', '');
}

export function serviceCaption(service: CatalogService): string {
  if (service.mockEconomics?.caption) return service.mockEconomics.caption;
  if (service.categoryId === 'cat_mfo') return 'МФО';
  if (service.categoryId === 'cat_digital_goods') return 'Цифровые товары';
  if (service.categoryId === 'cat_bookmakers') return 'Букмекер';
  return 'Связь';
}

export function canonicalHomeSeed(snapshot: MockSnapshot) {
  const kzt = snapshot.accounts.find((account) => account.currency === 'KZT');
  const usd = snapshot.accounts.find((account) => account.currency === 'USD');
  const rub = snapshot.accounts.find((account) => account.currency === 'RUB');
  return {
    headlineKztMinor: snapshot.headlineKztMinor,
    kztMinor: kzt?.availableMinor ?? 0,
    usdMinor: usd?.availableMinor ?? 0,
    rubMinor: rub?.availableMinor ?? 0,
    bonusMinor: snapshot.bonus.balanceMinor,
    phone: snapshot.user.phone,
    accountOrder: snapshot.accounts.map((account) => account.currency),
    selectedAccountId: DEFAULT_SELECTED_ACCOUNT_ID,
    homeServiceNames: homeServices(snapshot.services).map((service) => service.name),
  };
}
