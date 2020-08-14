import { Component } from '@angular/core';

import { elementHasContent } from '../../../jb-utils/utilities.functions';

@Component({
  selector: 'jb-related-content-block-section-specific',
  templateUrl: 'jb-related-content-block-section-specific.component.html',
})
export class JbRelatedContentBlockSectionSpecificComponent {
  hasContent(element: HTMLElement): boolean {
    return elementHasContent(element);
  }
}
