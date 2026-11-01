import type { CompetencyCategory, Stat } from '../core/models/portfolio.models';

export const ABOUT_PARAGRAPHS: readonly string[] = [
  'I have spent 18+ years in the software industry, growing from a web designer converting Photoshop templates into HTML and CSS to a front-end architect who sets technology direction for enterprise platforms.',
  'My work centres on front-end architecture and UI engineering across Angular and React: scalable, reusable component architecture, UI design systems, enterprise application modernization, and the technology evaluation that sits behind those decisions.',
  'I care as much about how a product behaves as how it looks — performance optimization, accessibility, and responsive design — and about the people building it: mentoring developers, reviewing code, engaging clients and stakeholders, and supporting agile delivery through to production and UAT.',
];

export const ABOUT_FOCUS: readonly { label: string; icon: string }[] = [
  { label: 'Front-End Architecture & UI Engineering', icon: 'layers' },
  { label: 'Angular & React Application Development', icon: 'code-xml' },
  { label: 'Enterprise Application Modernization', icon: 'refresh-cw' },
  { label: 'Scalable, Reusable Component Architecture', icon: 'blocks' },
  { label: 'UI Design Systems', icon: 'palette' },
  { label: 'Technology Evaluation & Selection', icon: 'search-check' },
  { label: 'Performance Optimization', icon: 'gauge' },
  { label: 'Accessibility & Responsive Design', icon: 'accessibility' },
  { label: 'Technical Leadership & Mentoring', icon: 'users' },
  { label: 'Client & Stakeholder Engagement', icon: 'handshake' },
  { label: 'Agile Delivery & Production Support', icon: 'life-buoy' },
];

export const STATS: readonly Stat[] = [
  {
    value: 18,
    suffix: '+',
    label: 'Years of Experience',
    context: 'In the software industry, from web design (2007) to front-end architecture.',
    icon: 'history',
  },
  {
    value: 6,
    suffix: '',
    label: 'Professional Organizations',
    context: 'Scubez Solution, Ocean Pages, Web Originate, Tavant, Wipro and Eurofins.',
    icon: 'building-2',
  },
  {
    value: 13,
    suffix: '+',
    label: 'Client Projects at Tavant',
    context: 'UI architecture defined and front-end development led across 13 client projects.',
    icon: 'folder-kanban',
  },
  {
    value: 7,
    suffix: '',
    label: 'Developers Led',
    context: 'Teams of 5–7 developers: five at Wipro, seven mentored at Eurofins.',
    icon: 'users',
  },
];

export const COMPETENCIES: readonly CompetencyCategory[] = [
  {
    id: 'architecture',
    title: 'Front-End Architecture',
    blurb: 'Designing the structure, standards and technology direction that large UIs grow on.',
    icon: 'compass',
    items: [
      { label: 'UI Architecture', icon: 'layers' },
      { label: 'Technology Evaluation and Selection', icon: 'search-check' },
      { label: 'Solution Design', icon: 'pen-tool' },
      { label: 'UI Design Systems', icon: 'palette' },
      { label: 'Reusable Component Design', icon: 'component' },
      { label: 'UI Modernization and Migration', icon: 'refresh-cw' },
      { label: 'Content Management Systems', icon: 'file-text' },
      { label: 'UX/UI Architecture', icon: 'layout-dashboard' },
    ],
  },
  {
    id: 'quality',
    title: 'Engineering Quality',
    blurb: 'Making interfaces fast, accessible, consistent and dependable across every browser.',
    icon: 'badge-check',
    items: [
      { label: 'Performance Optimization', icon: 'gauge' },
      { label: 'Responsive Design', icon: 'smartphone' },
      { label: 'Cross-Browser Compatibility', icon: 'globe' },
      { label: 'Functional Validation', icon: 'clipboard-check' },
      { label: 'Coding Standards', icon: 'file-code' },
      { label: 'Code Reviews', icon: 'git-pull-request' },
      { label: 'Accessibility', icon: 'accessibility' },
      { label: 'Application Reliability', icon: 'shield-check' },
    ],
  },
  {
    id: 'leadership',
    title: 'Delivery Leadership',
    blurb: 'Owning delivery from planning to production while growing the people doing the work.',
    icon: 'rocket',
    items: [
      { label: 'End-to-End Lifecycle Ownership', icon: 'workflow' },
      { label: 'Team Leadership', icon: 'users' },
      { label: 'Technical Mentoring', icon: 'graduation-cap' },
      { label: 'Client and Stakeholder Engagement', icon: 'handshake' },
      { label: 'Agile/Scrum Delivery', icon: 'refresh-cw' },
      { label: 'Production and UAT Support', icon: 'life-buoy' },
      { label: 'CI/CD', icon: 'git-branch' },
    ],
  },
];
