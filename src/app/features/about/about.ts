import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../core/configuration/profile.config';
import { ABOUT_FOCUS, ABOUT_PARAGRAPHS, STATS } from '../../data/about.data';
import { Counter } from '../../shared/components/counter/counter';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { AppIcon } from '../../shared/icons/app-icon';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, Counter, AppIcon, RevealDirective, TiltDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly paragraphs = ABOUT_PARAGRAPHS;
  protected readonly focus = ABOUT_FOCUS;
  protected readonly stats = STATS;
  protected readonly tagline = PROFILE.tagline;
}
