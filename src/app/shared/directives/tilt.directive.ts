import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';

/** 3D hover tilt with a moving highlight. Disabled for touch input and reduced motion. */
@Directive({ selector: '[appTilt]' })
export class TiltDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  /** Maximum rotation in degrees. */
  readonly appTilt = input<number | string>(8);

  constructor() {
    afterNextRender(() => {
      if (this.motion.reduced) return;
      const max = Number(this.appTilt()) || 8;
      let frame = 0;

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const r = this.el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          this.el.style.setProperty('--tilt-x', `${((0.5 - y) * max * 2).toFixed(2)}deg`);
          this.el.style.setProperty('--tilt-y', `${((x - 0.5) * max * 2).toFixed(2)}deg`);
          this.el.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
          this.el.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
        });
      };
      const reset = () => {
        cancelAnimationFrame(frame);
        this.el.style.setProperty('--tilt-x', '0deg');
        this.el.style.setProperty('--tilt-y', '0deg');
      };

      this.el.classList.add('tilt');
      this.el.addEventListener('pointermove', onMove);
      this.el.addEventListener('pointerleave', reset);
      this.destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        this.el.removeEventListener('pointermove', onMove);
        this.el.removeEventListener('pointerleave', reset);
      });
    });
  }
}
