import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/** Single source of truth for the visitor's reduced-motion preference. */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly query = inject(DOCUMENT).defaultView?.matchMedia?.(
    '(prefers-reduced-motion: reduce)',
  );

  get reduced(): boolean {
    return this.query?.matches ?? false;
  }

  get scrollBehavior(): ScrollBehavior {
    return this.reduced ? 'auto' : 'smooth';
  }
}
