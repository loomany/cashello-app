import { resolveHistoryListIcon } from '@/features/legacyHistory/HistoryOpIcon';
import { formatHistoryListAmount, type LegacyHistoryOp } from '@/features/legacyHistory/mockData';
import type { HomeHistoryRow } from '@/features/legacyHome/mockData';

/** Map History ops → Home preview row chrome. */
export function toHomeHistoryRow(op: LegacyHistoryOp): HomeHistoryRow {
  const listIcon = resolveHistoryListIcon(op);
  return {
    id: op.id,
    title: op.directionLabel ?? op.title,
    status: '',
    amount: formatHistoryListAmount(op),
    direction: op.direction,
    tone: op.tone,
    amountEmphasis: true,
    icon: listIcon ?? 'arrow',
  };
}

/** Newest first, capped. */
export function latestHomeHistoryRows(ops: LegacyHistoryOp[], limit = 2): HomeHistoryRow[] {
  return [...ops]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0))
    .slice(0, limit)
    .map(toHomeHistoryRow);
}
