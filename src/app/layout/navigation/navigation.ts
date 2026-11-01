import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { NAV_ITEMS } from '../../data/nav.data';
import { AppIcon } from '../../shared/icons/app-icon';

@Component({
  selector: 'app-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppIcon],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  protected readonly spy = inject(ScrollSpyService);
  protected readonly items = NAV_ITEMS;

  readonly variant = input<'bar' | 'drawer'>('bar');
  readonly navigated = output<void>();

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.spy.scrollTo(id);
    this.navigated.emit();
  }
}
