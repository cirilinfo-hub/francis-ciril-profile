import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { MotionService } from '../../../core/services/motion.service';

/** Types and erases each phrase in turn. Falls back to a static phrase under reduced motion. */
@Component({
  selector: 'app-typing-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.aria-label]': 'label()', role: 'text' },
  styles: `
    .caret {
      display: inline-block;
      width: 2px;
      height: 1em;
      margin-left: 3px;
      vertical-align: -0.12em;
      background: currentColor;
      animation: blink 1s steps(2, start) infinite;
    }
    @keyframes blink {
      to {
        visibility: hidden;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .caret {
        animation: none;
      }
    }
  `,
  template: `<span aria-hidden="true">{{ text() }}<span class="caret"></span></span>`,
})
export class TypingText {
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  readonly phrases = input.required<readonly string[]>();
  readonly label = computed(() => this.phrases().join(', '));

  protected readonly text = signal('');

  constructor() {
    afterNextRender(() => {
      const phrases = this.phrases();
      if (this.motion.reduced) {
        this.text.set(phrases.join(' | '));
        return;
      }
      let timer: ReturnType<typeof setTimeout>;
      let index = 0;
      let length = 0;
      let deleting = false;

      const step = () => {
        const phrase = phrases[index];
        length += deleting ? -1 : 1;
        this.text.set(phrase.slice(0, length));
        let delay = deleting ? 35 : 75;
        if (!deleting && length === phrase.length) {
          deleting = true;
          delay = 1700;
        } else if (deleting && length === 0) {
          deleting = false;
          index = (index + 1) % phrases.length;
          delay = 350;
        }
        timer = setTimeout(step, delay);
      };
      timer = setTimeout(step, 400);
      this.destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
