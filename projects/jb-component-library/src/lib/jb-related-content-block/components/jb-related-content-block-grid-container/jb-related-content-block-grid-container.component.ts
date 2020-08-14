import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JbRelatedContentBlockComponent } from '../jb-related-content-block/jb-related-content-block.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'jb-related-content-block-grid-container',
  templateUrl: 'jb-related-content-block-grid-container.component.html',
  host: { class: 'jb-grid' },
})
export class JbRelatedContentBlockGridContainerComponent {
  constructor(private relatedContentBlock: JbRelatedContentBlockComponent) {}

  get isGridOffset(): boolean {
    return this.relatedContentBlock.relatedItems.length <= 2;
  }

  get isSectionSpecific(): boolean {
    return this.relatedContentBlock.isSectionSpecific;
  }

  get shouldUseGrid(): boolean {
    return this.isSectionSpecific || this.isGridOffset;
  }
}
