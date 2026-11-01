import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { ArchitectureSource, DiagramNode } from '../../core/models/portfolio.models';
import {
  ARCHITECTURE_LAYERS,
  ARCHITECTURE_TOPICS,
  ECOSYSTEM_STEPS,
} from '../../data/architecture.data';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { AppIcon } from '../../shared/icons/app-icon';

type DiagramView = 'layers' | 'ecosystem';
type TopicFilter = 'all' | ArchitectureSource;

@Component({
  selector: 'app-architecture',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, AppIcon, RevealDirective, TiltDirective],
  templateUrl: './architecture.html',
  styleUrl: './architecture.scss',
})
export class Architecture {
  protected readonly layers = ARCHITECTURE_LAYERS;
  protected readonly steps = ECOSYSTEM_STEPS;
  protected readonly topics = ARCHITECTURE_TOPICS;

  protected readonly view = signal<DiagramView>('layers');
  protected readonly selectedNodeId = signal('library');
  protected readonly selectedStepId = signal('composites');
  protected readonly topicFilter = signal<TopicFilter>('all');

  protected readonly selectedNode = computed<DiagramNode>(() => {
    const all = this.layers.flatMap((l) => l.nodes);
    return all.find((n) => n.id === this.selectedNodeId()) ?? all[0];
  });

  protected readonly selectedStep = computed(
    () => this.steps.find((s) => s.id === this.selectedStepId()) ?? this.steps[0],
  );

  protected readonly visibleTopics = computed(() => {
    const f = this.topicFilter();
    return f === 'all' ? this.topics : this.topics.filter((t) => t.source === f);
  });

  protected readonly counts = {
    resume: this.topics.filter((t) => t.source === 'resume').length,
    interest: this.topics.filter((t) => t.source === 'interest').length,
  };

  protected setView(view: DiagramView): void {
    this.view.set(view);
  }

  protected selectNode(id: string): void {
    this.selectedNodeId.set(id);
  }

  protected selectStep(id: string): void {
    this.selectedStepId.set(id);
  }

  protected setTopicFilter(filter: TopicFilter): void {
    this.topicFilter.set(filter);
  }
}
