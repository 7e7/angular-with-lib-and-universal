import { Component } from '@angular/core';

@Component({
  selector: 'jb-dialog-title',
  template: `
    <h3>
      <ng-content></ng-content>
    </h3>
  `,
  host: {
    class: 'tc royal-blue mb3-ns db',
  },
})
export class JbDialogTitleComponent {}
