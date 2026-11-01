import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { PROFILE } from '../configuration/profile.config';
import { buildResumeHtml } from './resume-document';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private readonly document = inject(DOCUMENT);

  /**
   * Downloads the PDF at `PROFILE.resumeUrl` when it exists; otherwise opens a print-ready
   * résumé generated from the portfolio data so the visitor can print or save it as PDF.
   */
  async download(): Promise<void> {
    // Open the fallback tab synchronously so popup blockers treat it as user-initiated.
    const view = this.document.defaultView;
    const fallback = view?.open('', '_blank') ?? null;

    if (await this.pdfExists()) {
      fallback?.close();
      const a = this.document.createElement('a');
      a.href = PROFILE.resumeUrl;
      a.download = PROFILE.resumeFileName;
      this.document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }

    const html = buildResumeHtml();
    if (fallback) {
      fallback.document.open();
      fallback.document.write(html);
      fallback.document.close();
    } else {
      // Popup blocked: fall back to downloading the generated résumé as an HTML file.
      const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
      const a = this.document.createElement('a');
      a.href = url;
      a.download = PROFILE.resumeFileName.replace(/\.pdf$/i, '.html');
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  }

  private async pdfExists(): Promise<boolean> {
    try {
      const res = await fetch(PROFILE.resumeUrl, { method: 'HEAD' });
      // SPA dev servers answer unknown paths with index.html, so check the content type too.
      return res.ok && (res.headers.get('content-type') ?? '').includes('pdf');
    } catch {
      return false;
    }
  }
}
