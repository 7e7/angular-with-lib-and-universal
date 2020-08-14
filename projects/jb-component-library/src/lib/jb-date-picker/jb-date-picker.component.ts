import {
  Component,
  Input,
  OnInit,
  QueryList,
  ContentChildren,
  OnDestroy,
  AfterContentInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { merge, Subscription, Subject } from 'rxjs';
import { delay, filter, map, mapTo, startWith } from 'rxjs/operators';
import {
  subMonths,
  addMonths,
  differenceInCalendarMonths,
  isValid,
  startOfMonth,
  startOfDay,
  endOfDay,
  isWithinInterval,
  isBefore,
  isAfter,
} from 'date-fns';

import { JbDatePickerInputComponent } from './components/jb-date-picker-input/jb-date-picker-input.component';
import { JbCalendarStepper } from './types/calendar-stepper.enum';
import { elementHasContent } from '../jb-utils/utilities.functions';
import { JbCalendarDirective } from './components/jb-calendar/jb-calendar.directive';
import { JbPopoverDirective } from '../jb-popover/jb-popover.directive';
import { dateOr } from './helpers/utils';

@Component({
  selector: 'jb-date-picker',
  templateUrl: './jb-date-picker.component.html',
  styleUrls: ['./jb-date-picker.component.scss'],
  host: {
    class: 'db relative calendar-width',
  },
})
export class JbDatePickerComponent
  implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  @Input() monthStepper: JbCalendarStepper = JbCalendarStepper.forward;
  @Input() maxMonths = 9; // defaults to 9 as per business requirements
  @Input() defaultDate: Date;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() dateFormat = 'MM/dd/yyyy';
  @Input() isTwoMonthDatePicker = false;

  @ContentChildren(JbDatePickerInputComponent, { descendants: true })
  datePickerInputs: QueryList<JbDatePickerInputComponent>;

  @ViewChild(JbCalendarDirective) calendar: JbCalendarDirective;
  @ViewChild('anchor') flyoutAnchor: JbPopoverDirective;

  fromDate: Date;
  toDate: Date;
  availableMonths: Date[] = [];
  activeMonths: Date[] = [];
  elementHasContent: Function = elementHasContent;
  isRangePicker: boolean;

  private readonly blueEyeMaxMonths = 13; // To cover 365 days on the month stepper
  private activeDatePickerInput: JbDatePickerInputComponent;
  private otherDatePickerInput: JbDatePickerInputComponent;
  private calendarValueChange = new Subject<Date>();
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.initMaxMonths();
    this.initMinAndMaxDates();
    this.initMonthStepper();
    const targetDate = this.defaultDate || new Date();
    const defaultDate =
      targetDate > this.maxDate || targetDate < this.minDate
        ? this.minDate
        : targetDate;

    this.defaultDate = startOfDay(defaultDate);
  }

  ngAfterContentInit(): void {
    this.isRangePicker = this.datePickerInputs.length === 2;
    this.datePickerInputs.forEach((input) => {
      input.dateFormat = input.dateFormat || this.dateFormat;
      input.minDate = this.minDate;
      input.maxDate = this.maxDate;
    });

    this.setupGeneralSubscriptions();

    if (this.isRangePicker) {
      this.setSubscriberForRangePicker();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dateFormat && this.datePickerInputs) {
      this.datePickerInputs.forEach((input) => {
        input.dateFormat = changes.dateFormat.currentValue;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  handleCalendarDateSelect(date: Date): void {
    this.activeDatePickerInput.writeValue(date);
    this.calendarValueChange.next(date);
  }

  handleCalendarFromDateSelect(date: Date): void {
    this.datePickerInputs.first.writeValue(date);
  }

  handleCalendarToDateSelect(date: Date): void {
    this.datePickerInputs.last.writeValue(date);
  }

  getMinimumMonth(): Date {
    return this.availableMonths[0];
  }

  getMaximumMonth(): Date {
    return this.availableMonths[this.availableMonths.length - 1];
  }

  closeCalendarAndResetFocus(): void {
    this.activeDatePickerInput = null;
    this.otherDatePickerInput = null;
    this.flyoutAnchor.close(null, { focusOnPreviousElement: false });
  }

  closeCalendarAndFocusActiveInput(): void {
    this.flyoutAnchor.close(null, { focusOnPreviousElement: false });

    // Because of the way FocusMonitor behaves
    // set timeout is needed to get the correct FocusOrigin
    setTimeout(() => {
      this.activeDatePickerInput.setFocus({ emit: false });
    });
  }

  isFromDateActive() {
    return this.datePickerInputs.first === this.activeDatePickerInput;
  }

  updateActiveMonths(date: Date) {
    const selectedMonth = startOfMonth(date);

    if (this.availableMonths.length === 1) {
      this.activeMonths = this.availableMonths;
    } else if (this.isTwoMonthDatePicker) {
      const nextMonth = addMonths(selectedMonth, 1);

      this.activeMonths = isAfter(nextMonth, this.getMaximumMonth())
        ? [subMonths(selectedMonth, 1), selectedMonth]
        : [selectedMonth, nextMonth];
    } else {
      this.activeMonths = [selectedMonth];
    }
  }

  private initMaxMonths() {
    if (this.isDateRangeProvided()) {
      this.maxMonths = Math.abs(
        differenceInCalendarMonths(this.minDate, this.maxDate)
      );
      this.maxMonths += 1;
    }

    if (this.isMaximumMonthTooSmall()) {
      this.maxMonths = 1;
    } else if (this.isMaximumMonthTooLarge()) {
      this.maxMonths = 13;
    }
  }

  private initMinAndMaxDates() {
    if (this.monthStepper === JbCalendarStepper.forward) {
      this.minDate = this.minDate || new Date();
      this.maxDate =
        this.maxDate || addMonths(this.minDate, this.maxMonths - 1);
    } else {
      this.maxDate = this.maxDate || new Date();
      this.minDate =
        this.minDate || subMonths(this.maxDate, this.maxMonths - 1);
    }
    this.minDate = startOfDay(this.minDate);
    this.maxDate = endOfDay(this.maxDate);
  }

  private updateCalendarMonthFocus(): void {
    let date = this.getBeginningDate();
    if (
      this.activeDatePickerInput &&
      this.isDateValidAndInRange(this.activeDatePickerInput.value)
    ) {
      date = this.activeDatePickerInput.value;
    } else if (
      this.otherDatePickerInput &&
      this.isDateValidAndInRange(this.otherDatePickerInput.value)
    ) {
      date = this.otherDatePickerInput.value;
    }

    this.updateActiveMonths(date);
  }

  private initMonthStepper(): void {
    for (let i = 0; i < this.maxMonths; i++) {
      this.availableMonths.push(addMonths(this.minDate, i));
    }
  }

  private setupGeneralSubscriptions(): void {
    const openCalendarOnFocusSubscription = merge(
      ...this.datePickerInputs.map((input) =>
        merge(
          input.focus,
          // add delay here so that opening calendar with arrowDown doesn't falsely
          // trigger focusDate event. This would throw an error because it will try to focus
          // the the date when the calendar is not yet rendered
          input.arrowDown.pipe(
            delay(0),
            filter(() => !this.flyoutAnchor.getIsOpen())
          )
        ).pipe(mapTo(input))
      )
    ).subscribe((input) => {
      this.flyoutAnchor.open();
      this.setActiveInputThenFocus(input);
    });

    const closeCalendarAndBlurLastInputSubscription = this.datePickerInputs.last.enterPressed
      .pipe(
        // wait for value to update (otherwise it'll show previous value)
        delay(0),
        map(() => this.datePickerInputs.last.value),
        filter(this.isDateValidAndInRange)
      )
      .subscribe(() => {
        this.closeCalendarAndResetFocus();
        this.datePickerInputs.last.blurElement();
      });

    // for single date picker, first and last are the same inputs
    const closeCalendarOnBlurSubscription = merge(
      this.datePickerInputs.first.tabbed.pipe(
        filter(({ forward }) => !forward)
      ),
      this.datePickerInputs.last.tabbed.pipe(filter(({ forward }) => forward)),
      this.calendarValueChange.pipe(
        filter(() => this.activeDatePickerInput === this.datePickerInputs.last)
      )
    ).subscribe(() => this.closeCalendarAndResetFocus());

    const focusDateSubscription = merge(
      ...this.datePickerInputs.map((input) => input.arrowDown)
    )
      .pipe(
        filter(() => this.flyoutAnchor.getIsOpen()),
        map(() => {
          const activeValue = this.activeDatePickerInput.value;
          const otherValue =
            this.otherDatePickerInput && this.otherDatePickerInput.value;
          return dateOr(activeValue, dateOr(otherValue, this.defaultDate));
        })
      )
      .subscribe((date) => this.calendar.setFocus(date));

    const valueChangeSubscriptions = this.datePickerInputs.map(
      (input, index) => {
        const fromOrToDate: keyof JbDatePickerComponent =
          index === 0 ? 'fromDate' : 'toDate';
        return input.valueChange
          .pipe(startWith(input.value))
          .subscribe((value: Date) => {
            this[fromOrToDate] = this.isDateValidAndInRange(value)
              ? value
              : null;
          });
      }
    );
    this.subscriptions = this.subscriptions.concat([
      openCalendarOnFocusSubscription,
      closeCalendarOnBlurSubscription,
      closeCalendarAndBlurLastInputSubscription,
      focusDateSubscription,
      ...valueChangeSubscriptions,
    ]);
  }

  // for range picker
  private updateReturnDatePickerInputValue = (): Subscription =>
    this.datePickerInputs.first.valueChange
      .pipe(
        filter((value) => isBefore(this.datePickerInputs.last.value, value))
      )
      .subscribe(() => {
        this.datePickerInputs.last.writeValue(null);
      });

  private setSubscriberForRangePicker(): void {
    this.subscriptions.push(this.focusLastInputSubscriber());
    this.subscriptions.push(this.updateReturnDatePickerInputValue());
  }

  private isDateRangeProvided = (): boolean =>
    Boolean(this.minDate && this.maxDate);

  private isMaximumMonthTooSmall = (): boolean => this.maxMonths < 1;

  private isMaximumMonthTooLarge = (): boolean =>
    this.monthStepper === JbCalendarStepper.backward
      ? this.maxMonths > this.blueEyeMaxMonths
      : this.maxMonths > 12;

  // This function stores the last input that was active and if the date is
  // invalid, it will not update the month focus
  private setActiveInputThenFocus(
    activeInput: JbDatePickerInputComponent
  ): void {
    this.activeDatePickerInput = activeInput;
    this.otherDatePickerInput = this.datePickerInputs.find(
      (input) => input !== activeInput
    );

    this.updateCalendarMonthFocus();
  }

  private focusLastInputSubscriber = (): Subscription =>
    merge(
      this.datePickerInputs.first.enterPressed,
      this.calendarValueChange.pipe(
        filter(() => this.activeDatePickerInput === this.datePickerInputs.first)
      )
    )
      .pipe(
        // wait for value to update (otherwise it'll show previous value)
        delay(0),
        map(() => this.datePickerInputs.first.value),
        filter(this.isDateValidAndInRange)
      )
      .subscribe(() => this.datePickerInputs.last.setFocus());

  private isDateValidAndInRange = (date: any): boolean =>
    date &&
    isValid(date) &&
    isWithinInterval(date, { start: this.minDate, end: this.maxDate });

  /* If the calendar is backwards, it returns the date closest to the end */
  private getBeginningDate = (): Date =>
    this.monthStepper === JbCalendarStepper.backward
      ? this.maxDate
      : this.minDate;
}
