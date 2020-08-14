import { Component, ContentChildren, QueryList } from '@angular/core';

import { JbButtonDirective } from './../../jb-button/jb-button.directive';

/**
 * Dialog Action Component
 * @example
 * ...
 * <jb-dialog-actions>
 *   <button jbButton theme="..." (click)="..."> Text ... </button>
 *   ...
 * </jb-dialog-actions>
 * ...
 */
@Component({
  selector: 'jb-dialog-actions',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'flex justify-center flex-column items-center',
  },
})
export class JbDialogActionsComponent {
  @ContentChildren(JbButtonDirective)
  actionButtons: QueryList<JbButtonDirective>;
}
