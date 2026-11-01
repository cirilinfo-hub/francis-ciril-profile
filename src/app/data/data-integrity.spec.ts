import { PROFILE } from '../core/configuration/profile.config';
import { iconExists } from '../shared/icons/app-icon';
import { techIcon } from '../shared/icons/tech-icon.map';
import { ABOUT_FOCUS, COMPETENCIES, STATS } from './about.data';
import { ACHIEVEMENTS } from './achievements.data';
import { ARCHITECTURE_LAYERS, ARCHITECTURE_TOPICS, ECOSYSTEM_STEPS } from './architecture.data';
import { EDUCATION } from './education.data';
import { EXPERIENCE } from './experience.data';
import { NAV_ITEMS } from './nav.data';
import { PROJECTS } from './projects.data';
import { SKILL_GROUPS } from './skills.data';

const defined = (x: string | null): x is string => !!x;

describe('portfolio data', () => {
  it('only references icons that exist', () => {
    const names = [
      ...NAV_ITEMS.map((i) => i.icon),
      ...ABOUT_FOCUS.map((i) => i.icon),
      ...STATS.map((i) => i.icon),
      ...COMPETENCIES.flatMap((c) => [c.icon, ...c.items.map((i) => i.icon)]),
      ...SKILL_GROUPS.flatMap((g) => [g.icon, ...g.skills.map((s) => s.icon)]),
      ...PROJECTS.map((p) => p.icon),
      ...ARCHITECTURE_TOPICS.map((t) => t.icon),
      ...ARCHITECTURE_LAYERS.flatMap((l) => l.nodes.map((n) => n.icon)),
      ...ECOSYSTEM_STEPS.map((s) => s.icon),
      ...ACHIEVEMENTS.map((a) => a.icon),
      ...PROFILE.social.map((s) => s.icon),
      ...PROJECTS.flatMap((p) => p.stack.map((t) => techIcon(t)).filter(defined)),
      ...EXPERIENCE.flatMap((e) => e.technologies.map((t) => techIcon(t)).filter(defined)),
      ...['sun', 'moon', 'menu', 'x', 'download', 'send', 'github', 'mail', 'phone', 'map-pin'],
      ...['chevron-down', 'chevron-up', 'arrow-up-right', 'calendar', 'building-2', 'briefcase'],
      ...['info', 'lock', 'circle-check', 'circle-alert', 'award', 'graduation-cap'],
    ];
    // 'linkedin' has no glyph in the generated set on purpose: the UI renders an "in" monogram for it.
    const missing = names.filter((n) => n !== 'linkedin' && !iconExists(n));
    expect(missing).toEqual([]);
  });

  it('has unique ids', () => {
    for (const list of [EXPERIENCE, PROJECTS, ACHIEVEMENTS, EDUCATION, ARCHITECTURE_TOPICS]) {
      const ids = list.map((x) => x.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('keeps the verified headline facts from the résumé', () => {
    expect(EXPERIENCE).toHaveLength(6);
    expect(PROJECTS).toHaveLength(6);
    expect(EDUCATION).toHaveLength(3);
    expect(STATS.map((s) => s.value)).toEqual([18, 6, 13, 7]);
    expect(SKILL_GROUPS.flatMap((g) => g.skills.filter((s) => s.primary).map((s) => s.name))).toEqual([
      'Angular (2–21)',
      'React',
      'TypeScript',
    ]);
  });

  it('orders experience newest first and every end is after its start', () => {
    for (const job of EXPERIENCE) if (job.end) expect(job.end >= job.start).toBe(true);
    const starts = EXPERIENCE.map((j) => j.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  it('never fabricates education institutions or grades', () => {
    expect(EDUCATION.every((e) => !e.institution && !e.grade)).toBe(true);
  });
});
