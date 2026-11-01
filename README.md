# Francis Ciril Arulsamy — Front-End Architect Portfolio

Angular 22 · SCSS design tokens (no commercial UI kit) · Signals · zoneless · OnPush · ECharts · Vitest · Playwright

## Run

```bash
npm install
npm start            # http://localhost:4200
npm run build        # production build -> dist/profile
npm run test:ci      # unit tests (Vitest)
npm run e2e          # Playwright: desktop, tablet, mobile (+ axe WCAG 2.2 AA scan)
npm run lint
```

> Angular CLI 22 needs Node >= 22.22.3 / 24.15. `node@24.17` is a devDependency, so `npm run ...` scripts use it
> automatically even if your global Node is older.

## Things you must fill in

| What | Where |
| --- | --- |
| Résumé PDF | `public/documents/Francis-Ciril-Arulsamy-Resume.pdf` (until present, a print-ready résumé is generated from the data) |
| Contact backend (optional) | `contactEndpoint` in environments; otherwise the form opens the visitor's email client |
| Production URL for canonical/Open Graph | `siteUrl` in `environment.prod.ts` |
| MCA institution/grade, other education details | `src/app/data/education.data.ts` |

## Structure

```
src/app
  core/        configuration, models, services (theme, scroll-spy, seo, resume, contact), utils
  shared/      components (chart, counter, typing, particles, cursor-glow, ...), directives (reveal, tilt, ripple), icons, pipes
  features/    home(hero) · about · competencies · skills · experience · projects · architecture · achievements · education · contact
  layout/      header · navigation · footer
  data/        centralized résumé content (typed)
```

All content lives in `src/app/data`; sections render from it. The home route is lazy-loaded and every section
below the hero is a deferred chunk; ECharts loads only when a chart nears the viewport.

## Data notes (from the supplied résumé)

* PCCE (Cisco) is listed as "February 2022 – Present" in the résumé, which overlaps the Wipro→Eurofins move in Dec 2022; shown as stated with a note — please confirm.
* GMA ends "September 2026" and Assurance IQ "February 2026" while the Eurofins role is "Present"; shown as stated.
* Architecture items not in the résumé (micro frontends, configuration-driven UI, JWT/OAuth, feature-based/standalone) are labelled "Architectural interest".
* SSR/prerendering was not enabled (static SPA with SEO meta in `index.html` + `SeoService`); `og-card.svg` should be replaced by a PNG for social crawlers that don't render SVG.
