import { JbRangeCalendarComponent } from './jb-range-calendar.component';
import { BehaviorSubject } from 'rxjs';
import { isSameDay } from 'date-fns';

describe('JbRangeCalendar', () => {
  let viewportService;
  let component: JbRangeCalendarComponent;
  const pastDate = new Date('12/31/2010');
  const middleDate = new Date('01/01/2011');
  const futureDate = new Date('01/02/2011');

  beforeEach(() => {
    viewportService = {
      isMobileSubject: new BehaviorSubject(false),
      isMobile$() {
        // tslint:disable-next-line:no-invalid-this
        return this.isMobileSubject;
      },
    };
    component = new JbRangeCalendarComponent(viewportService);
    component.availableMonths = [pastDate, middleDate, futureDate];
  });

  describe('apply', () => {
    it('should emit changes', () => {
      component.previewRangeDateFrom = new Date('2019-01-01');
      component.previewRangeDateTo = new Date('2019-02-02');
      component.isMobile = true;

      const fromDateOnNext = jasmine.createSpy('fromDate on next');
      const toDateOnNext = jasmine.createSpy('toDate on next');

      component.fromDateSelected.subscribe(fromDateOnNext);
      component.toDateSelected.subscribe(toDateOnNext);

      component.applyChanges();

      expect(fromDateOnNext).toHaveBeenCalledWith(
        component.previewRangeDateFrom
      );
      expect(toDateOnNext).toHaveBeenCalledWith(component.previewRangeDateTo);
    });
  });

  describe('reset preview', () => {
    it('should clear dates', () => {
      component.previewRangeDateFrom = new Date();
      component.previewRangeDateTo = new Date();

      component.resetPreview();

      expect(component.previewRangeDateFrom).toBeFalsy();
      expect(component.previewRangeDateTo).toBeFalsy();
      expect(component.previewIsFromDateActive).toBe(true);
    });
  });

  describe('updateSelectedDate', () => {
    let date;

    beforeEach(() => {
      date = new Date();
    });

    it('should emit date if not mobile', () => {
      const onDateSelected = jasmine.createSpy('onDateSelected');

      viewportService.isMobileSubject.next(false);

      component.dateSelected.subscribe(onDateSelected);

      component.updateSelectedDate(date);

      expect(onDateSelected).toHaveBeenCalledWith(date);
    });

    it('should set preview date on mobile', () => {
      viewportService.isMobileSubject.next(true);
      component.previewIsFromDateActive = true;

      component.updateSelectedDate(date);

      expect(isSameDay(component.previewRangeDateFrom, date)).toBe(true);
    });

    it('should toggle active date', () => {
      viewportService.isMobileSubject.next(true);
      component.previewIsFromDateActive = true;

      component.updateSelectedDate(date);

      expect(component.previewIsFromDateActive).toBe(false);
    });
  });

  describe('isDateBeforeMinDate', () => {
    it('should return true if the date assigned is less than the given minimum date', () => {
      component.minDate = middleDate;
      expect((component as any).isDateBeforeMinDate(pastDate)).toBe(true);
    });
    it('should return false if the date assigned is greater than the given minimum date', () => {
      component.minDate = middleDate;
      expect((component as any).isDateBeforeMinDate(futureDate)).toBe(false);
    });
  });

  describe('isDateAfterMaxDate', () => {
    it('should return true if the date assigned is greater than the given maximum date', () => {
      component.maxDate = middleDate;
      expect((component as any).isDateAfterMaxDate(futureDate)).toBe(true);
    });
    it('should return false if the date assigned is less than the given maximum date', () => {
      component.maxDate = futureDate;
      expect((component as any).isDateAfterMaxDate(middleDate)).toBe(false);
    });
  });

  describe('isDateBeforeFromDateAndToDateIsActivePicker', () => {
    it(`should return true if the date assigned is less than the from date and
    the return date picker input is active`, () => {
      component.previewIsFromDateActive = false;
      component.previewRangeDateFrom = middleDate;
      expect(
        (component as any).isDateBeforeFromDateAndToDateIsActivePicker(pastDate)
      ).toBe(true);
    });
    it(`should return false if the date assigned is greater than the from date and
    the from date picker input is active`, () => {
      component.previewIsFromDateActive = true;
      component.previewRangeDateFrom = middleDate;
      expect(
        (component as any).isDateBeforeFromDateAndToDateIsActivePicker(pastDate)
      ).toBe(false);
    });
  });

  describe('updateDisabledDatesStatus', () => {
    it(`should have length 0 for disabledDates list when fromDate is pastDate and
     the user is selecting a toDate`, () => {
      component.allMonthDayArray = [[[pastDate, middleDate, futureDate]]];
      component.previewRangeDateFrom = pastDate;
      component.maxDate = futureDate;
      (component as any).updateDisabledDatesStatus();
      expect(component.disabledDates).toHaveLength(0);
    });

    it(`should have length 1 for disabledDates list when fromDate is pastDate and
     the user is selecting a toDate`, () => {
      component.allMonthDayArray = [[[pastDate, middleDate, futureDate]]];
      component.previewRangeDateFrom = pastDate;
      component.maxDate = middleDate;
      (component as any).updateDisabledDatesStatus();

      const foo = [futureDate];

      expect(component.disabledDates).toHaveLength(1);
      expect(component.disabledDates).toEqual(foo);
    });

    it(`should have length 1 for disabledDates list when fromDate is middleDate and
     the user is selecting a toDate`, () => {
      component.allMonthDayArray = [[[pastDate, middleDate, futureDate]]];
      component.previewIsFromDateActive = false;
      component.previewRangeDateFrom = middleDate;
      component.maxDate = futureDate;
      (component as any).updateDisabledDatesStatus();

      const foo = [pastDate];

      expect(component.disabledDates).toHaveLength(1);
      expect(component.disabledDates).toEqual(foo);
    });
  });
});
