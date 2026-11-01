import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PROFILE } from '../../core/configuration/profile.config';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { AppIcon } from '../../shared/icons/app-icon';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly spy = inject(ScrollSpyService);
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();

  protected toTop(event: Event): void {
    event.preventDefault();
    this.spy.scrollTo('home');
  }
}
