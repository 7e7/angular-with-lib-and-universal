import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { elementHasContent } from '../../../jb-utils/utilities.functions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'jb-related-content-block-title',
  templateUrl: 'jb-related-content-block-title.component.html',
})
export class JbRelatedContentBlockTitleComponent {
  @ViewChild('title', { static: true }) title: ElementRef;

  get isEmpty(): boolean {
    return !elementHasContent(this.title.nativeElement);
  }
}
