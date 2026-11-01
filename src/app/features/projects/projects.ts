import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, computed, effect, inject, signal, viewChild } from '@angular/core';
import type { Project } from '../../core/models/portfolio.models';
import { PROJECTS } from '../../data/projects.data';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { TechBadge } from '../../shared/components/tech-badge/tech-badge';
import { RippleDirective } from '../../shared/directives/ripple.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { AppIcon } from '../../shared/icons/app-icon';

const FRAMEWORKS = ['Angular', 'React'];

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, AppIcon, TechBadge, TiltDirective, RippleDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly all = PROJECTS;
  protected readonly filter = signal('All');
  protected readonly selectedId = signal<string | null>(null);

  protected readonly categories = [
    'All',
    ...FRAMEWORKS,
    ...[...new Set(PROJECTS.flatMap((p) => p.categories))].filter((c) => !FRAMEWORKS.includes(c)),
  ];

  protected readonly visible = computed(() => {
    const f = this.filter();
    return f === 'All' ? this.all : this.all.filter((p) => p.categories.includes(f));
  });

  protected readonly selected = computed<Project | null>(
    () => this.all.find((p) => p.id === this.selectedId()) ?? null,
  );

  protected readonly selectedIndex = computed(() => this.all.findIndex((p) => p.id === this.selectedId()));

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.dialog().nativeElement;
      // A click whose target is the <dialog> itself landed on the backdrop.
      const onClick = (event: MouseEvent) => {
        if (event.target === el) this.close();
      };
      el.addEventListener('click', onClick);
      destroyRef.onDestroy(() => el.removeEventListener('click', onClick));
    });
    // Drive the native modal from state: showModal() gives focus trapping, Esc handling and a backdrop for free.
    effect(() => {
      const el = this.dialog().nativeElement;
      if (this.selected() && !el.open) el.showModal();
      else if (!this.selected() && el.open) el.close();
    });
  }

  protected setFilter(category: string): void {
    this.filter.set(category);
  }

  protected open(project: Project): void {
    this.selectedId.set(project.id);
  }

  protected close(): void {
    this.selectedId.set(null);
  }

  protected step(delta: number): void {
    const index = this.selectedIndex();
    if (index < 0) return;
    const next = (index + delta + this.all.length) % this.all.length;
    this.selectedId.set(this.all[next].id);
  }
}
