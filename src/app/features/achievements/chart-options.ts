import type { EChartsCoreOption } from 'echarts/core';
import type { Experience, Project } from '../../core/models/portfolio.models';
import { formatDuration, monthsBetween } from '../../core/utils/date.utils';
import type { ThemeMode } from '../../core/services/theme.service';

interface Palette {
  text: string;
  muted: string;
  grid: string;
  accent: string;
  accent2: string;
  tooltipBg: string;
}

const PALETTES: Record<ThemeMode, Palette> = {
  light: { text: '#0f172a', muted: '#475569', grid: 'rgba(30,41,90,.12)', accent: '#4f46e5', accent2: '#0891b2', tooltipBg: '#ffffff' },
  dark: { text: '#eef2ff', muted: '#a7b2d1', grid: 'rgba(148,163,255,.16)', accent: '#818cf8', accent2: '#67e8f9', tooltipBg: '#111a35' },
};

const SHORT_NAMES: Record<string, string> = {
  eurofins: 'Eurofins',
  wipro: 'Wipro',
  tavant: 'Tavant',
  'web-originate': 'Web Originate',
  'ocean-pages': 'Ocean Pages',
  scubez: 'Scubez',
};

function base(p: Palette): EChartsCoreOption {
  return {
    textStyle: { fontFamily: 'Inter, system-ui, sans-serif', color: p.muted },
    aria: { enabled: true },
    tooltip: {
      backgroundColor: p.tooltipBg,
      borderColor: p.grid,
      textStyle: { color: p.text },
    },
  };
}

/** Time spent at each organization, oldest first. Derived from the dated experience entries. */
export function tenureOption(jobs: readonly Experience[], mode: ThemeMode): EChartsCoreOption {
  const p = PALETTES[mode];
  const ordered = [...jobs].reverse();
  const months = ordered.map((j) => monthsBetween(j.start, j.end));

  return {
    ...base(p),
    grid: { left: 8, right: 24, top: 12, bottom: 8, containLabel: true },
    tooltip: {
      ...(base(p)['tooltip'] as object),
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: unknown) => {
        const item = (params as { dataIndex: number }[])[0];
        const job = ordered[item.dataIndex];
        return `<strong>${SHORT_NAMES[job.id]}</strong><br>${job.role}<br>${formatDuration(months[item.dataIndex])}`;
      },
    },
    xAxis: {
      type: 'value',
      name: 'Years',
      nameTextStyle: { color: p.muted },
      axisLabel: { color: p.muted },
      splitLine: { lineStyle: { color: p.grid } },
    },
    yAxis: {
      type: 'category',
      data: ordered.map((j) => SHORT_NAMES[j.id]),
      axisLabel: { color: p.text },
      axisLine: { lineStyle: { color: p.grid } },
    },
    series: [
      {
        type: 'bar',
        data: months.map((m) => +(m / 12).toFixed(1)),
        barWidth: 18,
        itemStyle: {
          borderRadius: [0, 9, 9, 0],
          color: {
            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [{ offset: 0, color: p.accent }, { offset: 1, color: p.accent2 }],
          },
        },
        label: { show: true, position: 'right', color: p.text, formatter: '{c} yrs' },
      },
    ],
  };
}

/** Angular major version used by each Angular project, ordered by project start. */
export function angularJourneyOption(projects: readonly Project[], mode: ThemeMode): EChartsCoreOption {
  const p = PALETTES[mode];
  const points = projects
    .map((proj) => {
      const match = proj.stack.map((s) => /^Angular (\d+)$/.exec(s)).find(Boolean);
      return match ? { name: proj.shortName, start: proj.start, version: Number(match[1]) } : null;
    })
    .filter((x): x is { name: string; start: string; version: number } => x !== null)
    .sort((a, b) => a.start.localeCompare(b.start));

  return {
    ...base(p),
    grid: { left: 8, right: 28, top: 28, bottom: 8, containLabel: true },
    tooltip: {
      ...(base(p)['tooltip'] as object),
      trigger: 'axis',
      formatter: (params: unknown) => {
        const item = (params as { dataIndex: number }[])[0];
        const pt = points[item.dataIndex];
        return `<strong>${pt.name}</strong><br>Angular ${pt.version}<br>Started ${pt.start}`;
      },
    },
    xAxis: {
      type: 'category',
      data: points.map((pt) => pt.name),
      axisLabel: { color: p.text, interval: 0 },
      axisLine: { lineStyle: { color: p.grid } },
    },
    yAxis: {
      type: 'value',
      name: 'Angular version',
      min: 6,
      nameTextStyle: { color: p.muted },
      axisLabel: { color: p.muted },
      splitLine: { lineStyle: { color: p.grid } },
    },
    series: [
      {
        type: 'line',
        data: points.map((pt) => pt.version),
        step: 'end',
        symbol: 'circle',
        symbolSize: 12,
        lineStyle: { width: 3, color: p.accent },
        itemStyle: { color: p.accent2, borderColor: p.accent, borderWidth: 2 },
        areaStyle: { color: p.accent, opacity: 0.1 },
        label: { show: true, position: 'top', color: p.text, formatter: 'v{c}' },
      },
    ],
  };
}
