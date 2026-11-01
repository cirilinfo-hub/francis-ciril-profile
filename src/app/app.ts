import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './core/services/seo.service';
import { ThemeService } from './core/services/theme.service';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { CursorGlow } from './shared/components/cursor-glow/cursor-glow';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer, CursorGlow],
  template: `
    <a class="skip-link" href="#main">Skip to main content</a>
    <app-cursor-glow />
    <app-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: `
    main {
      display: block;
      position: relative;
      z-index: 2;
      outline: none;
    }
  `,
})
export class App {
  constructor() {
    inject(ThemeService); // apply the stored/system theme before first paint of the shell
    inject(SeoService).applyDefaults();
  }
}
