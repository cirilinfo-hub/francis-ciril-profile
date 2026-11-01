import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  styles: `
    :host {
      display: block;
      margin-bottom: clamp(2rem, 4vw, 3rem);
    }
    .eyebrow {
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent-2);
      margin: 0 0 0.6rem;
    }
    h2 {
      font-family: var(--font-display);
      font-size: clamp(1.9rem, 4vw, 2.9rem);
      line-height: 1.12;
      margin: 0;
      letter-spacing: -0.02em;
    }
    p.lead {
      margin: 0.9rem 0 0;
      max-width: 62ch;
      color: var(--text-muted);
      font-size: 1.05rem;
    }
    :host(.center) {
      text-align: center;
    }
    :host(.center) p.lead {
      margin-inline: auto;
    }
  `,
  template: `
    <div appReveal>
      <p class="eyebrow">{{ eyebrow() }}</p>
      <h2 [id]="headingId()"><span class="gradient-text">{{ title() }}</span></h2>
      @if (lead()) {
        <p class="lead">{{ lead() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input('');
  readonly headingId = input('');
}
