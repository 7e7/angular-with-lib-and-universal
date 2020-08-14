import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { JbRelatedContentBlockItemComponent } from '../jb-related-content-block-item/jb-related-content-block-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'jb-related-content-block',
  templateUrl: 'jb-related-content-block.component.html',
})
export class JbRelatedContentBlockComponent {
  @Input() logo: string;

  @ContentChildren(JbRelatedContentBlockItemComponent)
  relatedItems: QueryList<JbRelatedContentBlockItemComponent>;

  get isPageSpecific(): boolean {
    return !this.isSectionSpecific;
  }

  get isSectionSpecific(): boolean {
    return this.relatedItems.length === 0;
  }
}
