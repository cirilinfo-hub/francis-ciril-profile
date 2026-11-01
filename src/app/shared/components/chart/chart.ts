import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import type { EChartsCoreOption, EChartsType } from 'echarts/core';
import { MotionService } from '../../../core/services/motion.service';

/** Thin, lazy-loading ECharts wrapper. ECharts is only downloaded once the chart approaches the viewport. */
@Component({
  selector: 'app-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      position: relative;
    }
    .canvas {
      width: 100%;
    }
    .skeleton {
      position: absolute;
      inset: 0;
      border-radius: 16px;
    }
  `,
  template: `
    <div
      #host
      class="canvas"
      role="img"
      [attr.aria-label]="ariaLabel()"
      [style.height.px]="height()"
    ></div>
    @if (!ready()) {
      <span class="skeleton" aria-hidden="true"></span>
    }
  `,
})
export class Chart {
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = viewChild.required<ElementRef<HTMLDivElement>>('host');

  readonly option = input.required<EChartsCoreOption>();
  readonly ariaLabel = input.required<string>();
  readonly height = input(320);

  protected readonly ready = signal(false);
  private instance?: EChartsType;

  constructor() {
    effect(() => {
      const option = this.option();
      this.instance?.setOption({ ...option, animation: !this.motion.reduced }, true);
    });

    afterNextRender(() => {
      const el = this.host().nativeElement;
      let resizer: ResizeObserver | undefined;

      const start = async () => {
        const { echarts } = await import('./echarts-setup');
        this.instance = echarts.init(el, undefined, { renderer: 'canvas' });
        this.instance.setOption({ ...this.option(), animation: !this.motion.reduced }, true);
        this.ready.set(true);
        resizer = new ResizeObserver(() => this.instance?.resize());
        resizer.observe(el);
      };

      let io: IntersectionObserver | undefined;
      if (typeof IntersectionObserver === 'undefined') {
        void start();
      } else {
        io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              io?.disconnect();
              void start();
            }
          },
          { rootMargin: '200px' },
        );
        io.observe(el);
      }

      this.destroyRef.onDestroy(() => {
        io?.disconnect();
        resizer?.disconnect();
        this.instance?.dispose();
      });
    });
  }
}
