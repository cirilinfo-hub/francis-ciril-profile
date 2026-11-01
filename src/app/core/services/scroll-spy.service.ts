import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { MotionService } from './motion.service';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly document = inject(DOCUMENT);
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);
  private observer?: IntersectionObserver;

  private readonly _active = signal('home');
  readonly active = this._active.asReadonly();

  /** Start tracking the given section ids; the section crossing the viewport's upper-middle becomes active. */
  track(ids: readonly string[]): void {
    this.observer?.disconnect();
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this._active.set(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    for (const id of ids) {
      const el = this.document.getElementById(id);
      if (el) this.observer.observe(el);
    }
    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  scrollTo(id: string): void {
    const view = this.document.defaultView;
    const el = this.document.getElementById(id);
    if (!el || !view) return;

    const margin = parseFloat(view.getComputedStyle(el).scrollMarginTop) || 0;
    const offsetTop = () => el.getBoundingClientRect().top - margin;

    view.scrollTo({ top: view.scrollY + offsetTop(), behavior: this.motion.scrollBehavior });
    // Deferred sections can change height while we scroll; once movement stops, correct any drift once.
    const settle = () => {
      const drift = offsetTop();
      if (Math.abs(drift) > 8) view.scrollTo({ top: view.scrollY + drift, behavior: 'auto' });
    };
    if ('onscrollend' in view) view.addEventListener('scrollend', settle, { once: true });
    else setTimeout(settle, 1000);

    this._active.set(id);
    view.history.replaceState(null, '', `#${id}`);
    // Keep keyboard focus order sensible after an in-page jump.
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
}
