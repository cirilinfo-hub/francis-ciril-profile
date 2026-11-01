import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MotionService } from '../../../core/services/motion.service';

/** Soft radial glow that trails the mouse pointer. Mouse-only and disabled under reduced motion. */
@Component({
  selector: 'app-cursor-glow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.4s ease;
      background: radial-gradient(
        520px circle at var(--cx, 50%) var(--cy, 50%),
        var(--glow-color),
        transparent 65%
      );
    }
    :host(.active) {
      opacity: 1;
    }
  `,
  template: '',
})
export class CursorGlow {
  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const fine = this.document.defaultView?.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (this.motion.reduced || !fine) return;

      const host = this.host;
      let frame = 0;

      const onMove = (e: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          host.style.setProperty('--cx', `${e.clientX}px`);
          host.style.setProperty('--cy', `${e.clientY}px`);
          host.classList.add('active');
        });
      };
      const onLeave = () => host.classList.remove('active');

      this.document.addEventListener('pointermove', onMove, { passive: true });
      this.document.documentElement.addEventListener('pointerleave', onLeave);
      this.destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        this.document.removeEventListener('pointermove', onMove);
        this.document.documentElement.removeEventListener('pointerleave', onLeave);
      });
    });
  }
}
