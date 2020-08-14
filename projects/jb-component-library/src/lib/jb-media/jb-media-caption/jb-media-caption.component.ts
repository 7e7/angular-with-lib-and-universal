import { Component } from '@angular/core';

@Component({
  selector: 'jb-media-caption',
  template: `
    <jb-copy size="small">
      <ng-content></ng-content>
    </jb-copy>
  `,
})
export class JbMediaCaptionComponent {}
