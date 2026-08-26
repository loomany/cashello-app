import type { MoneyUnit } from '@/types/domain';

function groupInt(intPart: string): string {
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function currencySymbol(unit: MoneyUnit): string {
  if (unit === 'USD') return '$';
  if (unit === 'BONUS') return 'Б';
  if (unit === 'RUB') return '₽';
  return '₸';
}

export function formatMajorNumber(amountMinor: number, compact = false): string {
  const sign = amountMinor < 0 ? '−' : '';
  const abs = Math.abs(amountMinor);
  if (compact && abs % 100 === 0) {
    return `${sign}${groupInt(String(abs / 100))}`;
  }
  const major = (abs / 100).toFixed(2);
  const [intPart, fraction] = major.split('.');
  return `${sign}${groupInt(intPart ?? '0')}.${fraction ?? '00'}`;
}

export function formatMoney(amountMinor: number, unit: MoneyUnit, compact = false): string {
  const amount = formatMajorNumber(amountMinor, compact);
  if (unit === 'USD') {
    const negative = amount.startsWith('−');
    const body = negative ? amount.slice(1) : amount;
    return `${negative ? '−' : ''}${currencySymbol(unit)}${body}`;
  }
  return `${amount} ${currencySymbol(unit)}`;
}

export function maskedMoney(unit: MoneyUnit): string {
  const symbol = currencySymbol(unit);
  if (unit === 'USD') return `${symbol} ••••`;
  return `•••• ${symbol}`;
}

export function currencyLabel(unit: MoneyUnit): string {
  if (unit === 'BONUS') return 'Bonus';
  return unit;
}
