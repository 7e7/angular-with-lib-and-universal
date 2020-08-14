import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-selected-display',
  templateUrl: './jb-calendar-selected-display.component.html',
  styleUrls: ['./jb-calendar-selected-display.component.scss'],
  host: { class: 'w-100 royal-blue flex flex-wrap justify-between db dn-ns' },
})
export class JbCalendarSelectedDisplayComponent {
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Input() selectedDate: Date;
  @Input() isRangeCalendar = false;
  @Input() isFromDateActive = true;
}
