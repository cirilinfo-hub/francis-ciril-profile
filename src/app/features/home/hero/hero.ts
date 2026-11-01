import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PROFILE } from '../../../core/configuration/profile.config';
import { ResumeService } from '../../../core/services/resume.service';
import { ScrollSpyService } from '../../../core/services/scroll-spy.service';
import { Particles } from '../../../shared/components/particles/particles';
import { TypingText } from '../../../shared/components/typing-text/typing-text';
import { RippleDirective } from '../../../shared/directives/ripple.directive';
import { AppIcon } from '../../../shared/icons/app-icon';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Particles, TypingText, AppIcon, RippleDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly resume = inject(ResumeService);
  private readonly spy = inject(ScrollSpyService);

  protected readonly profile = PROFILE;
  protected readonly clients = ['Eurofins', 'Cisco', 'Intel', 'Visa', 'Experian'];
  protected readonly floating = [
    { label: 'Angular', icon: 'angular' },
    { label: 'React', icon: 'react' },
    { label: 'TypeScript', icon: 'typescript' },
  ];

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.spy.scrollTo(id);
  }

  protected download(): void {
    void this.resume.download();
  }
}
