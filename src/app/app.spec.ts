import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  it('renders the shell with skip link, header and footer', async () => {
    await TestBed.configureTestingModule({ imports: [App], providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('a.skip-link')).toBeTruthy();
    expect(el.querySelector('app-header')).toBeTruthy();
    expect(el.querySelector('app-footer')).toBeTruthy();
    expect(el.querySelector('main#main')).toBeTruthy();
  });
});
