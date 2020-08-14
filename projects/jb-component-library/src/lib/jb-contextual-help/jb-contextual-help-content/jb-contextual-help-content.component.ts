import { Component } from '@angular/core';

@Component({
  selector: 'jb-contextual-help-content',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'copy-s tl tc-ns db pb2',
  },
})
export class JbContextualHelpContentComponent {}
