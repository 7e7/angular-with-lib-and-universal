import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

import { isSameMonthAs } from './../../helpers/calendar';

@Component({
  selector: 'jb-calendar-month-stepper',
  templateUrl: './jb-calendar-month-stepper.component.html',
  styleUrls: ['./jb-calendar-month-stepper.component.scss'],
  host: {
    class: 'db bt b--light-gray',
  },
})
export class JbCalendarMonthStepperComponent {
  @Input() availableMonths: Date[];
  @Input() activeMonths: Date[];
  @Output() monthSelected: EventEmitter<Date[]> = new EventEmitter<Date[]>();
  @Output() selectCurrentMonth = new EventEmitter<void>();

  isSameMonthAs: Function = isSameMonthAs;

  @HostListener('keydown.arrowdown', ['$event'])
  @HostListener('keydown.arrowup', ['$event'])
  focusCalendar(event: KeyboardEvent) {
    this.selectCurrentMonth.emit();
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('keydown.arrowleft', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  arrowLeftRight(event: KeyboardEvent) {
    // Ideally these would implement shift-tab and tab in the stepper.  Since
    // that is a lot of work for relatively small returns, we prevent the
    // keystrokes from falling through to change the week.
    event.preventDefault();
    event.stopPropagation();
  }

  onClickEmitEvent(selectedMonth: Date): void {
    const nextActiveMonths: Date[] =
      this.activeMonths.length >= 2
        ? this.getNextActiveMonths(selectedMonth)
        : [selectedMonth];

    this.monthSelected.emit(nextActiveMonths);
  }

  getNextActiveMonths(selectedMonth: Date): Date[] {
    if (this.availableMonths.length <= 1) {
      return this.availableMonths;
    }
    const indexOfNextMonth = this.availableMonths.indexOf(selectedMonth) + 1;

    const indexOfPreviousMonth =
      this.availableMonths.indexOf(selectedMonth) - 1;

    const nextMonth = this.availableMonths[indexOfNextMonth];
    const previousMonth = this.availableMonths[indexOfPreviousMonth];

    return nextMonth
      ? [selectedMonth, nextMonth]
      : [previousMonth, selectedMonth];
  }
}
