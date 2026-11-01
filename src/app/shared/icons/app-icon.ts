import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BRAND_ICONS, LUCIDE_ICONS } from './icon-data';

/** Renders a Lucide stroke icon or a brand glyph by name. Unknown names render nothing. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.width.px]': 'size()', '[style.height.px]': 'size()', 'aria-hidden': 'true' },
  styles: `
    :host {
      display: inline-flex;
      flex: none;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `,
  template: `
    @if (brandPath(); as d) {
      <svg viewBox="0 0 24 24" fill="currentColor" focusable="false"><path [attr.d]="d" /></svg>
    } @else if (lucideMarkup(); as markup) {
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        focusable="false"
        [innerHTML]="markup"
      ></svg>
    }
  `,
})
export class AppIcon {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<string>();
  readonly size = input(20);

  protected readonly brandPath = computed(() => BRAND_ICONS[this.name()] ?? null);
  protected readonly lucideMarkup = computed<SafeHtml | null>(() => {
    const markup = LUCIDE_ICONS[this.name()];
    // Markup comes from the build-time generated icon set, never from user input.
    return markup ? this.sanitizer.bypassSecurityTrustHtml(markup) : null;
  });
}

export function iconExists(name: string): boolean {
  return name in BRAND_ICONS || name in LUCIDE_ICONS;
}
