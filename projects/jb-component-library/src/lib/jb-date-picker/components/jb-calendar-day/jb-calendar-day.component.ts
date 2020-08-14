import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { isSameDay } from 'date-fns';

import { isSameDayAs } from '../../helpers/calendar';

export type SelectState =
  | 'selected'
  | 'same-day'
  | 'default'
  | 'none'
  | 'from-date'
  | 'to-date'
  | 'disabled';
export type HoverState =
  | 'selected'
  | 'same-day'
  | 'from-date'
  | 'to-date'
  | 'none';

@Component({
  selector: 'jb-calendar-day',
  templateUrl: './jb-calendar-day.component.html',
  styleUrls: ['./jb-calendar-day.component.scss'],
  host: {
    class: 'flex h-100',
  },
})
export class JbCalendarDayComponent implements OnChanges {
  @Input() value: Date;
  @Input() selectedDate: Date;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Input() defaultDate: Date;
  @Input() rangeDates: Date[];
  @Input() isRangeCalendar = false;
  @Input() isFromDateSelected: boolean;
  @Input() isDisabled: boolean;

  @ViewChild('button') button: ElementRef;

  @HostBinding('class.same-day-selected')
  @HostBinding('class.pa1')
  isSameDay: boolean;

  @HostBinding('class.range-selected') isRange: boolean;

  @HostBinding('class.from-date')
  get fromDateRangeStyle() {
    return this.bothDatesSelected && this.isFromDateActive;
  }

  @HostBinding('class.to-date')
  get toDateRangeStyle() {
    return this.bothDatesSelected && this.isToDateActive;
  }

  get isToday(): boolean {
    return isSameDay(this.value, Date.now());
  }

  state: SelectState = 'none';
  hoverState: HoverState = 'selected';
  isInteractable: boolean;
  bothDatesSelected = false;
  tabIndex = '-1';

  private isDateDefault: boolean;
  private isFromDateActive: boolean;
  private isToDateActive: boolean;
  private isSelected: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    this.isRangeCalendar
      ? this.checkRangeCalendarStatus()
      : this.checkSingleCalendarStatus();

    this.isDateDefault = isSameDayAs(this.value, this.defaultDate);
    this.isInteractable = !this.isDisabled;
    this.bothDatesSelected = (this.fromDate && this.toDate) != null;

    this.state = this.getSelectState();
    this.hoverState = this.getHoverState();

    this.tabIndex =
      this.isSelected || this.isFromDateActive || this.isToDateActive
        ? '0'
        : '-1';

    if (changes.rangeDates || changes.value) {
      this.isRange = (this.rangeDates || []).includes(this.value);
    }
  }

  enableTabbing() {
    this.tabIndex = '0';
  }

  disableTabbing() {
    this.tabIndex = '-1';
  }

  focus() {
    this.button.nativeElement.focus();
  }

  private checkSingleCalendarStatus(): void {
    this.isSelected = isSameDayAs(this.value, this.selectedDate);
  }

  private checkRangeCalendarStatus(): void {
    this.isFromDateActive = isSameDayAs(this.value, this.fromDate);

    this.isToDateActive = isSameDayAs(this.value, this.toDate);

    this.isSameDay =
      (this.fromDate && this.toDate) !== null &&
      isSameDayAs(this.fromDate, this.toDate) &&
      isSameDayAs(this.value, this.fromDate);
  }

  private getSelectState(): SelectState {
    if (this.isDisabled) {
      return 'disabled';
    } else if (this.isSameDay) {
      return 'same-day';
    } else if (this.isSelected) {
      return 'selected';
    } else if (this.isFromDateActive) {
      return 'from-date';
    } else if (this.isToDateActive) {
      return 'to-date';
    } else if (this.isDateDefault) {
      return 'default';
    }

    return 'none';
  }

  private getHoverState(): HoverState {
    if (this.isDisabled) {
      return 'none';
    }

    if (!this.isRangeCalendar) {
      return 'selected';
    } else if (this.isSameDay) {
      return 'same-day';
    } else if (this.isFromDateSelected) {
      return 'from-date';
    } else {
      return 'to-date';
    }
  }
}
