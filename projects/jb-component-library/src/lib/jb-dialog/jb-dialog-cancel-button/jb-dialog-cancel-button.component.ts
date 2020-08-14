import { Component } from '@angular/core';

/**
 * Dialog Cancel Button Component
 * @example
 * ...
 * <jb-dialog-actions>
 *   <jb-dialog-cancel-button (click)="..."> Text ... </jb-dialog-cancel-button>
 * </jb-dialog-actions>
 * ...
 */
@Component({
  selector: 'jb-dialog-cancel-button',
  templateUrl: './jb-dialog-cancel-button.component.html',
  host: {
    class: 'db w-100 w-70-ns',
  },
})
export class JbDialogCancelButtonComponent {}
