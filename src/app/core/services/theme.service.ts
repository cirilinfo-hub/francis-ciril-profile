import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly _mode = signal<ThemeMode>(this.initialMode());
  readonly mode = this._mode.asReadonly();

  constructor() {
    effect(() => {
      const mode = this._mode();
      const root = this.document.documentElement;
      root.classList.toggle('app-dark', mode === 'dark');
      root.setAttribute('data-theme', mode);
      root.style.colorScheme = mode;
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        /* storage unavailable (private mode) – theme still applies for this session */
      }
    });
  }

  toggle(): void {
    this._mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  private initialMode(): ThemeMode {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      /* ignore */
    }
    return this.document.defaultView?.matchMedia?.('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
}
