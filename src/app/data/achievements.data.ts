import type { Achievement } from '../core/models/portfolio.models';

export const ACHIEVEMENTS: readonly Achievement[] = [
  { id: 'years', title: 'Years in the software industry', detail: 'A career spanning web design, team leadership, UI architecture and technology expertise.', icon: 'history', metric: { value: 18, suffix: '+' } },
  { id: 'teams', title: 'Developers led and mentored', detail: 'Led frontend teams of five to seven developers across Wipro and Eurofins.', icon: 'users', metric: { value: 7, suffix: '' } },
  { id: 'tavant', title: 'Client projects led at Tavant', detail: 'Defined UI architecture and led frontend development across 13 client projects.', icon: 'folder-kanban', metric: { value: 13, suffix: '' } },
  { id: 'perf', title: 'Faster page loads', detail: 'Improved page load performance by 20% through UI optimization and code enhancements.', icon: 'gauge', metric: { value: 20, suffix: '%' } },
  { id: 'delivery', title: 'Enterprise Angular & React delivery', detail: 'Delivered enterprise applications for Eurofins, Cisco, Intel, Visa and Transaction Data Systems.', icon: 'rocket' },
  { id: 'components', title: 'Reusable frontend components', detail: 'Developed reusable components and migrated legacy assets into component libraries.', icon: 'component' },
  { id: 'architecture', title: 'Technology & architecture decisions', detail: 'Contributed to technology selection, solution design and architecture decisions.', icon: 'compass' },
  { id: 'mentoring', title: 'Technical reviews & mentoring', detail: 'Conducted code and technical reviews and mentored frontend developers.', icon: 'git-pull-request' },
  { id: 'a11y', title: 'Accessibility & frontend quality', detail: 'Improved accessibility through WCAG audits and remediation, and reliability through architectural optimization.', icon: 'accessibility' },
  { id: 'modernization', title: 'Enterprise modernization', detail: 'Supported frontend modernization, including migration of a .NET-based application toward Angular.', icon: 'refresh-cw' },
];
