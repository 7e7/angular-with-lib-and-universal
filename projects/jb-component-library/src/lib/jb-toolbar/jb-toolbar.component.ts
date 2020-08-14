import { Component } from '@angular/core';

@Component({
  selector: 'jb-toolbar',
  template: `
    <nav
      class="bg-core-blue ph3 ph4-ns pv3"
      role="toolbar"
      aria-label="jb-toolbar"
    >
      <ng-content></ng-content>
    </nav>
  `,
})
export class JbToolbarComponent {}
