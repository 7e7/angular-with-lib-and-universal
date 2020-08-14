import { JbCalendarMonthStepperComponent } from './jb-calendar-month-stepper.component';

describe('JbCalendarMonthStepperComponent', () => {
  let component: JbCalendarMonthStepperComponent;

  beforeEach(() => {
    component = new JbCalendarMonthStepperComponent();
  });

  describe('onClickEmitEvent', () => {
    it('should emit the monthSelected output event', (done) => {
      const date = new Date('01/01/2011');
      component.activeMonths = [];
      component.monthSelected.subscribe((event: Date[]) => {
        expect(event[0]).toEqual(date);
        done();
      });
      component.onClickEmitEvent(date);
    });
  });

  describe('getNextActiveMonths', () => {
    const firstMonth: Date = new Date('01/01/2011');
    const secondMonth: Date = new Date('01/02/2011');
    const allMonths = [firstMonth, secondMonth];

    it('should return an empty array if availableMonths is empty', () => {
      component.availableMonths = [];

      const selectedMonth = new Date('01/01/2011');
      const result = component.getNextActiveMonths(selectedMonth);

      expect(result).toEqual([]);
    });

    it('should return the same availableMonths that is selected', () => {
      component.availableMonths = allMonths;

      const result = component.getNextActiveMonths(firstMonth);
      expect(result).toEqual(allMonths);
    });

    it('should return two availableMonths that are within the range when the last month is selected', () => {
      component.availableMonths = allMonths;

      // secondMonth is the last month
      const result = component.getNextActiveMonths(secondMonth);
      expect(result).toEqual(allMonths);
    });

    it('should return an empty array if selectedMonth is out of range selections', () => {
      component.availableMonths = [firstMonth];

      const result = component.getNextActiveMonths(firstMonth);
      expect(result).toEqual(component.availableMonths);
    });
  });
});
