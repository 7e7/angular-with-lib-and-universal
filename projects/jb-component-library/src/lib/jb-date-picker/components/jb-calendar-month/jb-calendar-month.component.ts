import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { isSameDay } from 'date-fns';
import { isSameMonthAs } from '../../helpers/calendar';
import { JbCalendarDayComponent } from '../jb-calendar-day/jb-calendar-day.component';

@Component({
  selector: 'jb-calendar-month',
  templateUrl: './jb-calendar-month.component.html',
  styleUrls: ['./jb-calendar-month.component.scss'],
})
export class JbCalendarMonthComponent {
  @Input() monthDayArray: Date[][];
  @Input() isRangeCalendar: boolean;
  @Input() rangeDates: Date[] = [];
  @Input() disabledDates: Date[] = [];
  @Input() month: Date;
  @Input() defaultDate: Date;

  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Input() isFromDateActive: boolean;
  @Input() selectedDate: Date;

  @Input() fromAndToDateAreSame: boolean;

  @ViewChildren(JbCalendarDayComponent) days: QueryList<JbCalendarDayComponent>;

  @Output() updateSelectedDate = new EventEmitter<Date>();

  isSameMonthAs: Function = isSameMonthAs;
  isSameDay: Function = isSameDay;

  updatedSelectedDate(date: Date) {
    this.updateSelectedDate.emit(date);
  }

  trackByDay(_: number, date: Date) {
    return date.getTime();
  }

  trackByWeek(_: number, dates: Date[]) {
    return dates[0].getTime();
  }
}
