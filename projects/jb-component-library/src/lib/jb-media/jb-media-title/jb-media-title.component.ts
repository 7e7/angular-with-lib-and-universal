import { Component } from '@angular/core';

@Component({
  selector: 'jb-media-title',
  template: '<jb-copy><ng-content></ng-content></jb-copy>',
  host: {
    class: 'b db mt3-ns mt2 mb1',
  },
})
export class JbMediaTitleComponent {}
