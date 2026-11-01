import { EDUCATION } from '../../data/education.data';
import { EXPERIENCE } from '../../data/experience.data';
import { PROJECTS } from '../../data/projects.data';
import { SKILL_GROUPS } from '../../data/skills.data';
import { PROFILE } from '../configuration/profile.config';
import { formatRange } from '../utils/date.utils';

const esc = (value: string): string =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Builds a print-ready résumé page from the centralized portfolio data. */
export function buildResumeHtml(): string {
  const { contact } = PROFILE;
  const contactLine = [contact.email, contact.phone, contact.location].filter(Boolean).map(esc).join(' · ');

  const experience = EXPERIENCE.map(
    (e) => `<section>
      <h3>${esc(e.role)} — ${esc(e.company)}</h3>
      <p class="meta">${esc(formatRange(e.start, e.end))} · ${esc(e.location)}</p>
      <ul>${e.responsibilities.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
    </section>`,
  ).join('');

  const skills = SKILL_GROUPS.map(
    (g) => `<p><strong>${esc(g.title)}:</strong> ${g.skills.map((s) => esc(s.name)).join(', ')}</p>`,
  ).join('');

  const projects = PROJECTS.map(
    (p) => `<p><strong>${esc(p.title)}</strong> — ${esc(p.client)} (${esc(p.durationLabel)})<br>${esc(
      p.overview,
    )}<br><em>${p.stack.map(esc).join(', ')}</em></p>`,
  ).join('');

  const education = EDUCATION.map(
    (e) =>
      `<li>${esc(e.qualification)}${e.period ? ` (${esc(e.period)})` : ''}${
        e.institution ? ` — ${esc(e.institution)}` : ''
      }</li>`,
  ).join('');

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(PROFILE.name)} — Résumé</title>
<style>
  body{font:14px/1.5 system-ui,Segoe UI,Arial,sans-serif;color:#111;max-width:820px;margin:32px auto;padding:0 24px}
  h1{margin:0;font-size:28px} h2{border-bottom:2px solid #4f46e5;padding-bottom:4px;margin-top:28px;font-size:16px;text-transform:uppercase;letter-spacing:.06em;color:#4f46e5}
  h3{margin:14px 0 0;font-size:14px} .meta{margin:0;color:#555} ul{margin:6px 0 0;padding-left:20px}
  .sub{color:#333;margin:4px 0} @media print{body{margin:0}}
</style></head><body>
<h1>${esc(PROFILE.name)}</h1>
<p class="sub">${PROFILE.designations.map(esc).join(' | ')}</p>
${contactLine ? `<p class="meta">${contactLine}</p>` : ''}
<h2>Profile</h2>${PROFILE.summary.map((s) => `<p>${esc(s)}</p>`).join('')}
<h2>Experience</h2>${experience}
<h2>Projects</h2>${projects}
<h2>Technical Skills</h2>${skills}
<h2>Education</h2><ul>${education}</ul>
<script>window.addEventListener('load',function(){setTimeout(function(){window.print()},250)})</script>
</body></html>`;
}
