/** Maps technology display names (as used in the data files) to icon names. First matching prefix wins. */
const RULES: readonly (readonly [RegExp, string])[] = [
  [/^angularjs/i, 'file-code'],
  [/^angular material/i, 'materialdesign'],
  [/^angular/i, 'angular'],
  [/^react/i, 'react'],
  [/^redux/i, 'redux'],
  [/^typescript/i, 'typescript'],
  [/^javascript/i, 'javascript'],
  [/^html/i, 'html5'],
  [/^css/i, 'css3'],
  [/^(scss|sass)/i, 'sass'],
  [/^less/i, 'less'],
  [/^jquery/i, 'jquery'],
  [/^node/i, 'nodejs'],
  [/^\.net/i, 'dotnet'],
  [/^java spring/i, 'spring'],
  [/^java/i, 'java'],
  [/^jest/i, 'jest'],
  [/^nvd3/i, 'chart-column'],
  [/^datatables/i, 'file-spreadsheet'],
  [/^ng select/i, 'filter'],
  [/^rest/i, 'network'],
  [/^photoshop/i, 'paintbrush'],
  [/^visa angular/i, 'angular'],
];

export function techIcon(name: string): string | null {
  return RULES.find(([re]) => re.test(name))?.[1] ?? null;
}
