import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { MotionService } from '../../../core/services/motion.service';

/** Counts up from 0 to `value` the first time it scrolls into view. */
@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="counter">{{ display() }}</span
    >{{ suffix() }}`,
})
export class Counter {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  readonly value = input.required<number>();
  readonly suffix = input('');
  readonly duration = input(1600);

  protected readonly display = signal(0);

  constructor() {
    afterNextRender(() => {
      const finish = () => this.display.set(this.value());
      if (this.motion.reduced || typeof IntersectionObserver === 'undefined') {
        finish();
        return;
      }
      let frame = 0;
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const target = this.value();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / this.duration());
          const eased = 1 - Math.pow(1 - t, 3);
          this.display.set(Math.round(target * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      });
      observer.observe(this.el);
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }
}
