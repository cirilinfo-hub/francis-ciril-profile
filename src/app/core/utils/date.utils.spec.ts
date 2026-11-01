import { formatDuration, formatMonth, formatRange, monthsBetween } from './date.utils';

describe('date.utils', () => {
  it('formats months and ranges', () => {
    expect(formatMonth('2022-12')).toBe('Dec 2022');
    expect(formatRange('2019-07', '2022-12')).toBe('Jul 2019 – Dec 2022');
    expect(formatRange('2022-12', null)).toBe('Dec 2022 – Present');
  });

  it('counts months inclusively', () => {
    expect(monthsBetween('2007-06', '2009-02')).toBe(21);
    expect(monthsBetween('2022-12', null, new Date(2026, 10, 1))).toBe(48);
  });

  it('formats durations', () => {
    expect(formatDuration(21)).toBe('1 yr 9 mos');
    expect(formatDuration(24)).toBe('2 yrs');
    expect(formatDuration(1)).toBe('1 mo');
  });
});
