import {
  Injectable,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  HostBinding,
  OnDestroy,
  HostListener,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  Directive,
} from '@angular/core';

import {
  addMonths,
  subMonths,
  isValid,
  isSameDay,
  isBefore,
  isAfter,
  addDays,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from 'date-fns';
import {
  isSameMonthAs,
  getDaysInMonth,
  DAYS_OF_WEEK,
  flatten,
} from './../../helpers/calendar';
import { JbViewPortService } from '../../../jb-utils/services/viewport.service';
import { elementHasContent } from '../../../jb-utils/utilities.functions';
import { Subscription, Subject, ReplaySubject } from 'rxjs';
import { JbCalendarMonthComponent } from '../jb-calendar-month/jb-calendar-month.component';
import { JbCalendarDayComponent } from '../jb-calendar-day/jb-calendar-day.component';
import {
  startWith,
  tap,
  switchMap,
  takeUntil,
  pairwise,
  delay,
} from 'rxjs/operators';

@Directive()
@Injectable()
export abstract class JbCalendarDirective
  implements AfterViewInit, OnChanges, OnDestroy {
  @Input() minMonth: Date;
  @Input() maxMonth: Date;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() defaultDate: Date;
  @Input() selectedDate: Date;
  @Input() activeMonths: Date[];
  @Input() availableMonths: Date[];
  @Input() isTwoMonthDatePicker = false;

  elementHasContent: Function = elementHasContent;

  @Output() dateSelected = new EventEmitter<Date>();
  @Output() activeMonthsChange = new EventEmitter<Date[]>();
  @Output() apply = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  @HostBinding()
  class = 'fixed static-ns h-auto-ns h-100 w-100 top-0 left-0 bg-white';

  // keeps track of the months that are active within this template
  // Also use these to perform any computation before updating
  nextActiveMonths: Date[] = [];
  // assume start of week is always a Sunday
  weekDays: string[] = DAYS_OF_WEEK;
  isNextMonthArrowDisabled: boolean;
  isPreviousMonthArrowDisabled: boolean;

  // previews are what is seen on the calendar, instead of the true value of the inputs
  // they are in sync on desktop/tablet, but you need to press Done to apply them on mobile
  previewSelectedDate: Date;
  previewRangeDateFrom: Date;
  previewRangeDateTo: Date;
  previewIsFromDateActive = true;

  isSameMonthAs: Function = isSameMonthAs;
  isSameDay: Function = isSameDay;
  disabledDates: Date[] = [];

  showDoneButton = false;
  isMobile = false;

  // This is 3D array which holds all active months,
  // where the indexes are follows: [monthIndex][weekIndex][dayIndex]
  allMonthDayArray: Date[][][] = [];

  @ViewChild('previousMonthButton')
  previousMonthButton: ElementRef;
  @ViewChild('nextMonthButton')
  nextMonthButton: ElementRef;

  // A11y props
  @ViewChildren(JbCalendarMonthComponent) calendarMonths!: QueryList<
    JbCalendarMonthComponent
  >;
  calendarDayMap: Map<number, JbCalendarDayComponent>;

  // calendar clears previously shown month(s)
  // when new activeMonth(s) are set
  calendarCleared$ = new Subject();

  // On calendar clear, replay subject will remember
  // the last focus date. When it finishes rendering
  // the calendar-day of new month will focus
  focusDate: Date;
  focusDate$ = new ReplaySubject<Date>(1);
  rangeDates: Date[] = [];
  fromAndToDateAreSame = false;

  private subscriptions = new Subscription();

  constructor(protected viewportService: JbViewPortService) {
    // Normally we want this in ngOnInit, but it's placed here because
    // the first ngOnChanges needs it and ngOnInit runs after ngOnChanges
    this.subscriptions.add(
      this.viewportService
        .isMobile$()
        .subscribe((isMobile) => (this.isMobile = isMobile))
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.allMonthDayArray = this.availableMonths.map(getDaysInMonth);

    if (changes.activeMonths) {
      this.updateNextActiveMonth(changes.activeMonths.currentValue);
    }

    if (!this.isMobile) {
      this.syncPreviewsWithInputs();
    }
  }

  ngAfterViewInit() {
    this.subscriptions.add(this.focusOnDateSubscription());
  }

  getFocusInActiveMonths(): Date {
    const activeMonths = this.nextActiveMonths;
    let selectedDate = null;

    if (this.previewSelectedDate) {
      selectedDate = this.previewSelectedDate;
    } else if (this.previewIsFromDateActive && this.previewRangeDateFrom) {
      selectedDate = this.previewRangeDateFrom;
    } else if (!this.previewIsFromDateActive && this.previewRangeDateTo) {
      selectedDate = this.previewRangeDateTo;
    }

    const activeStartDay = startOfMonth(activeMonths[0]);
    const activeEndDay = endOfMonth(activeMonths[activeMonths.length - 1]);

    // If the selected date is in nextActiveMonths then focus on it
    if (
      selectedDate &&
      isWithinInterval(selectedDate, {
        start: activeStartDay,
        end: activeEndDay,
      })
    ) {
      return selectedDate;
    }

    // Find the first valid date in the active months
    for (
      let validDate = activeStartDay;
      isBefore(validDate, activeEndDay);
      validDate = addDays(validDate, 1)
    ) {
      if (!this.isDateDisabled(validDate)) {
        return validDate;
      }
    }

    return null;
  }

  setNextActiveMonths(): void {
    const firstMonth = addMonths(startOfMonth(this.nextActiveMonths[0]), 1);
    const nextActiveMonths = [firstMonth];
    if (isAfter(firstMonth, this.maxMonth)) {
      return;
    }

    if (this.isTwoMonthDatePicker) {
      const nextMonth = addMonths(firstMonth, 1);
      if (isAfter(nextMonth, this.maxMonth)) {
        return;
      }
      nextActiveMonths.push(nextMonth);
    }

    this.updateActiveMonths(nextActiveMonths);
    const focusDate = this.getFocusInActiveMonths();
    if (focusDate) {
      this.setFocus(focusDate);
    } else {
      // retain the focus on the chevron unless it is disabled
      if (this.isNextMonthArrowDisabled && !this.isPreviousMonthArrowDisabled) {
        (this.previousMonthButton.nativeElement as HTMLButtonElement).focus();
      }
    }
  }

  setPreviousActiveMonths(): void {
    let firstMonth = subMonths(startOfMonth(this.nextActiveMonths[0]), 1);
    if (isBefore(firstMonth, this.minMonth)) {
      firstMonth = this.minMonth;
    }
    const previousActiveMonths = [firstMonth];
    if (this.isTwoMonthDatePicker) {
      previousActiveMonths.push(addMonths(firstMonth, 1));
    }
    this.updateActiveMonths(previousActiveMonths);
    const focusDate = this.getFocusInActiveMonths();

    if (focusDate) {
      this.setFocus(focusDate);
    } else {
      // retain the focus on the chevron unless it is disabled
      if (this.isPreviousMonthArrowDisabled && !this.isNextMonthArrowDisabled) {
        (this.nextMonthButton.nativeElement as HTMLButtonElement).focus();
      }
    }
  }

  updateSelectedDate(date: Date) {
    this.updatePreview(date);

    if (!this.isMobile) {
      this.applyChanges();
    }
  }

  selectCurrentMonth() {
    const focusDate = this.getFocusInActiveMonths();
    if (focusDate) {
      this.setFocus(focusDate);
    }
  }

  stepperMonthsSelected(selectedDates: Date[]) {
    // Determine if the selected dates are already visible by comparing them
    // with this.nextActiveMonths, which contains the visible months.
    const areVisible =
      selectedDates &&
      this.nextActiveMonths &&
      selectedDates.length === this.nextActiveMonths.length &&
      selectedDates.every((item, index) => {
        return this.nextActiveMonths[index] === selectedDates[index];
      });
    if (!areVisible) {
      // If the months selected in the stepper are not currently visible,
      // we want to update the currently visible months
      this.updateActiveMonths(selectedDates);
    }
    // Set the focus in the calendar to the selected date, or the first
    // available date if there isn't one selected
    const focusDate = this.getFocusInActiveMonths();
    if (focusDate) {
      this.setFocus(focusDate);
    }
  }

  updateActiveMonths(selectedDates: Date[]) {
    // Clearing the calendar it to make sure that the new months are
    // visible when the focus is set on a date.
    this.calendarCleared$.next();
    this.activeMonths = selectedDates;
    this.activeMonthsChange.emit(selectedDates);
    this.updateNextActiveMonth(this.activeMonths);
  }

  updateNextActiveMonth(dates: Date[]): void {
    const initialMonth = dates[0];
    if (!initialMonth || !isValid(initialMonth)) {
      return;
    }

    const firstMonth = this.availableMonths.filter((month) =>
      isSameMonthAs(month, dates[0])
    )[0];

    const secondMonth = this.availableMonths.filter(
      (month) => this.isTwoMonthDatePicker && isSameMonthAs(month, dates[1])
    )[0];

    // nextActiveMonths should come from the availableMonths
    this.nextActiveMonths = [firstMonth, secondMonth].filter((month) => month);

    this.updateCalendarUI();
  }

  updateCalendarUI(): void {
    this.updateNavigationArrows();
    this.updateDisabledDatesStatus();
  }

  getAllMonthDayArray(currentMonth: Date): Date[][] {
    const index = this.availableMonths.indexOf(currentMonth);
    return this.allMonthDayArray[index];
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // A11y public methods

  @HostListener('keydown.escape')
  handleEscape() {
    this.close.emit();
  }

  @HostListener('keydown.arrowup', ['$event'])
  focusPrevWeek(event: KeyboardEvent) {
    this.focusDateAddDays(-7);
    event.preventDefault();
  }

  @HostListener('keydown.arrowdown', ['$event'])
  focusNextWeek(event: KeyboardEvent) {
    this.focusDateAddDays(7);
    event.preventDefault();
  }

  @HostListener('keydown.arrowleft', ['$event'])
  focusPrevDay(event: KeyboardEvent) {
    this.focusDateAddDays(-1);
    event.preventDefault();
  }

  @HostListener('keydown.arrowright', ['$event'])
  focusNextDay(event: KeyboardEvent) {
    this.focusDateAddDays(1);
    event.preventDefault();
  }

  setFocus(date: Date) {
    this.focusDate$.next(date);
  }

  abstract applyChanges(): void;

  abstract resetPreview(): void;

  protected abstract updatePreview(date: Date): void;

  protected abstract syncPreviewsWithInputs(): void;

  protected abstract isDateDisabled(date: Date): Boolean;

  protected isDateBeforeMinDate = (value: Date): boolean =>
    isBefore(value, this.minDate) && !isSameDay(value, this.minDate);

  protected isDateAfterMaxDate = (value: Date): boolean =>
    isAfter(value, this.maxDate) && !isSameDay(value, this.maxDate);

  protected updateDisabledDatesStatus(): void {
    const allCalendarDays = flatten(flatten(this.allMonthDayArray));

    this.disabledDates = allCalendarDays.filter((date) =>
      this.isDateDisabled(date)
    );
  }

  private isAdjacentMonthAvailable(
    currentActiveMonth: Date,
    minOrMaxMonth: Date
  ): boolean {
    return (
      currentActiveMonth.getMonth() === minOrMaxMonth.getMonth() &&
      currentActiveMonth.getFullYear() === minOrMaxMonth.getFullYear()
    );
  }

  private updateNavigationArrows(): void {
    // disable second display month if it is isTwoMonthDatePicker
    this.isNextMonthArrowDisabled = this.isTwoMonthDatePicker
      ? this.isAdjacentMonthAvailable(this.nextActiveMonths[1], this.maxMonth)
      : this.isAdjacentMonthAvailable(this.nextActiveMonths[0], this.maxMonth);

    this.isPreviousMonthArrowDisabled = this.isAdjacentMonthAvailable(
      this.nextActiveMonths[0],
      this.minMonth
    );
  }

  // A11y private methods
  private focusDateAddDays(increment: number) {
    this.updateFocusDate(addDays(this.focusDate, increment));
  }

  private updateFocusDate(date: Date) {
    if (this.isDateDisabled(date)) {
      return;
    }

    const activeStartDay = this.activeMonths[0];
    const activeEndDay = this.isTwoMonthDatePicker
      ? endOfMonth(this.activeMonths[1])
      : endOfMonth(this.activeMonths[0]);

    if (!isWithinInterval(date, { start: activeStartDay, end: activeEndDay })) {
      const focusMonth = startOfMonth(date);
      let activeMonths = [focusMonth];
      if (this.isTwoMonthDatePicker) {
        // Determine the months to display based on the direction we are moving,
        // while keeping the months in range
        if (isBefore(date, this.activeMonths[0])) {
          const previousMonth = subMonths(focusMonth, 1);
          activeMonths = this.isDateBeforeMinDate(previousMonth)
            ? [focusMonth, addMonths(focusMonth, 1)]
            : [previousMonth, focusMonth];
        } else {
          const nextMonth = addMonths(focusMonth, 1);
          activeMonths = this.isDateAfterMaxDate(nextMonth)
            ? [subMonths(focusMonth, 1), focusMonth]
            : [focusMonth, nextMonth];
        }
      }
      this.updateActiveMonths(activeMonths);
    }
    this.setFocus(date);
  }

  private focusOnDate(prevDate: Date, date: Date) {
    const prevFocusDay = this.calendarDayMap.get(
      prevDate && prevDate.getTime()
    );
    if (prevFocusDay) {
      prevFocusDay.disableTabbing();
    }

    const focusedDay = this.calendarDayMap.get(date.getTime());
    if (focusedDay) {
      focusedDay.enableTabbing();
      focusedDay.focus();
    }
  }

  // Wait for active calendar month to render before focusing calendar date
  // Otherwise the calendar day won't exist
  private focusOnDateSubscription(): Subscription {
    const monthRendered$ = this.calendarMonths.changes.pipe(
      startWith(undefined),
      tap(() => this.setCalendarDayMap()),
      // new renders propagate from child to parent,
      // causing ExpressionChangedAfterItHasBeenCheckedError without a delay
      delay(0)
    );

    return monthRendered$
      .pipe(
        switchMap(() => this.focusDate$.pipe(takeUntil(this.calendarCleared$))),
        startWith(this.defaultDate),
        tap((date: Date) => (this.focusDate = date)),
        pairwise()
      )
      .subscribe(([prevDate, date]) => this.focusOnDate(prevDate, date));
  }

  private setCalendarDayMap() {
    this.calendarDayMap = new Map();
    this.calendarMonths.forEach((calendarMonth, index) => {
      calendarMonth.days.forEach((day) => {
        this.calendarDayMap.set(day.value.getTime(), day);
      });
    });
  }
}
