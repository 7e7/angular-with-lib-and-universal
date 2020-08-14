import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

import { JbButtonCloseModule } from '../jb-button-close/jb-button-close.module';
import { JbDatePickerComponent } from './jb-date-picker.component';
import { JbCalendarComponent } from './components/jb-calendar/jb-calendar.component';
import { JbRangeCalendarComponent } from './components/jb-calendar/jb-range-calendar.component';
import { JbCalendarDayComponent } from './components/jb-calendar-day/jb-calendar-day.component';
import { JbCalendarWeekComponent } from './components/jb-calendar-week/jb-calendar-week.component';
import { JbCalendarMonthComponent } from './components/jb-calendar-month/jb-calendar-month.component';
import { JbCalendarMonthStepperComponent } from './components/jb-calendar-month-stepper/jb-calendar-month-stepper.component';
import { JbCalendarMessageComponent } from './components/jb-calendar-message/jb-calendar-message.component';
import { JbDatePickerInputComponent } from './components/jb-date-picker-input/jb-date-picker-input.component';
import { JbCalendarHeaderComponent } from './components/jb-calendar-header/jb-calendar-header.component';
import { JbCalendarSelectedDisplayComponent } from './components/jb-calendar-selected-display/jb-calendar-selected-display.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbCopyModule } from '../jb-copy/jb-copy.module';
import { JbButtonModule } from '../jb-button/jb-button.module';
import { JbUtilsModule } from '../jb-utils/utils.module';
import { JbInputLabelModule } from '../forms/jb-input-label.module';
import { JbFlyoutModule } from '../jb-flyout/jb-flyout.module';
import { JbPopoverModule } from '../jb-popover/jb-popover.module';

@NgModule({
  imports: [
    CommonModule,
    JbIconModule,
    JbButtonCloseModule,
    JbCopyModule,
    JbButtonModule,
    JbUtilsModule,
    A11yModule,
    JbInputLabelModule,
    JbFlyoutModule,
    JbPopoverModule,
  ],
  declarations: [
    JbDatePickerComponent,
    JbCalendarComponent,
    JbRangeCalendarComponent,
    JbCalendarDayComponent,
    JbCalendarWeekComponent,
    JbCalendarMonthComponent,
    JbCalendarMessageComponent,
    JbCalendarMonthStepperComponent,
    JbCalendarHeaderComponent,
    JbDatePickerInputComponent,
    JbCalendarSelectedDisplayComponent,
  ],
  exports: [
    JbDatePickerComponent,
    JbCalendarMessageComponent,
    JbDatePickerInputComponent,
  ],
})
export class JbDatePickerModule {}
