import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { EXPERIENCE } from '../../data/experience.data';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { TechBadge } from '../../shared/components/tech-badge/tech-badge';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { AppIcon } from '../../shared/icons/app-icon';
import { DateRangePipe, DurationPipe } from '../../shared/pipes/date-range.pipe';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, AppIcon, TechBadge, RevealDirective, DateRangePipe, DurationPipe],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  protected readonly jobs = EXPERIENCE;
  protected readonly open = signal<ReadonlySet<string>>(new Set([EXPERIENCE[0].id]));
  protected readonly allOpen = computed(() => this.open().size === this.jobs.length);

  protected isOpen(id: string): boolean {
    return this.open().has(id);
  }

  protected toggle(id: string): void {
    this.open.update((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  }

  protected toggleAll(): void {
    this.open.set(this.allOpen() ? new Set() : new Set(this.jobs.map((j) => j.id)));
  }
}
