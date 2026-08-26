import { formatMajorNumber, formatMoney } from '@/lib/formatMoney';

describe('formatMoney', () => {
  it('groups thousands and keeps two decimals', () => {
    expect(formatMajorNumber(124_560_000)).toBe('1 245 600.00');
    expect(formatMoney(124_560_000, 'KZT')).toBe('1 245 600.00 ₸');
    expect(formatMoney(82_050, 'USD')).toBe('$820.50');
    expect(formatMoney(-860_000, 'KZT')).toBe('−8 600.00 ₸');
    expect(formatMoney(234_000, 'BONUS')).toBe('2 340.00 Б');
    expect(formatMoney(115_000_000, 'KZT', true)).toBe('1 150 000 ₸');
    expect(formatMoney(21_000, 'USD', true)).toBe('$210');
  });
});
