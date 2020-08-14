import { Component, Input } from '@angular/core';
import { JbCalloutType } from '../types/jb-callout.type';
@Component({
  selector: 'jb-callout',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: `b core-blue`,
    '[class.copy-price]': 'type === "price"',
    '[class.copy-promo]': 'type === "promo"',
  },
})
export class JbCalloutComponent {
  /** The type of callout. */
  @Input() type: JbCalloutType;
}
