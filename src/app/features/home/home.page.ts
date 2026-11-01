import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { NAV_ITEMS } from '../../data/nav.data';
import { SectionSkeleton } from '../../shared/components/section-skeleton/section-skeleton';
import { About } from '../about/about';
import { Achievements } from '../achievements/achievements';
import { Architecture } from '../architecture/architecture';
import { Competencies } from '../competencies/competencies';
import { Contact } from '../contact/contact';
import { Education } from '../education/education';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import { Skills } from '../skills/skills';
import { Hero } from './hero/hero';

/**
 * Single-page portfolio. The hero is eager; every other section is a deferred chunk that loads
 * once the browser is idle, so the first paint stays small while the page is fully ready within a moment.
 */
@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Hero,
    SectionSkeleton,
    About,
    Competencies,
    Skills,
    Experience,
    Projects,
    Architecture,
    Achievements,
    Education,
    Contact,
  ],
  templateUrl: './home.page.html',
})
export class HomePage {
  private readonly spy = inject(ScrollSpyService);

  constructor() {
    afterNextRender(() => {
      this.spy.track(NAV_ITEMS.map((item) => item.id));
      const hash = location.hash.slice(1);
      if (hash) setTimeout(() => this.spy.scrollTo(hash), 600);
    });
  }
}
