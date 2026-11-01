import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { PROFILE } from '../configuration/profile.config';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  applyDefaults(): void {
    const pageTitle = `${PROFILE.name} | Front-End Architect & Angular Architect`;
    const description =
      'Portfolio of Francis Ciril Arulsamy — Front-End Architect with 18+ years building scalable Angular and React platforms, UI design systems and reusable components for enterprise clients.';
    const url = environment.siteUrl;

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'author', content: PROFILE.name });
    this.meta.updateTag({ property: 'og:type', content: 'profile' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: `${url}/images/og-card.svg` });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    this.setCanonical(url);
    this.setStructuredData(description, url);
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private setStructuredData(description: string, url: string): void {
    const id = 'ld-person';
    this.document.getElementById(id)?.remove();
    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PROFILE.name,
      jobTitle: 'Front-End Architect',
      description,
      url,
      address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
    });
    this.document.head.appendChild(script);
  }
}
