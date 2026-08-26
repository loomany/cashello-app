/** Local calendar helpers for History date filter (YYYY-MM-DD, local noon). */

const MONTHS_RU = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
] as const;

/** Genitive month names for list day headers: «26.августа 2026». */
const MONTHS_RU_GENITIVE = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
] as const;

export const WEEKDAYS_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const;

export function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y!, m! - 1, d!, 12, 0, 0, 0);
}

export function formatDateRu(key: string): string {
  const d = parseDateKey(key);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${d.getFullYear()}`;
}

/** Centered list day header, e.g. «26 августа 2026». */
export function formatHistoryDayHeader(key: string): string {
  const d = parseDateKey(key);
  return `${d.getDate()} ${MONTHS_RU_GENITIVE[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatHistoryDateLabel(from: string | null, to: string | null): string {
  if (!from && !to) return 'Выбрать даты';
  if (from && (!to || to === from)) return formatDateRu(from);
  if (from && to) return `${formatDateRu(from)} — ${formatDateRu(to)}`;
  return formatDateRu(to!);
}

export function monthTitle(year: number, monthIndex: number): string {
  return `${MONTHS_RU[monthIndex]} ${year}`;
}

export function shiftMonth(year: number, monthIndex: number, delta: number): { year: number; monthIndex: number } {
  const d = new Date(year, monthIndex + delta, 1);
  return { year: d.getFullYear(), monthIndex: d.getMonth() };
}

/** Monday-first calendar cells for a month (null = empty pad). */
export function buildMonthGrid(year: number, monthIndex: number): (string | null)[] {
  const first = new Date(year, monthIndex, 1, 12);
  // JS: 0=Sun … 6=Sat → Monday-first index 0..6
  const mondayIndex = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (string | null)[] = [];
  for (let i = 0; i < mondayIndex; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(toDateKey(new Date(year, monthIndex, day, 12)));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function normalizeRange(a: string, b: string): { from: string; to: string } {
  return a <= b ? { from: a, to: b } : { from: b, to: a };
}

export function dayInRange(day: string, from: string | null, to: string | null): boolean {
  if (!from || !to) return false;
  return day >= from && day <= to;
}

export function opDayKey(isoCreatedAt: string): string {
  return isoCreatedAt.slice(0, 10);
}
