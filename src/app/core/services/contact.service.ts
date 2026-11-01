import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PROFILE } from '../configuration/profile.config';

export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

/** `sent` = delivered to a backend; `mailto` = handed to the visitor's email client (not yet sent). */
export type ContactOutcome = 'sent' | 'mailto';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);

  get canSubmit(): boolean {
    return !!environment.contactEndpoint || !!PROFILE.contact.email;
  }

  send(message: ContactMessage): Observable<ContactOutcome> {
    if (environment.contactEndpoint) {
      return this.http
        .post(environment.contactEndpoint, message, { headers: { Accept: 'application/json' } })
        .pipe(map((): ContactOutcome => 'sent'));
    }

    const to = PROFILE.contact.email;
    if (!to) return throwError(() => new Error('No contact channel configured.'));

    const body = `${message.message}\n\n— ${message.name} (${message.email})`;
    const href = `mailto:${to}?subject=${encodeURIComponent(message.subject)}&body=${encodeURIComponent(body)}`;
    this.document.defaultView?.location.assign(href);
    return of<ContactOutcome>('mailto');
  }
}
