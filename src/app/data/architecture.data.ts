import type { ArchitectureTopic, DiagramLayer } from '../core/models/portfolio.models';

/**
 * `resume`   – explicitly supported by the resume.
 * `interest` – an architectural interest/practice that is not claimed as resume experience.
 */
export const ARCHITECTURE_TOPICS: readonly ArchitectureTopic[] = [
  { id: 'angular-enterprise', title: 'Enterprise Angular Architecture', icon: 'angular', source: 'resume', description: 'Scalable Angular 12 and Angular 18 applications for enterprise platforms.', evidence: 'Eurofins · GMA, Assurance IQ' },
  { id: 'react', title: 'React Application Architecture', icon: 'react', source: 'resume', description: 'React solution design and component development for enterprise contact-center software.', evidence: 'Wipro · Cisco PCCE' },
  { id: 'component-libs', title: 'Reusable Component Libraries', icon: 'component', source: 'resume', description: 'Legacy frontend assets migrated into reusable component libraries; reusable widgets in AngularJS, Angular and React.', evidence: 'Eurofins, Tavant' },
  { id: 'design-systems', title: 'UI Design Systems', icon: 'palette', source: 'resume', description: 'Design-system thinking applied to consistent, brand-aligned UI across products.', evidence: 'Profile summary' },
  { id: 'api', title: 'API Integration', icon: 'network', source: 'resume', description: 'REST API and external web-service integration with .NET, Node.js and Java Spring back ends.', evidence: 'All listed projects' },
  { id: 'performance', title: 'Performance Optimization', icon: 'gauge', source: 'resume', description: 'UI optimization and code enhancement that improved page load performance by 20%.', evidence: 'Eurofins' },
  { id: 'caching', title: 'Caching Strategies', icon: 'zap', source: 'resume', description: 'Caching mechanisms implemented to improve responsiveness.', evidence: 'Eurofins' },
  { id: 'a11y', title: 'Accessibility & WCAG', icon: 'accessibility', source: 'resume', description: 'WCAG audits and remediation; web accessibility integrated into enterprise apps.', evidence: 'Eurofins, Wipro' },
  { id: 'i18n', title: 'Internationalization & Localization', icon: 'languages', source: 'resume', description: 'Localization practices introduced and internationalization integrated.', evidence: 'Wipro' },
  { id: 'responsive', title: 'Responsive Design', icon: 'smartphone', source: 'resume', description: 'Responsive, cross-browser-compatible interfaces.', evidence: 'Core competency' },
  { id: 'patterns', title: 'Design Patterns & Dependency Injection', icon: 'blocks', source: 'resume', description: 'Design patterns, dependency injection and asynchronous programming applied as engineering best practice.', evidence: 'Wipro, Eurofins' },
  { id: 'testing', title: 'Automated Testing', icon: 'flask-conical', source: 'resume', description: 'Automated testing to improve workflows; teams guided on Jest and frontend testing.', evidence: 'Wipro, Tavant' },
  { id: 'cicd', title: 'CI/CD Integration', icon: 'git-branch', source: 'resume', description: 'CI/CD listed as a delivery-leadership competency.', evidence: 'Core competency' },
  { id: 'feature-based', title: 'Feature-Based Architecture', icon: 'folder-kanban', source: 'interest', description: 'Organising code by business feature with lazy-loaded routes. Applied in this portfolio.' },
  { id: 'standalone', title: 'Standalone Component Architecture', icon: 'boxes', source: 'interest', description: 'NgModule-free Angular with signals, inject() and OnPush. Applied in this portfolio.' },
  { id: 'mfe', title: 'Micro Frontend Concepts', icon: 'layout-dashboard', source: 'interest', description: 'Independently deployable front-end slices composed into one product.' },
  { id: 'config-ui', title: 'Configuration-Driven UI', icon: 'settings', source: 'interest', description: 'Rendering screens from declarative configuration. This portfolio renders all sections from typed data.' },
  { id: 'auth', title: 'Authentication Integration (JWT & OAuth)', icon: 'key-round', source: 'interest', description: 'Token-based sign-in flows, interceptors and guarded routes.' },
];

