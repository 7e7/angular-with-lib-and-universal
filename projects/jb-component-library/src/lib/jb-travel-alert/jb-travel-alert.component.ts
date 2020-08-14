import { Component, Output, EventEmitter, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'jb-travel-alert',
  templateUrl: './jb-travel-alert.component.html',
  styleUrls: ['./jb-travel-alert.component.scss'],
  animations: [
    trigger('alertOpen', [
      state(
        'false',
        style({
          height: 0,
          opacity: 0,
          visibility: 'hidden',
        })
      ),
      state(
        'true',
        style({
          height: '*',
          opacity: 1,
          visibility: 'visible',
        })
      ),
      transition('true <=> false', animate('300ms ease')),
    ]),
  ],
})
export class JbTravelAlertComponent {
  @Output() closeAlert = new EventEmitter();
  @Input() isOpen = true;
  @Input() link = '';
  @Input() href = '';
  @Input() target = '_self';
  /*method to close alert on click of close button*/
  onCloseAlert() {
    this.closeAlert.emit();
    this.isOpen = false;
  }
}
