import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';

/** Fades/slides an element in once it scrolls into view. `appReveal` takes a stagger delay in ms. */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  readonly appReveal = input<number | string>(0);

  constructor() {
    this.el.classList.add('reveal');
    afterNextRender(() => {
      const delay = Number(this.appReveal()) || 0;
      if (delay) this.el.style.transitionDelay = `${delay}ms`;

      if (this.motion.reduced || typeof IntersectionObserver === 'undefined') {
        this.el.classList.add('is-visible');
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.el.classList.add('is-visible');
            observer.disconnect();
            // Drop the stagger delay afterwards so hover transitions respond instantly.
            setTimeout(() => (this.el.style.transitionDelay = ''), delay + 800);
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      );
      observer.observe(this.el);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
