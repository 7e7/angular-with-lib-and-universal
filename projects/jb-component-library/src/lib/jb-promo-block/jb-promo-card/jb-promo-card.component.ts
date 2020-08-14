import { Component, Input } from '@angular/core';

import { elementHasContent } from '../../jb-utils/utilities.functions';

@Component({
  selector: 'jb-promo-card',
  templateUrl: './jb-promo-card.component.html',
  styleUrls: ['./jb-promo-card.component.scss'],
  host: {
    class: 'db',
  },
})
export class JbPromoCardComponent {
  @Input() opacity = 1;
  @Input() bgColor: '';

  hasContent(element: HTMLElement): boolean {
    return elementHasContent(element);
  }
}
