import { Component } from '@angular/core';

@Component({
  selector: 'jb-sidenav',
  template: `
    <section class="br b--off-white bg-white">
      <ng-content></ng-content>
    </section>
  `,
})
export class JbSidenavComponent {}
