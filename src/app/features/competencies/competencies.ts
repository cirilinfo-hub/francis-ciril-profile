import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { COMPETENCIES } from '../../data/about.data';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { AppIcon } from '../../shared/icons/app-icon';

@Component({
  selector: 'app-competencies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, AppIcon, RevealDirective, TiltDirective],
  templateUrl: './competencies.html',
  styleUrl: './competencies.scss',
})
export class Competencies {
  protected readonly categories = COMPETENCIES;
  protected readonly activeId = signal(COMPETENCIES[0].id);
  protected readonly active = computed(
    () => this.categories.find((c) => c.id === this.activeId()) ?? this.categories[0],
  );

  protected select(id: string): void {
    this.activeId.set(id);
  }

  /** Arrow-key navigation between tabs, per the WAI-ARIA tabs pattern. */
  protected onKeydown(event: KeyboardEvent, index: number): void {
    const last = this.categories.length - 1;
    const next =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : -1;
    if (next < 0) return;
    event.preventDefault();
    this.select(this.categories[next].id);
    const tabs = (event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLElement>('[role=tab]');
    tabs?.[next]?.focus();
  }
}
