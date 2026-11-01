import { Pipe, PipeTransform } from '@angular/core';
import { formatDuration, formatRange, monthsBetween } from '../../core/utils/date.utils';

/** `{{ '2022-12' | dateRange: null }}` → "Dec 2022 – Present". */
@Pipe({ name: 'dateRange' })
export class DateRangePipe implements PipeTransform {
  transform(start: string, end: string | null): string {
    return formatRange(start, end);
  }
}

/** `{{ '2022-12' | duration: null }}` → "3 yrs 11 mos". */
@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(start: string, end: string | null): string {
    return formatDuration(monthsBetween(start, end));
  }
}
