import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PROFILE } from '../../core/configuration/profile.config';
import { ResumeService } from '../../core/services/resume.service';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { ThemeService } from '../../core/services/theme.service';
import { RippleDirective } from '../../shared/directives/ripple.directive';
import { AppIcon } from '../../shared/icons/app-icon';
import { Navigation } from '../navigation/navigation';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navigation, AppIcon, RippleDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '[class.scrolled]': 'scrolled()',
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class Header {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly resume = inject(ResumeService);
  protected readonly theme = inject(ThemeService);
  protected readonly spy = inject(ScrollSpyService);

  protected readonly profile = PROFILE;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      const view = this.document.defaultView;
      if (!view) return;
      const update = () => this.scrolled.set(view.scrollY > 24);
      update();
      view.addEventListener('scroll', update, { passive: true });
      this.destroyRef.onDestroy(() => view.removeEventListener('scroll', update));
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  /** Must return void: a `false` result from a template listener would preventDefault() and block Escape elsewhere (e.g. native dialogs). */
  protected onEscape(): void {
    if (this.menuOpen()) this.closeMenu();
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected goHome(event: Event): void {
    event.preventDefault();
    this.spy.scrollTo('home');
    this.closeMenu();
  }

  protected downloadResume(): void {
    void this.resume.download();
    this.closeMenu();
  }
}
