import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AppIcon } from '../../icons/app-icon';
import { techIcon } from '../../icons/tech-icon.map';

@Component({
  selector: 'app-tech-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppIcon],
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.28rem 0.7rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--text);
      background: var(--chip-bg);
      border: 1px solid var(--border);
      transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        background 0.2s ease;
    }
    :host(:hover) {
      transform: translateY(-2px);
      border-color: var(--accent);
      background: var(--chip-bg-hover);
    }
  `,
  template: `
    @if (icon(); as name) {
      <app-icon [name]="name" [size]="14" />
    }
    {{ name() }}
  `,
})
export class TechBadge {
  readonly name = input.required<string>();
  protected readonly icon = computed(() => techIcon(this.name()));
}
