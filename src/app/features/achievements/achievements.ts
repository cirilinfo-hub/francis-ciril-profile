import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { ACHIEVEMENTS } from '../../data/achievements.data';
import { EXPERIENCE } from '../../data/experience.data';
import { PROJECTS } from '../../data/projects.data';
import { Chart } from '../../shared/components/chart/chart';
import { Counter } from '../../shared/components/counter/counter';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { AppIcon } from '../../shared/icons/app-icon';
import { angularJourneyOption, tenureOption } from './chart-options';

@Component({
  selector: 'app-achievements',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, AppIcon, Counter, Chart, RevealDirective, TiltDirective],
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss',
})
export class Achievements {
  private readonly theme = inject(ThemeService);

  protected readonly achievements = ACHIEVEMENTS;
  protected readonly tenure = computed(() => tenureOption(EXPERIENCE, this.theme.mode()));
  protected readonly journey = computed(() => angularJourneyOption(PROJECTS, this.theme.mode()));
}
