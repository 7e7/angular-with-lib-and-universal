import { JbCalendarDayComponent } from './jb-calendar-day.component';

describe('JbCalendar', () => {
  let component: JbCalendarDayComponent;

  beforeEach(() => {
    component = new JbCalendarDayComponent();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('enableTabbing', () => {
    it('should enable tabbing', () => {
      component.enableTabbing();

      expect(component.tabIndex).toBe('0');
    });
  });

  describe('disableTabbing', () => {
    it('should disable tabbing', () => {
      component.disableTabbing();

      expect(component.tabIndex).toBe('-1');
    });
  });

  describe('focus', () => {
    beforeEach(() => {
      component.button = { nativeElement: { focus: jest.fn() } };
    });

    it('should focus button', () => {
      component.focus();

      expect(component.button.nativeElement.focus).toHaveBeenCalled();
    });
  });
});
