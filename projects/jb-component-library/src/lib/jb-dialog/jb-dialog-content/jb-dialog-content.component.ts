import { Component, ElementRef } from '@angular/core';

/**
 * Dialog Content Component
 * @example
 *  ...
 *  <jb-dialog-content>
 *    Ed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
 *  </jb-dialog-content>
 *  ...
 */
@Component({
  selector: 'jb-dialog-content',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'jb-dialog-content copy db center pb0-ns',
  },
})
export class JbDialogContentComponent {
  constructor(public el: ElementRef) {}
}
