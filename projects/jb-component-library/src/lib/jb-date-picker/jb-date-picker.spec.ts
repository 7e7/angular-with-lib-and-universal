import { QueryList } from '@angular/core';
import { JbDatePickerComponent } from './jb-date-picker.component';
import { JbDatePickerInputComponent } from './components/jb-date-picker-input/jb-date-picker-input.component';
import { JbCalendarStepper } from './types/calendar-stepper.enum';
import { isSameDay, addMonths, startOfDay } from 'date-fns';

describe('JbDatePickerComponent', () => {
  let component: JbDatePickerComponent;

  beforeEach(() => {
    component = new JbDatePickerComponent();
    component.datePickerInputs = new QueryList<JbDatePickerInputComponent>();
    const fromDateInput = new JbDatePickerInputComponent(
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any
    );
    (fromDateInput.input as any) = {
      nativeElement: {},
    };
    component.datePickerInputs.reset([
      fromDateInput,
      new JbDatePickerInputComponent(
        {} as any,
        {} as any,
        {} as any,
        {} as any,
        {} as any,
        {} as any
      ),
    ]);
    component.flyoutAnchor = {
      toggle: jest.fn(),
      close: jest.fn(),
      open: jest.fn(),
    } as any;
  });

  describe('getMinimumMonth', () => {
    it('return true if the date matches the first date of the month stepper array', () => {
      const expected = new Date('01/01/2011');
      component.availableMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
      ];
      const month = component.getMinimumMonth();
      expect(month).toEqual(expected);
    });
  });

  describe('getMaximumMonth', () => {
    it('return true if the date matches the last date of the month stepper array', () => {
      const expected = new Date('02/01/2011');
      component.availableMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
      ];
      const month = component.getMaximumMonth();
      expect(month).toEqual(expected);
    });
  });

  describe('closeCalendarAndResetFocus', () => {
    it('should close the flyout when the calendar is closed', () => {
      component.closeCalendarAndResetFocus();
      expect(component.flyoutAnchor.close).toHaveBeenCalled();
    });
  });

  describe('on initializing', () => {
    describe('maximum months', () => {
      it('should be between 1 and blueEyeMaxMonths', () => {
        component.maxMonths = 3;

        component.ngOnInit();

        expect(component.maxMonths).toBe(3);
      });

      it('should set to 1 if below 1', () => {
        component.maxMonths = 0;

        component.ngOnInit();

        expect(component.maxMonths).toBe(1);
      });

      it('should set to 13 if above blueEyeMaxMonths', () => {
        component.maxMonths = 20;

        component.ngOnInit();

        expect(component.maxMonths).toBe(13);
      });

      it('should be number of months between and including minDate and maxDate', () => {
        component.minDate = new Date('2019-01-01');
        component.maxDate = new Date('2019-10-01');

        component.ngOnInit();

        expect(component.maxMonths).toBe(10);
      });
    });

    describe('month stepper', () => {
      it('should return true if the month array contains nine months after the designated date', () => {
        const expected = [
          new Date('2011-01-01T05:00:00.000Z'),
          new Date('2011-02-01T05:00:00.000Z'),
          new Date('2011-03-01T05:00:00.000Z'),
          new Date('2011-04-01T04:00:00.000Z'),
          new Date('2011-05-01T04:00:00.000Z'),
          new Date('2011-06-01T04:00:00.000Z'),
          new Date('2011-07-01T04:00:00.000Z'),
          new Date('2011-08-01T04:00:00.000Z'),
          new Date('2011-09-01T04:00:00.000Z'),
        ];
        component.minDate = new Date('01/01/2011');

        component.ngOnInit();

        expect(component.availableMonths).toEqual(expected);
      });

      it('should return true if the month array contains nine months before the designated date', () => {
        const expected = [
          new Date('2010-05-01T04:00:00.000Z'),
          new Date('2010-06-01T04:00:00.000Z'),
          new Date('2010-07-01T04:00:00.000Z'),
          new Date('2010-08-01T04:00:00.000Z'),
          new Date('2010-09-01T04:00:00.000Z'),
          new Date('2010-10-01T04:00:00.000Z'),
          new Date('2010-11-01T04:00:00.000Z'),
          new Date('2010-12-01T05:00:00.000Z'),
          new Date('2011-01-01T05:00:00.000Z'),
        ];
        component.maxDate = new Date('01/01/2011');
        component.monthStepper = JbCalendarStepper.backward;
        component.ngOnInit();

        expect(component.availableMonths).toEqual(expected);
      });
    });

    describe('minimum date', () => {
      it('should allow user input', () => {
        // assume date is passed through @Input()
        const userInputMinDate = new Date('2019-01-01');
        component.minDate = userInputMinDate;

        component.ngOnInit();

        expect(isSameDay(component.minDate, userInputMinDate)).toBe(true);
      });

      it('should default to today if no user input given', () => {
        component.ngOnInit();

        const today = new Date();
        expect(isSameDay(component.minDate, today)).toBe(true);
      });
    });

    describe('maximum date', () => {
      it('should allow user input', () => {
        // assume date is passed through @Input()
        const userInputMaxDate = new Date('2019-01-01');
        component.maxDate = userInputMaxDate;

        component.ngOnInit();

        expect(isSameDay(component.maxDate, userInputMaxDate)).toBe(true);
      });

      it('should default to today if no user input given for backward calendars', () => {
        component.monthStepper = JbCalendarStepper.backward;

        component.ngOnInit();

        const today = new Date();
        expect(isSameDay(component.maxDate, today)).toBe(true);
      });

      it('should default to today if no user input given for forward calendars', () => {
        const today = new Date();
        const numberOfMonthsToShow = 2;
        component.maxMonths = numberOfMonthsToShow;
        component.minDate = today;

        component.ngOnInit();

        const expectedMaxDate = addMonths(today, numberOfMonthsToShow - 1);
        expect(isSameDay(component.maxDate, expectedMaxDate)).toBe(true);
      });
    });

    describe('default date', () => {
      it("should set to today's date if no default date given and date is within min and max date", () => {
        component.ngOnInit();

        // for forward calendar, beginning date is minDate, otherwise, it's maxDate
        expect(component.defaultDate.getTime()).toBe(
          startOfDay(new Date()).getTime()
        );
      });
      it('should set the date to the min date if the default date is outside of the min and max dates', () => {
        component.minDate = new Date('2019-01-01');
        component.maxDate = new Date('2019-02-01');
        component.defaultDate = new Date('2019-03-01');
        component.ngOnInit();
        expect(component.defaultDate.getTime()).toBe(
          startOfDay(new Date('2019-01-01')).getTime()
        );
      });
      it('should set the date to the min date if there is no default date and todays date is outside of the min and max dates', () => {
        component.minDate = new Date('2019-01-01');
        component.maxDate = new Date('2019-02-01');
        component.ngOnInit();
        expect(component.defaultDate.getTime()).toBe(
          startOfDay(new Date('2019-01-01')).getTime()
        );
      });
      it('should be set to beginning of date given', () => {
        const today = new Date();
        component.defaultDate = new Date();
        component.ngOnInit();

        expect(component.defaultDate.getTime()).toBe(
          startOfDay(today).getTime()
        );
      });
    });
  });

  describe('date selection from calendar', () => {
    it('should set the active date input', () => {
      component.datePickerInputs.first.input = {
        nativeElement: {
          value: jest.fn(),
        },
      };
      component.datePickerInputs.last.input = {
        nativeElement: {
          value: jest.fn(),
        },
      };

      component.ngOnInit();
      component.ngAfterContentInit();

      component.datePickerInputs.first.focus.emit();

      const today = new Date();
      component.handleCalendarDateSelect(today);

      expect(component.fromDate.getTime()).toBe(today.getTime());
    });
  });

  describe('updateActiveMonths', () => {
    const firstMonth = new Date('01/01/2011');
    const secondMonth = new Date('02/01/2011');

    const allMonths = [firstMonth, secondMonth];

    it('should have one element if isTwoMonthDatePicker is false', () => {
      component.availableMonths = allMonths;

      component.updateActiveMonths(firstMonth);
      const result = component.activeMonths.length;

      expect(result).toEqual(1);
    });

    it('should have two elements if isTwoMonthDatePicker is true', () => {
      component.isTwoMonthDatePicker = true;
      component.availableMonths = allMonths;

      component.updateActiveMonths(firstMonth);
      const result = component.activeMonths.length;

      expect(result).toEqual(2);
    });

    it('should return the correct date if isTwoMonthDatePicker is false', () => {
      component.availableMonths = allMonths;

      component.updateActiveMonths(firstMonth);
      const result = component.activeMonths;

      expect(result).toEqual([firstMonth]);
    });

    it('should return the dates within range if isTwoMonthDatePicker is true', () => {
      component.isTwoMonthDatePicker = true;
      component.availableMonths = allMonths;

      component.updateActiveMonths(firstMonth);
      const result = component.activeMonths;

      expect(result).toEqual(allMonths);
    });

    it('should fallback to one element display if the availableMonths < 2', () => {
      component.isTwoMonthDatePicker = true;
      component.availableMonths = [firstMonth];

      component.updateActiveMonths(firstMonth);
      const result = component.activeMonths.length;

      expect(result).toEqual(1);
    });
  });

  // NOTE: These are integration-level tests. Written here for reference. Should be tested in the future
  describe('interaction', () => {
    describe('input', () => {
      describe('on arrow down', () => {
        it.skip('should focus calendar date on active input value', () => {
          /** */
        });
      });

      describe('on focus', () => {
        it.skip('should open calendar', () => {
          /** */
        });
      });

      describe('on tab out', () => {
        it.skip('should close calendar', () => {
          /** */
        });

        it.skip('should clear input focus', () => {
          /** */
        });
      });

      describe('entering invalid or out of range value', () => {
        describe('on pressing enter key', () => {
          it.skip('should keep focus on current input', () => {
            /** */
          });

          it.skip('should keep calendar open', () => {
            /** */
          });
        });
      });

      describe('entering valid date value', () => {
        describe('on pressing enter key', () => {
          describe('on fromDate input', () => {
            it.skip('should focus next input', () => {
              /** */
            });

            it.skip('should unfocus from date input', () => {
              /** */
            });
          });

          describe('on toDate input', () => {
            it.skip('should close calendar', () => {
              /** */
            });

            it.skip('shoud unfocus to date input', () => {
              /** */
            });
          });
        });
      });
    });

    describe('calendar', () => {
      describe('selecting from date', () => {
        it.skip('should focus next input', () => {
          /** */
        });
      });

      describe('selecting to date', () => {
        it.skip('should close the calendar', () => {
          /** */
        });

        it.skip('should clear focus on to date input', () => {
          /** */
        });
      });
    });
  });
});
