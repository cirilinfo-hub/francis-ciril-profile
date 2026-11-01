import { TestBed } from '@angular/core/testing';
import { Projects } from './projects';

// jsdom does not implement the modal <dialog> API.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.removeAttribute('open');
  this.dispatchEvent(new Event('close'));
};

describe('Projects', () => {
  async function setup() {
    await TestBed.configureTestingModule({ imports: [Projects] }).compileComponents();
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }
  const chip = (el: HTMLElement, label: string) =>
    [...el.querySelectorAll<HTMLButtonElement>('.chip')].find((b) => b.textContent?.trim() === label)!;

  it('shows all six projects by default', async () => {
    const { el } = await setup();
    expect(el.querySelectorAll('article.card')).toHaveLength(6);
  });

  it('filters by framework and reflects the pressed state', async () => {
    const { fixture, el } = await setup();
    chip(el, 'React').click();
    fixture.detectChanges();
    expect(chip(el, 'React').getAttribute('aria-pressed')).toBe('true');
    expect(chip(el, 'All').getAttribute('aria-pressed')).toBe('false');
    expect(el.querySelector('.sr-only')?.textContent).toContain('Showing 1 of 6');
  });

  it('opens the detail dialog for a project', async () => {
    const { fixture, el } = await setup();
    el.querySelector<HTMLButtonElement>('.card .open')!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const dialog = el.querySelector('dialog')!;
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(dialog.textContent).toContain('Architecture highlights');
  });
});
