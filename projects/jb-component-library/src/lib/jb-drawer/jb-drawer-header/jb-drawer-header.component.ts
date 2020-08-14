import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'jb-drawer-header',
  styleUrls: ['jb-drawer-header.component.scss'],
  host: {
    class: 'flex items-center relative',
    '[class.mr4-l]': 'useDefaultCloseMargin',
    '[class.mr3]': 'useDefaultCloseMargin',
    '[class.mr5-m]': 'useDefaultCloseMargin',
  },
  template: `
    <ng-content></ng-content>
    <jb-button-close
      size="large"
      fill="core-blue"
      class="absolute right-0"
      (click)="drawerClose()"
    ></jb-button-close>
  `,
})
export class JbDrawerHeaderComponent {
  @Input() useDefaultCloseMargin = true;

  @Output() onDrawerClose = new EventEmitter<any>();

  drawerClose() {
    this.onDrawerClose.emit();
  }
}
