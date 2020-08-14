import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector * camelCasing allows for backwards compatibility *
  selector: 'button[jbButton], a[jbButton]',
  templateUrl: 'jb-button.component.html',
  styleUrls: ['./jb-button.component.scss'],
})
export class JbButtonComponent {}
