import { JbCalendarMonthComponent } from './jb-calendar-month.component';

describe('JbCalendarMonthComponent', () => {
  let component: JbCalendarMonthComponent;

  beforeEach(() => {
    component = new JbCalendarMonthComponent();
  });

  describe('trackByDay', () => {
    it('should return comparer for the day', () => {
      const date = new Date('01/02/2019');
      const comparer = component.trackByDay(0, date);

      expect(comparer).toBe(date.getTime());
    });
  });

  describe('trackByWeek', () => {
    it('should return comparer for the week', () => {
      const firstDay = new Date('01/02/2019');
      const week = [firstDay, {}, {}, {}, {}, {}, {}] as any[];
      const comparer = component.trackByWeek(0, week);

      expect(comparer).toBe(firstDay.getTime());
    });
  });
});
