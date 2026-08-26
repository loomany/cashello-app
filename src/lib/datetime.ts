const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function formatActivityTime(iso: string, now = new Date()): string {
  const date = new Date(iso);
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  if (sameDay) {
    return `сегодня ${time}`;
  }
  const month = months[date.getMonth()] ?? '';
  return `${date.getDate()} ${month}, ${time}`;
}
