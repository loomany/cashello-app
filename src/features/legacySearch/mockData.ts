export type SearchActionId =
  | 'topup'
  | 'delete_account'
  | 'open_card'
  | 'transfer_between'
  | 'conversion'
  | 'withdraw';

export type SearchAction = {
  id: SearchActionId;
  title: string;
  /** Expo route when reconstructed; omitted when deferred. */
  route?: string;
  deferred?: boolean;
};

/**
 * Canonical Search action catalog = Figma `История поиска` rows + sticky withdraw CTA.
 * Domain: SERVICES / ACTIONS — not History ledger, not Accounts list.
 */
export const CANONICAL_SEARCH_ACTIONS: SearchAction[] = [
  { id: 'topup', title: 'Пополнить счет', route: '/legacy/topup' },
  { id: 'delete_account', title: 'Удалить счет', deferred: true },
  { id: 'open_card', title: 'Открыть карту', route: '/legacy/card' },
  { id: 'transfer_between', title: 'Перевод между счетами', route: '/legacy/topup/between' },
  { id: 'conversion', title: 'Конвертация', deferred: true },
];

export const SEARCH_WITHDRAW: SearchAction = {
  id: 'withdraw',
  title: 'Вывести деньги',
  route: '/legacy/withdraw',
};

/** Exact Figma recent seed order (`736:48670`). */
export const CANONICAL_RECENT_QUERIES: string[] = CANONICAL_SEARCH_ACTIONS.map((a) => a.title);

export const SEARCH_BRIDGES = {
  home: '/legacy/home',
  search: '/legacy/search',
  withdraw: '/legacy/withdraw',
} as const;

export function matchSearchActions(query: string, catalog: SearchAction[] = CANONICAL_SEARCH_ACTIONS): SearchAction[] {
  const q = query.trim().toLocaleLowerCase('ru-RU');
  if (!q) return [];
  return catalog.filter((a) => a.title.toLocaleLowerCase('ru-RU').includes(q));
}
