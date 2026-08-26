import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { searchCopy } from '@/features/legacySearch/copy';
import {
  CANONICAL_RECENT_QUERIES,
  CANONICAL_SEARCH_ACTIONS,
  matchSearchActions,
  SEARCH_BRIDGES,
} from '@/features/legacySearch/mockData';
import { useLegacySearchStore } from '@/features/legacySearch/store';
import { useMockStore } from '@/state/store';

beforeEach(() => {
  useLegacySearchStore.getState().reset();
});

describe('RECON-008 search', () => {
  it('Home bridges to Search', () => {
    expect(HOME_BRIDGES.search).toBe('/legacy/search');
    expect(SEARCH_BRIDGES.search).toBe('/legacy/search');
  });

  it('initial recent seed matches Figma История поиска', () => {
    expect(useLegacySearchStore.getState().recent).toEqual(CANONICAL_RECENT_QUERIES);
    expect(CANONICAL_RECENT_QUERIES).toEqual([
      'Пополнить счет',
      'Удалить счет',
      'Открыть карту',
      'Перевод между счетами',
      'Конвертация',
    ]);
    expect(searchCopy.placeholder).toBe('Поиск');
    expect(searchCopy.cancel).toBe('Отменить');
    expect(searchCopy.recentSection).toBe('История поиска');
    expect(searchCopy.withdraw).toBe('Вывести деньги');
  });

  it('typing matches action titles case-insensitively', () => {
    const hits = matchSearchActions('карт');
    expect(hits.map((a) => a.id)).toEqual(['open_card']);
    expect(matchSearchActions('перевод').some((a) => a.id === 'transfer_between')).toBe(true);
  });

  it('nonmatching query yields empty matches (adapted empty UI)', () => {
    expect(matchSearchActions('zzz-no-such')).toEqual([]);
    expect(searchCopy.noResults).toBe('Ничего не найдено');
  });

  it('clear restores empty query', () => {
    useLegacySearchStore.getState().setQuery('карта');
    expect(useLegacySearchStore.getState().query).toBe('карта');
    useLegacySearchStore.getState().clearQuery();
    expect(useLegacySearchStore.getState().query).toBe('');
  });

  it('result selection routes use reconstructed modules where available', () => {
    const topup = CANONICAL_SEARCH_ACTIONS.find((a) => a.id === 'topup');
    const card = CANONICAL_SEARCH_ACTIONS.find((a) => a.id === 'open_card');
    const between = CANONICAL_SEARCH_ACTIONS.find((a) => a.id === 'transfer_between');
    expect(topup?.route).toBe('/legacy/topup');
    expect(card?.route).toBe('/legacy/card');
    expect(between?.route).toBe('/legacy/topup/between');
    expect(SEARCH_BRIDGES.withdraw).toBe('/legacy/withdraw');
    expect(CANONICAL_SEARCH_ACTIONS.find((a) => a.id === 'delete_account')?.deferred).toBe(true);
    expect(CANONICAL_SEARCH_ACTIONS.find((a) => a.id === 'conversion')?.deferred).toBe(true);
  });

  it('does not use History ledger as Search domain', () => {
    expect(CANONICAL_SEARCH_ACTIONS.every((a) => a.title !== 'Баланс телефона')).toBe(true);
  });

  it('remember promotes recent and prototype reset restores seed', () => {
    useLegacySearchStore.getState().remember('Открыть карту');
    expect(useLegacySearchStore.getState().recent[0]).toBe('Открыть карту');
    useLegacySearchStore.getState().setQuery('x');
    useMockStore.getState().resetToCanonical();
    expect(useLegacySearchStore.getState().query).toBe('');
    expect(useLegacySearchStore.getState().recent).toEqual(CANONICAL_RECENT_QUERIES);
  });
});
