import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { SKILL_GROUPS } from '../../data/skills.data';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { AppIcon } from '../../shared/icons/app-icon';

type SkillFilter = 'all' | 'primary' | string;

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, AppIcon, RevealDirective, TiltDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
  protected readonly filter = signal<SkillFilter>('all');

  protected readonly featured = [
    { name: 'Angular', note: 'Versions 2 through 21', icon: 'angular' },
    { name: 'React', note: 'With Redux', icon: 'react' },
    { name: 'TypeScript', note: 'Typed, maintainable UI code', icon: 'typescript' },
    { name: 'Front-End Architecture', note: 'Design systems & reusable components', icon: 'layers' },
  ];

  protected readonly filters = [
    { id: 'all', label: 'All' },
    { id: 'primary', label: 'Primary expertise' },
    ...SKILL_GROUPS.map((g) => ({ id: g.id, label: g.title })),
  ];

  /** Groups to render with the skills that match the active filter. */
  protected readonly visible = computed(() => {
    const f = this.filter();
    if (f === 'all') return this.groups;
    if (f === 'primary') {
      return this.groups
        .map((g) => ({ ...g, skills: g.skills.filter((s) => s.primary) }))
        .filter((g) => g.skills.length);
    }
    return this.groups.filter((g) => g.id === f);
  });

  protected readonly count = computed(() => this.visible().reduce((n, g) => n + g.skills.length, 0));

  protected setFilter(id: SkillFilter): void {
    this.filter.set(id);
  }
}
