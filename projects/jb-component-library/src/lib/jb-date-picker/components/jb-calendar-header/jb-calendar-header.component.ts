import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'jb-calendar-header',
  templateUrl: './jb-calendar-header.component.html',
})
export class JbCalendarHeaderComponent {
  @Output() close = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
}
