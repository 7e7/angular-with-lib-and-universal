import { Component } from '@angular/core';

import { elementHasContent } from '../jb-utils/utilities.functions';

@Component({
  selector: 'jb-callout-block',
  templateUrl: './jb-callout-block.component.html',
  host: {
    class: 'db tc',
  },
  styleUrls: ['./jb-callout-block.component.scss'],
})
export class JbCalloutBlockComponent {
  hasContent(element: HTMLElement): boolean {
    return elementHasContent(element);
  }
}
