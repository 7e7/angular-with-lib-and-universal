import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'jb-dialog-header',
  templateUrl: './jb-dialog-header.component.html',
})
export class JbDialogHeaderComponent {
  constructor(public el: ElementRef) {}
}
