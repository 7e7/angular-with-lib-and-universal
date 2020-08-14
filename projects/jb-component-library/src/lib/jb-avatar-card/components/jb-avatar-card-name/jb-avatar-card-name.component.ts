import { Component } from '@angular/core';
@Component({
  selector: 'jb-avatar-card-name',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'truncate db',
  },
})
export class JbAvatarCardNameComponent {}
