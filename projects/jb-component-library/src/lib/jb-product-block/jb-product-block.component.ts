import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { elementHasContent } from '../jb-utils/utilities.functions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'jb-product-block',
  templateUrl: './jb-product-block.component.html',
  host: {
    class: 'db relative',
  },
})
export class JbProductBlockComponent {
  @Input() price: string;
  @Input() href: string;
  @Input() target = '_self';

  hasContent(element: HTMLElement): boolean {
    return elementHasContent(element);
  }
}
