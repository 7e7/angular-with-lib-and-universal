import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

import { JbCalendarDirective } from './jb-calendar.directive';
import { JbCalendarStepper } from './../../types/calendar-stepper.enum';

import { isAfter, isBefore } from 'date-fns';
import { isSameDayAs, flatten } from '../../helpers/calendar';

@Component({
  selector: 'jb-range-calendar',
  templateUrl: './jb-calendar.component.html',
  styleUrls: ['./jb-calendar.component.scss'],
  providers: [
    { provide: JbCalendarDirective, useExisting: JbRangeCalendarComponent },
  ],
})
export class JbRangeCalendarComponent extends JbCalendarDirective
  implements OnChanges {
  @Input() rangeDateFrom: Date;
  @Input() rangeDateTo: Date;
  @Input() stepperDirection: JbCalendarStepper = JbCalendarStepper.forward;
  @Input() isFromDateActive: boolean;

  @Output() fromDateSelected = new EventEmitter<Date>();
  @Output() toDateSelected = new EventEmitter<Date>();

  // previews are what is seen on the calendar, instead of the true value of the inputs
  // they are in sync on desktop/tablet, but you need to press Done to apply them on mobile
  previewRangeDateFrom: Date;
  previewRangeDateTo: Date;
  previewIsFromDateActive = true;

  readonly isRangeCalendar = true;
  isWithInRange = false;
  isStepperBackwards: boolean;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    super.ngOnChanges(simpleChanges);

    if (simpleChanges.stepperDirection) {
      this.isStepperBackwards =
        this.stepperDirection === JbCalendarStepper.backward;
    }
  }

  applyChanges() {
    if (!this.isMobile) {
      const date = this.previewIsFromDateActive
        ? this.previewRangeDateFrom
        : this.previewRangeDateTo;
      this.dateSelected.emit(date);
    } else {
      this.fromDateSelected.emit(this.previewRangeDateFrom);
      this.toDateSelected.emit(this.previewRangeDateTo);
      this.apply.emit();
      this.close.emit();
    }
  }

  updateSelectedDate(date: Date) {
    super.updateSelectedDate(date);

    if (this.isMobile) {
      this.previewIsFromDateActive = false;
      // must be called after setting previewIsFromDateActive
      // even though updatePreview calls it, too
      this.updateDisabledDatesStatus();
    }
  }

  resetPreview() {
    this.updatePreview(undefined, true);
    this.updatePreview(undefined, false);
    this.previewIsFromDateActive = true;
  }

  protected syncPreviewsWithInputs() {
    this.previewIsFromDateActive = this.isFromDateActive;
    this.updatePreview(this.rangeDateFrom, true);
    this.updatePreview(this.rangeDateTo, false);
  }

  protected isDateDisabled(date: Date): Boolean {
    return (
      this.isDateBeforeMinDate(date) ||
      this.isDateBeforeFromDateAndToDateIsActivePicker(date) ||
      this.isDateAfterMaxDate(date)
    );
  }

  protected updatePreview(
    date: Date,
    isFromDateActive: boolean = this.previewIsFromDateActive
  ) {
    if (isFromDateActive) {
      this.previewRangeDateFrom = date;
    } else {
      this.previewRangeDateTo = date;
    }

    this.updateRangeDates();
    this.updateDisabledDatesStatus();
    this.showDoneButton = Boolean(
      this.previewRangeDateFrom && this.previewRangeDateTo
    );
  }

  private updateRangeDates() {
    this.rangeDates = [];

    const bothSelected =
      (this.previewRangeDateFrom && this.previewRangeDateTo) != null;

    if (bothSelected) {
      // flattens the monthDayArray and filter by using the from and to dates
      const allCalendarDays = flatten(flatten(this.allMonthDayArray));

      this.rangeDates = allCalendarDays.filter((cell: Date) => {
        // case where this.fromDate < cell value
        const lessThanTheCurrValue = isAfter(cell, this.previewRangeDateFrom);

        // case where cell value < this.toDate
        const greaterThanTheCurrValue = isBefore(cell, this.previewRangeDateTo);

        return lessThanTheCurrValue && greaterThanTheCurrValue;
      });
    }

    this.fromAndToDateAreSame = isSameDayAs(
      this.previewRangeDateFrom,
      this.previewRangeDateTo
    );
  }

  private isDateBeforeFromDateAndToDateIsActivePicker = (
    value: Date
  ): boolean =>
    isBefore(value, this.previewRangeDateFrom) && !this.previewIsFromDateActive;
}
