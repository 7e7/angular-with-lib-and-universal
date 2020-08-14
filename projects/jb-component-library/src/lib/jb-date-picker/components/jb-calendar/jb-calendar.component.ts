import { Component } from '@angular/core';

import { JbCalendarDirective } from './jb-calendar.directive';

@Component({
  selector: 'jb-calendar',
  templateUrl: './jb-calendar.component.html',
  styleUrls: ['./jb-calendar.component.scss'],
  providers: [
    { provide: JbCalendarDirective, useExisting: JbCalendarComponent },
  ],
})
export class JbCalendarComponent extends JbCalendarDirective {
  readonly isRangeCalendar = false;

  // previews are what is seen on the calendar, instead of the true value of the inputs
  // they are in sync on desktop/tablet, but you need to press Done to apply them on mobile
  previewSelectedDate: Date;

  applyChanges() {
    this.dateSelected.emit(this.previewSelectedDate);
    this.apply.emit();
  }

  resetPreview() {
    this.previewSelectedDate = undefined;
    this.showDoneButton = false;
  }

  protected isDateDisabled(date: Date): Boolean {
    return this.isDateBeforeMinDate(date) || this.isDateAfterMaxDate(date);
  }

  protected updatePreview(date: Date) {
    this.previewSelectedDate = date;
    this.showDoneButton = true;
    this.updateDisabledDatesStatus();
  }

  protected syncPreviewsWithInputs() {
    this.previewSelectedDate = this.selectedDate;
  }
}