export const ARCHITECTURE_LAYERS: readonly DiagramLayer[] = [
  {
    id: 'experience',
    title: 'Experience Layer',
    nodes: [
      { id: 'a11y', title: 'Accessibility', detail: 'WCAG audits and remediation, keyboard support and semantic markup.', icon: 'accessibility', source: 'resume' },
      { id: 'responsive', title: 'Responsive UI', detail: 'Layouts that adapt across devices and are verified across browsers.', icon: 'smartphone', source: 'resume' },
      { id: 'i18n', title: 'i18n / l10n', detail: 'Localization practices and internationalization integrated into the UI.', icon: 'languages', source: 'resume' },
    ],
  },
  {
    id: 'design-system',
    title: 'Design System & Shared Components',
    nodes: [
      { id: 'tokens', title: 'Design Tokens & Styles', detail: 'SCSS/Sass styling consistent with brand guidelines.', icon: 'palette', source: 'resume' },
      { id: 'library', title: 'Reusable Component Library', detail: 'Legacy frontend assets migrated into reusable components (Angular Material based).', icon: 'component', source: 'resume' },
      { id: 'widgets', title: 'Reusable Widgets', detail: 'Widgets built with AngularJS, Angular and React.', icon: 'puzzle', source: 'resume' },
    ],
  },
  {
    id: 'features',
    title: 'Feature Modules',
    nodes: [
      { id: 'feature-based', title: 'Feature-Based Structure', detail: 'Code grouped by business capability and lazy-loaded per route.', icon: 'folder-kanban', source: 'interest' },
      { id: 'standalone', title: 'Standalone Components', detail: 'No NgModules; signals, inject() and OnPush change detection.', icon: 'boxes', source: 'interest' },
      { id: 'mfe', title: 'Micro Frontends', detail: 'Independently deployable slices composed into one product.', icon: 'layout-dashboard', source: 'interest' },
    ],
  },
  {
    id: 'core',
    title: 'Core Services',
    nodes: [
      { id: 'di', title: 'Dependency Injection', detail: 'Services and async programming structured around DI.', icon: 'blocks', source: 'resume' },
      { id: 'cache', title: 'Caching', detail: 'Caching mechanisms to reduce repeat work and speed up screens.', icon: 'zap', source: 'resume' },
      { id: 'auth', title: 'Auth (JWT / OAuth)', detail: 'Token handling via HTTP interceptors and route guards.', icon: 'key-round', source: 'interest' },
    ],
  },
  {
    id: 'integration',
    title: 'Integration & Delivery',
    nodes: [
      { id: 'rest', title: 'REST & External Services', detail: 'Integration with .NET, Node.js and Java Spring back ends.', icon: 'network', source: 'resume' },
      { id: 'testing', title: 'Automated Testing', detail: 'Automated tests and Jest-guided frontend testing practices.', icon: 'flask-conical', source: 'resume' },
      { id: 'cicd', title: 'CI/CD', detail: 'Build, test and release automation for predictable delivery.', icon: 'git-branch', source: 'resume' },
    ],
  },
];

export const ECOSYSTEM_STEPS: readonly { id: string; title: string; detail: string; icon: string }[] = [
  { id: 'legacy', title: 'Legacy Assets', detail: 'Existing page-level markup, styles and scripts that duplicate behaviour across screens.', icon: 'file-code' },
  { id: 'tokens', title: 'Tokens & Styles', detail: 'Shared SCSS/Sass variables and mixins that carry brand guidelines.', icon: 'palette' },
  { id: 'primitives', title: 'UI Primitives', detail: 'Buttons, inputs and layout building blocks, built on Angular Material.', icon: 'blocks' },
  { id: 'composites', title: 'Composite Components', detail: 'Grids, selects and widgets assembled from primitives and reused between features.', icon: 'component' },
  { id: 'apps', title: 'Enterprise Apps', detail: 'Angular and React applications consuming the same reusable library.', icon: 'layout-dashboard' },
];
