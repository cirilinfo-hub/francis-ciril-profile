export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

export interface SocialLink {
  readonly id: 'linkedin' | 'github';
  readonly label: string;
  readonly url: string;
  readonly icon: string;
}

export interface ContactDetails {
  readonly email: string;
  readonly phone: string;
  readonly location: string;
}

export interface ProfileConfig {
  readonly name: string;
  readonly initials: string;
  readonly designations: readonly string[];
  readonly tagline: string;
  readonly summary: readonly string[];
  readonly photoUrl: string;
  readonly resumeUrl: string;
  readonly resumeFileName: string;
  readonly contact: ContactDetails;
  readonly social: readonly SocialLink[];
}

export interface Stat {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  /** Resume-backed explanation of what the number means. */
  readonly context: string;
  readonly icon: string;
}

export interface CompetencyItem {
  readonly label: string;
  readonly icon: string;
}

export interface CompetencyCategory {
  readonly id: string;
  readonly title: string;
  readonly blurb: string;
  readonly icon: string;
  readonly items: readonly CompetencyItem[];
}

export interface Skill {
  readonly name: string;
  readonly icon: string;
  readonly primary?: boolean;
}

export interface SkillGroup {
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly skills: readonly Skill[];
}

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly start: string; // ISO yyyy-mm
  readonly end: string | null; // null = present
  readonly location: string;
  readonly summary: string;
  readonly clients?: readonly string[];
  readonly responsibilities: readonly string[];
  readonly technologies: readonly string[];
  readonly achievements: readonly string[];
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly shortName: string;
  readonly client: string;
  readonly clientType: 'client' | 'organization';
  readonly start: string;
  readonly end: string | null;
  readonly durationLabel: string;
  /** Shown in the detail view when a date in the resume needs confirming. */
  readonly dateNote?: string;
  readonly domain: string;
  readonly categories: readonly string[];
  readonly overview: string;
  readonly stack: readonly string[];
  readonly responsibilities: readonly string[];
  readonly architecture: readonly string[];
  readonly accent: string;
  readonly icon: string;
}

export type ArchitectureSource = 'resume' | 'interest';

export interface ArchitectureTopic {
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly description: string;
  readonly source: ArchitectureSource;
  readonly evidence?: string;
}

export interface DiagramNode {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly icon: string;
  readonly source: ArchitectureSource;
}

export interface DiagramLayer {
  readonly id: string;
  readonly title: string;
  readonly nodes: readonly DiagramNode[];
}

export interface Achievement {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly icon: string;
  readonly metric?: { readonly value: number; readonly suffix: string };
}

export interface Education {
  readonly id: string;
  readonly qualification: string;
  readonly institution?: string;
  readonly period?: string;
  readonly grade?: string;
  readonly level: string;
}
