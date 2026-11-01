import type { NavItem } from '../core/models/portfolio.models';

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'Home', icon: 'sparkles' },
  { id: 'about', label: 'About', icon: 'user-round' },
  { id: 'skills', label: 'Skills', icon: 'layers' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'projects', label: 'Projects', icon: 'folder-kanban' },
  { id: 'architecture', label: 'Architecture', icon: 'network' },
  { id: 'achievements', label: 'Achievements', icon: 'trophy' },
  { id: 'education', label: 'Education', icon: 'graduation-cap' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
];
