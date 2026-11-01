import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';

/** Material-style click ripple for buttons and links. */
@Directive({ selector: '[appRipple]' })
export class RippleDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.el.classList.add('ripple-host');
    afterNextRender(() => {
      if (this.motion.reduced) return;
      const onDown = (e: PointerEvent) => {
        const r = this.el.getBoundingClientRect();
        const size = Math.max(r.width, r.height) * 2;
        const dot = document.createElement('span');
        dot.className = 'ripple';
        dot.style.width = dot.style.height = `${size}px`;
        dot.style.left = `${e.clientX - r.left - size / 2}px`;
        dot.style.top = `${e.clientY - r.top - size / 2}px`;
        dot.addEventListener('animationend', () => dot.remove(), { once: true });
        this.el.appendChild(dot);
      };
      this.el.addEventListener('pointerdown', onDown);
      this.destroyRef.onDestroy(() => this.el.removeEventListener('pointerdown', onDown));
    });
  }
}
