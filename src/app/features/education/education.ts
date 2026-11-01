import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EDUCATION } from '../../data/education.data';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { AppIcon } from '../../shared/icons/app-icon';

@Component({
  selector: 'app-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, AppIcon, RevealDirective],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  protected readonly items = EDUCATION;
}
