import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from './contact';

interface ContactInternals {
  form: {
    controls: { email: { setValue(v: string): void; markAsTouched(): void } };
    setValue(v: Record<string, string>): void;
  };
  submit(): void;
}

describe('Contact', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideHttpClient(),
        { provide: ContactService, useValue: { canSubmit: true, send: () => of('mailto') } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    return {
      fixture,
      el: fixture.nativeElement as HTMLElement,
      cmp: fixture.componentInstance as unknown as ContactInternals,
    };
  }

  it('shows required errors after a blocked submit', async () => {
    const { fixture, el, cmp } = await setup();
    cmp.submit();
    fixture.detectChanges();
    const errors = [...el.querySelectorAll('.err')].map((e) => e.textContent?.trim());
    expect(errors).toContain('Please enter your name.');
    expect(errors).toContain('Please enter your email address.');
    expect(errors).toContain('Please write a message.');
  });

  it('validates the email format', async () => {
    const { fixture, el, cmp } = await setup();
    cmp.form.controls.email.setValue('not-an-email');
    cmp.form.controls.email.markAsTouched();
    fixture.detectChanges();
    expect(el.querySelector('#c-email-err')?.textContent).toContain('valid email');
  });

  it('says the message has not been sent when it only opens the email client', async () => {
    const { fixture, el, cmp } = await setup();
    cmp.form.setValue({
      name: 'Ada',
      email: 'ada@example.com',
      subject: 'Hi',
      message: 'Hello there, nice portfolio.',
    });
    cmp.submit();
    fixture.detectChanges();
    expect(el.querySelector('.banner.ok')?.textContent).toContain("hasn't been sent");
  });
});
