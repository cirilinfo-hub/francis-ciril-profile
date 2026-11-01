import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  it('toggles the theme and updates the document class', () => {
    const service = TestBed.inject(ThemeService);
    TestBed.tick();
    const start = service.mode();
    service.toggle();
    TestBed.tick();
    expect(service.mode()).not.toBe(start);
    expect(document.documentElement.classList.contains('app-dark')).toBe(service.mode() === 'dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe(service.mode());
  });
});
