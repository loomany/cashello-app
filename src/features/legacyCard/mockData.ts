/**
 * Deterministic demo card matching late UI 648:20359.
 * Figma sample PAN/CVV are NOT used as live credentials.
 * DEMO / NOT REAL CARD.
 */

export const DEMO_CARD = {
  panMask: '**** **** **** 2343',
  holder: 'ТАНИРБЕРГЕН И.А.',
  validThru: '03/24',
  cvvMask: '***',
} as const;

export const LIMIT_PRESETS: { id: string; value: number | null; label: string }[] = [
  { id: '10k', value: 10_000, label: '10 000₸' },
  { id: '20k', value: 20_000, label: '20 000₸' },
  { id: '50k', value: 50_000, label: '50 000₸' },
  { id: '100k', value: 100_000, label: '100 000₸' },
  { id: '500k', value: 500_000, label: '500 000₸' },
  { id: 'none', value: null, label: 'Без лимита' },
];

export const DEFAULT_LIMIT_CAP = 50_000;

export const CARD_BRIDGES = {
  root: '/legacy/card',
  limits: '/legacy/card/limits',
  pin: '/legacy/card/pin',
  topup: '/legacy/topup',
} as const;

export function formatTengeAmount(value: number): string {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}₸`;
}

export function remainderCopy(remaining: number, cap: number | null): string {
  if (cap == null) {
    return 'Остаток Без лимита';
  }
  return `Остаток ${formatTengeAmount(remaining)}/  ${formatTengeAmount(cap)}`;
}
