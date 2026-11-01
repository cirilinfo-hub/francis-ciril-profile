import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Placeholder shown while a lazy section chunk loads. */
@Component({
  selector: 'app-section-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'status', 'aria-label': 'Loading section' },
  styles: `
    :host {
      display: block;
      min-height: 60vh;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
      margin-top: 2rem;
    }
  `,
  template: `
    <span class="skeleton" style="width: 12rem; height: 1rem"></span>
    <span class="skeleton mt-3" style="width: min(28rem, 80%); height: 2.4rem"></span>
    <div class="grid">
      <span class="skeleton" style="height: 11rem; border-radius: 20px"></span>
      <span class="skeleton" style="height: 11rem; border-radius: 20px"></span>
      <span class="skeleton" style="height: 11rem; border-radius: 20px"></span>
    </div>
  `,
})
export class SectionSkeleton {}
