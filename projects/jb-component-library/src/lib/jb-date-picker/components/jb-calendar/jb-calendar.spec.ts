import { BehaviorSubject } from 'rxjs';
import { isBefore, isSameDay } from 'date-fns';
import { JbCalendarComponent } from './jb-calendar.component';

class MockCalendar extends JbCalendarComponent {}

describe('JbCalendar', () => {
  let viewportService;
  let mockCalendar;

  beforeEach(() => {
    viewportService = {
      isMobileSubject: new BehaviorSubject(false),
      isMobile$() {
        // tslint:disable-next-line
        return this.isMobileSubject;
      },
    };
    // tslint:disable-next-line
    mockCalendar = new MockCalendar(viewportService as any);
    mockCalendar.availableMonths = [new Date('2019-01-01')];
  });

  describe('on mobile', () => {
    beforeEach(() => {
      viewportService.isMobileSubject.next(true);
    });

    it('should not sync calendar with input values', () => {
      const date = new Date('2019-01-01');
      mockCalendar.selectedDate = date;
      mockCalendar.previewSelectedDate = new Date('2019-02-02');

      const changes = {};
      mockCalendar.ngOnChanges(changes);

      expect(isSameDay(mockCalendar.previewSelectedDate, date)).toBe(false);
    });
  });

  describe('on non-mobile', () => {
    beforeEach(() => {
      viewportService.isMobileSubject.next(false);
    });

    it('should sync calendar with input values', () => {
      const date = new Date('2019-01-01');
      mockCalendar.selectedDate = date;
      mockCalendar.previewSelectedDate = new Date('2019-02-02');

      const changes = {};
      mockCalendar.ngOnChanges(changes);

      expect(isSameDay(mockCalendar.previewSelectedDate, date)).toBe(true);
    });
  });

  describe('update selected date', () => {
    let date;

    beforeEach(() => {
      date = new Date();
    });

    it('should set preview', () => {
      mockCalendar.updateSelectedDate(date);
      expect(isSameDay(mockCalendar.previewSelectedDate, date)).toBe(true);
    });

    it('should show Done button on mobile', () => {
      viewportService.isMobileSubject.next(true);
      mockCalendar.updateSelectedDate(date);

      expect(mockCalendar.showDoneButton).toBe(true);
    });

    it('should emit value on non-mobile', () => {
      const onDateSelected = jasmine.createSpy('onDateSelected');

      mockCalendar.dateSelected.subscribe(onDateSelected);
      viewportService.isMobileSubject.next(false);

      mockCalendar.updateSelectedDate(date);

      expect(onDateSelected).toHaveBeenCalled();
    });
  });

  describe('resetPreview', () => {
    it('should clear selection on calendar', () => {
      mockCalendar.previewSelectedDate = new Date();
      mockCalendar.showDoneButton = true;

      mockCalendar.resetPreview();

      expect(mockCalendar.previewSelectedDate).toBe(undefined);
      expect(mockCalendar.showDoneButton).toBe(false);
    });
  });

  describe('getFocusInActiveMonths', () => {
    it('should return the start of the first month when there is no selected date', () => {
      mockCalendar.nextActiveMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
      ];
      mockCalendar.previewSelectedDate = null;
      const focusDate = mockCalendar.getFocusInActiveMonths();
      expect(focusDate).toEqual(new Date('01/01/2011'));
    });
    it('should return the start of the first month when the selected date is not visible', () => {
      mockCalendar.nextActiveMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
      ];
      mockCalendar.previewSelectedDate = new Date('03/01/2011');
      const focusDate = mockCalendar.getFocusInActiveMonths();
      expect(focusDate).toEqual(new Date('01/01/2011'));
    });
    it('should return the selected date if it is visible', () => {
      mockCalendar.nextActiveMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
      ];
      mockCalendar.previewSelectedDate = new Date('02/15/2011');
      const focusDate = mockCalendar.getFocusInActiveMonths();
      expect(focusDate).toEqual(new Date('02/15/2011'));
    });
    it('should return the next enabled date after the first visible month start', () => {
      mockCalendar.nextActiveMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
      ];
      mockCalendar.isDateDisabled = (date) => {
        return isBefore(date, new Date('01/03/2011'));
      };
      const focusDate = mockCalendar.getFocusInActiveMonths();
      expect(focusDate).toEqual(new Date('01/03/2011'));
    });
    it('should return null if there are no valid dates in the active range', () => {
      mockCalendar.nextActiveMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
      ];
      mockCalendar.isDateDisabled = () => true;
      const focusDate = mockCalendar.getFocusInActiveMonths();
      expect(focusDate).toEqual(null);
    });
  });

  describe('setNextActiveMonths', () => {
    beforeEach(() => {
      mockCalendar.setFocus = jasmine.createSpy('setFocus');
      mockCalendar.updateActiveMonths = jasmine.createSpy('updateActiveMonths');
    });

    it('should increase the first active month by one', () => {
      mockCalendar.availableMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
      ];
      mockCalendar.minMonth = mockCalendar.availableMonths[0];
      mockCalendar.maxMonth = mockCalendar.availableMonths[1];
      mockCalendar.nextActiveMonths = [new Date('01/01/2011')];
      mockCalendar.setNextActiveMonths();
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        new Date('02/01/2011'),
      ]);
    });

    it('should change the focus to a date when there is one enabled in the active month', () => {
      const availableMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
        new Date('03/01/2011'),
      ];
      mockCalendar.availableMonths = availableMonths;
      mockCalendar.activeMonths = [availableMonths[0], availableMonths[1]];
      mockCalendar.nextActiveMonths = [...mockCalendar.activeMonths];
      mockCalendar.minMonth = availableMonths[0];
      mockCalendar.maxMonth = availableMonths[2];
      mockCalendar.isTwoMonthDatePicker = true;
      const activeDate = new Date('02/01/2011');
      mockCalendar.getFocusInActiveMonths = () => activeDate;
      mockCalendar.setNextActiveMonths();
      expect(mockCalendar.setFocus).toHaveBeenCalledWith(activeDate);
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        availableMonths[1],
        availableMonths[2],
      ]);
    });

    it('should set the focus correctly when the first available month is not at the start of the month', () => {
      const availableMonths = [
        new Date('01/05/2011'),
        new Date('02/01/2011'),
        new Date('03/01/2011'),
      ];
      mockCalendar.availableMonths = availableMonths;
      mockCalendar.activeMonths = [availableMonths[0], availableMonths[1]];
      mockCalendar.nextActiveMonths = [...mockCalendar.activeMonths];
      mockCalendar.minMonth = availableMonths[0];
      mockCalendar.maxMonth = availableMonths[2];
      mockCalendar.isTwoMonthDatePicker = true;
      const activeDate = new Date('02/01/2011');
      mockCalendar.getFocusInActiveMonths = () => activeDate;
      mockCalendar.setNextActiveMonths();
      expect(mockCalendar.setFocus).toHaveBeenCalledWith(activeDate);
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        availableMonths[1],
        availableMonths[2],
      ]);
    });

    it('should not change the date past the last available month', () => {
      const availableMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
        new Date('03/01/2011'),
      ];
      mockCalendar.availableMonths = availableMonths;
      mockCalendar.activeMonths = [availableMonths[1], availableMonths[2]];
      mockCalendar.nextActiveMonths = [...mockCalendar.activeMonths];
      mockCalendar.minMonth = availableMonths[0];
      mockCalendar.maxMonth = availableMonths[2];
      mockCalendar.isTwoMonthDatePicker = true;
      mockCalendar.setNextActiveMonths();
      expect(mockCalendar.setFocus).not.toHaveBeenCalled();
      expect(mockCalendar.updateActiveMonths).not.toHaveBeenCalled();
    });

    it('should change the focus to a date when there is one enabled in the active month', () => {
      const availableMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
        new Date('03/01/2011'),
      ];
      mockCalendar.availableMonths = availableMonths;
      mockCalendar.activeMonths = [availableMonths[0], availableMonths[1]];
      mockCalendar.nextActiveMonths = [...mockCalendar.activeMonths];
      mockCalendar.minMonth = availableMonths[0];
      mockCalendar.maxMonth = availableMonths[2];
      mockCalendar.isTwoMonthDatePicker = true;
      const activeDate = new Date('02/05/2011');
      mockCalendar.getFocusInActiveMonths = () => activeDate;
      mockCalendar.setNextActiveMonths();
      expect(mockCalendar.setFocus).toHaveBeenCalledWith(activeDate);
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        availableMonths[1],
        availableMonths[2],
      ]);
    });
  });

  describe('setPreviousActiveMonths', () => {
    beforeEach(() => {
      mockCalendar.setFocus = jasmine.createSpy('setFocus');
      mockCalendar.updateActiveMonths = jasmine.createSpy('updateActiveMonths');
    });

    it('should decrease the first active month by one', () => {
      mockCalendar.availableMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
      ];
      mockCalendar.minMonth = mockCalendar.availableMonths[0];
      mockCalendar.maxMonth = mockCalendar.availableMonths[1];
      mockCalendar.nextActiveMonths = [new Date('02/01/2011')];
      mockCalendar.setPreviousActiveMonths();
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        new Date('01/01/2011'),
      ]);
    });

    it('should change the focus to a date when there is one enabled in the active month', () => {
      const availableMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
        new Date('03/01/2011'),
      ];
      mockCalendar.availableMonths = availableMonths;
      mockCalendar.activeMonths = [availableMonths[1], availableMonths[2]];
      mockCalendar.nextActiveMonths = [...mockCalendar.activeMonths];
      mockCalendar.minMonth = availableMonths[0];
      mockCalendar.maxMonth = availableMonths[2];
      mockCalendar.isTwoMonthDatePicker = true;
      const activeDate = new Date('01/05/2011');
      mockCalendar.getFocusInActiveMonths = () => activeDate;
      mockCalendar.setPreviousActiveMonths();
      expect(mockCalendar.setFocus).toHaveBeenCalledWith(activeDate);
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        availableMonths[0],
        availableMonths[1],
      ]);
    });

    it('should keep focus on the appropriate chevron if none of the visible dates are valid', () => {
      const availableMonths = [
        new Date('01/01/2011'),
        new Date('02/01/2011'),
        new Date('03/01/2011'),
      ];
      mockCalendar.availableMonths = availableMonths;
      mockCalendar.activeMonths = [availableMonths[1], availableMonths[2]];
      mockCalendar.nextActiveMonths = [...mockCalendar.activeMonths];
      mockCalendar.minMonth = availableMonths[0];
      mockCalendar.maxMonth = availableMonths[2];
      mockCalendar.isTwoMonthDatePicker = true;
      mockCalendar.nextMonthButton = {
        nativeElement: {
          focus: jasmine.createSpy('focus'),
        },
      };
      mockCalendar.getFocusInActiveMonths = () => null;
      mockCalendar.isPreviousMonthArrowDisabled = true;
      mockCalendar.isNextMonthArrowDisabled = false;

      mockCalendar.setPreviousActiveMonths();
      expect(mockCalendar.setFocus).not.toHaveBeenCalled();
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        availableMonths[0],
        availableMonths[1],
      ]);
      expect(
        mockCalendar.nextMonthButton.nativeElement.focus
      ).toHaveBeenCalled();
    });
  });

  describe('updateNextActiveMonth', () => {
    it('should return true if the current month matches the assigned date', () => {
      const date = [new Date('10/11/2011')];
      mockCalendar.maxMonth = new Date();
      mockCalendar.minMonth = new Date();
      mockCalendar.availableMonths = date;
      mockCalendar.updateNextActiveMonth(date);
      expect(mockCalendar.nextActiveMonths).toEqual(date);
    });
  });

  describe('updateNavigationArrows', () => {
    it('should return true for isNextMonthArrowDisabled if the current month is the same as the maximum month', () => {
      const maxDate = new Date('10/11/2011');
      mockCalendar.maxMonth = maxDate;
      mockCalendar.minMonth = new Date('09/11/2011');
      mockCalendar.nextActiveMonths[0] = maxDate;
      mockCalendar.updateNavigationArrows();
      expect(mockCalendar.isNextMonthArrowDisabled).toBe(true);
    });
    // tslint:disable-next-line: max-line-length
    it('should return true for isPreviousMonthArrowDisabled if the current month is the same as the maximum month', () => {
      const minDate = new Date('09/11/2011');
      mockCalendar.maxMonth = new Date('10/11/2011');
      mockCalendar.minMonth = minDate;
      mockCalendar.nextActiveMonths[0] = minDate;
      mockCalendar.updateNavigationArrows();
      expect(mockCalendar.isPreviousMonthArrowDisabled).toBe(true);
    });
  });

  describe('updateFocusDate', () => {
    beforeEach(() => {
      mockCalendar.minDate = new Date('07/11/2011');
      mockCalendar.maxDate = new Date('1/15/2012');
      mockCalendar.minMonth = new Date('07/01/2011');
      mockCalendar.maxMonth = new Date('1/01/2012');
      mockCalendar.calendarCleared$ = {
        next: () => {
          return;
        },
      };
    });

    it('should not update the active months when the focus date is not valid', () => {
      mockCalendar.setFocus = jasmine.createSpy('setFocus');
      mockCalendar.updateActiveMonths = jasmine.createSpy('updateActiveMonths');
      mockCalendar.updateFocusDate(new Date('05/01/2011'));
      expect(mockCalendar.setFocus).not.toHaveBeenCalled();
      expect(mockCalendar.updateActiveMonths).not.toHaveBeenCalled();
    });

    it('should not update the active month when the focus date is in the current month', () => {
      mockCalendar.setFocus = jasmine.createSpy('setFocus');
      mockCalendar.updateActiveMonths = jasmine.createSpy('updateActiveMonths');
      mockCalendar.activeMonths = [new Date('10/01/2011')];
      mockCalendar.updateFocusDate(new Date('10/30/2011'));
      expect(mockCalendar.updateActiveMonths).not.toHaveBeenCalled();
      expect(mockCalendar.setFocus).toHaveBeenCalledWith(
        new Date('10/30/2011')
      );
    });

    it('should not update the active months when the focus date is in the current month', () => {
      mockCalendar.isTwoMonthDatePicker = true;
      mockCalendar.setFocus = jasmine.createSpy('setFocus');
      mockCalendar.updateActiveMonths = jasmine.createSpy('updateActiveMonths');
      mockCalendar.activeMonths = [
        new Date('10/01/2011'),
        new Date('11/01/2011'),
      ];
      mockCalendar.updateFocusDate(new Date('10/30/2011'));
      expect(mockCalendar.updateActiveMonths).not.toHaveBeenCalled();
      expect(mockCalendar.setFocus).toHaveBeenCalledWith(
        new Date('10/30/2011')
      );
    });

    it('should update the active month when the focus date is outside the current month', () => {
      mockCalendar.setFocus = jasmine.createSpy('setFocus');
      mockCalendar.updateActiveMonths = jasmine.createSpy('updateActiveMonths');
      mockCalendar.activeMonths = [new Date('10/01/2011')];
      mockCalendar.updateFocusDate(new Date('07/11/2011'));
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        new Date('07/01/2011'),
      ]);
      expect(mockCalendar.setFocus).toHaveBeenCalledWith(
        new Date('07/11/2011')
      );
      mockCalendar.updateFocusDate(new Date('11/15/2011'));
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        new Date('11/01/2011'),
      ]);
      expect(mockCalendar.setFocus).toHaveBeenCalledWith(
        new Date('11/15/2011')
      );
    });

    it('should update the active months when the focus date is outside the current month', () => {
      mockCalendar.isTwoMonthDatePicker = true;
      mockCalendar.setFocus = jasmine.createSpy('setFocus');
      mockCalendar.updateActiveMonths = jasmine.createSpy('updateActiveMonths');
      mockCalendar.activeMonths = [
        new Date('10/01/2011'),
        new Date('11/01/2011'),
      ];
      mockCalendar.updateFocusDate(new Date('07/31/2011'));
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        new Date('07/01/2011'),
        new Date('08/01/2011'),
      ]);
      expect(mockCalendar.setFocus).toHaveBeenCalledWith(
        new Date('07/31/2011')
      );
      mockCalendar.updateFocusDate(new Date('12/15/2011'));
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        new Date('12/01/2011'),
        new Date('01/01/2012'),
      ]);
      expect(mockCalendar.setFocus).toHaveBeenCalledWith(
        new Date('12/15/2011')
      );
    });

    it('should not advance the two month picker past the last month', () => {
      mockCalendar.isTwoMonthDatePicker = true;
      mockCalendar.setFocus = jasmine.createSpy('setFocus');
      mockCalendar.updateActiveMonths = jasmine.createSpy('updateActiveMonths');
      mockCalendar.activeMonths = [
        new Date('10/01/2011'),
        new Date('11/01/2011'),
      ];
      mockCalendar.updateFocusDate(new Date('01/12/2012'));
      expect(mockCalendar.updateActiveMonths).toHaveBeenCalledWith([
        new Date('12/01/2011'),
        new Date('01/01/2012'),
      ]);
      expect(mockCalendar.setFocus).toHaveBeenCalledWith(
        new Date('01/12/2012')
      );
    });
  });
});

// integration test stubs

describe('JbCalendar', () => {
  describe('up arrow', () => {
    it.skip('should focus date 7 days prior in calendar', () => {
      /** */
    });

    it.skip('should focus date in previous month, 7 days prior in calendar', () => {
      /** */
    });
  });

  describe('down arrow', () => {
    it.skip('should focus date 7 days after in calendar', () => {
      /** */
    });

    it.skip('should focus date in next month, 7 days after in calendar', () => {
      /** */
    });
  });

  describe('left arrow', () => {
    it.skip('should focus date 1 day prior in calendar', () => {
      /** */
    });

    it.skip('should focus date in previous month, 1 day prior in calendar', () => {
      /** */
    });
  });

  describe('right arrow', () => {
    it.skip('should focus date 1 day after in calendar', () => {
      /** */
    });

    it.skip('should focus date in next month, 1 day prior in calendar', () => {
      /** */
    });
  });
});
