const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Parses an ISO `yyyy-mm` string into a year/month pair (month is 0-based). */
function parse(value: string): { year: number; month: number } {
  const [y, m] = value.split('-').map(Number);
  return { year: y, month: (m ?? 1) - 1 };
}

export function formatMonth(value: string): string {
  const { year, month } = parse(value);
  return `${MONTHS[month]} ${year}`;
}

export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}

/** Whole months from `start` to `end` inclusive of both boundary months. */
export function monthsBetween(start: string, end: string | null, now: Date = new Date()): number {
  const s = parse(start);
  const e = end ? parse(end) : { year: now.getFullYear(), month: now.getMonth() };
  return Math.max(1, (e.year - s.year) * 12 + (e.month - s.month) + 1);
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ') || '1 mo';
}
