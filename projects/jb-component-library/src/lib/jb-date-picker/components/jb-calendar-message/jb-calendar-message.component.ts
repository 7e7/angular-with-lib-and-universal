import { Component } from '@angular/core';

@Component({
  selector: 'jb-calendar-message',
  template: '<ng-content></ng-content>',
  host: {
    class: 'tc copy-xs slate-gray w-100',
  },
})
export class JbCalendarMessageComponent {}
