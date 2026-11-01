import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROFILE } from '../../core/configuration/profile.config';
import { ContactOutcome, ContactService } from '../../core/services/contact.service';
import { ResumeService } from '../../core/services/resume.service';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { RippleDirective } from '../../shared/directives/ripple.directive';
import { AppIcon } from '../../shared/icons/app-icon';

type FormState =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'done'; outcome: ContactOutcome }
  | { kind: 'error'; message: string };

const MESSAGES: Record<string, Record<string, string>> = {
  name: {
    required: 'Please enter your name.',
    minlength: 'Your name should be at least 2 characters.',
  },
  email: {
    required: 'Please enter your email address.',
    email: 'That doesn’t look like a valid email address.',
  },
  subject: {
    required: 'Please add a subject.',
    maxlength: 'Keep the subject under 120 characters.',
  },
  message: {
    required: 'Please write a message.',
    minlength: 'Your message should be at least 10 characters.',
    maxlength: 'Please keep the message under 2000 characters.',
  },
};

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, SectionHeading, AppIcon, RevealDirective, RippleDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly contactService = inject(ContactService);
  private readonly resume = inject(ResumeService);

  protected readonly profile = PROFILE;
  protected readonly canSubmit = this.contactService.canSubmit;
  protected readonly state = signal<FormState>({ kind: 'idle' });

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
  });

  protected error(field: keyof typeof MESSAGES): string | null {
    const control = this.form.get(field);
    if (!control || !control.invalid || !(control.touched || control.dirty)) return null;
    const key = Object.keys(control.errors ?? {})[0];
    return MESSAGES[field][key] ?? 'This field is invalid.';
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.state.set({ kind: 'sending' });
    this.contactService.send(this.form.getRawValue()).subscribe({
      next: (outcome) => {
        this.state.set({ kind: 'done', outcome });
        this.form.reset();
      },
      error: (err: Error) => this.state.set({ kind: 'error', message: err.message }),
    });
  }

  protected downloadResume(): void {
    void this.resume.download();
  }
}
