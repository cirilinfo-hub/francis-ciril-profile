import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { MotionService } from '../../../core/services/motion.service';
import { ThemeService } from '../../../core/services/theme.service';

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
}

/** Lightweight floating-particle canvas. Pauses off-screen and renders a still frame under reduced motion. */
@Component({
  selector: 'app-particles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  styles: `
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
  template: `<canvas #canvas></canvas>`,
})
export class Particles {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private rgb = '129, 140, 248';
  private redraw: () => void = () => undefined;

  constructor() {
    effect(() => {
      this.theme.mode();
      queueMicrotask(() => {
        this.rgb =
          getComputedStyle(this.host).getPropertyValue('--particle-rgb').trim() || this.rgb;
        this.redraw();
      });
    });

    afterNextRender(() => this.start());
  }

  private start(): void {
    const canvas = this.canvas().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = this.host.clientWidth;
      h = this.host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, Math.max(24, (w * h) / 22000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.3 - 0.05,
        a: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.rgb}, ${p.a})`;
        ctx.fill();
      }
    };

    const tick = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
      }
      draw();
      frame = requestAnimationFrame(tick);
    };

    this.redraw = draw;
    resize();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(this.host);

    let io: IntersectionObserver | undefined;
    if (!this.motion.reduced && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      });
      io.observe(this.host);
    }

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      io?.disconnect();
    });
  }
}
