import { JbEditorialWeatherWidgetComponent } from './jb-editorial-weather-widget.component';
import { FormControl } from '@angular/forms';

describe('JbEditorialWeatherWidgetComponent', () => {
  let component: JbEditorialWeatherWidgetComponent;
  beforeEach(() => {
    component = new JbEditorialWeatherWidgetComponent();
    component.control = new FormControl();
  });
  describe('getMonth', () => {
    it('should return January if it is passed jan', () => {
      expect(component.getMonth('jan')).toBe('January');
    });
    it('should return February if it is passed feb', () => {
      expect(component.getMonth('feb')).toBe('February');
    });
    it('should return March if it is passed mar', () => {
      expect(component.getMonth('mar')).toBe('March');
    });
    it('should return April if it is passed apr', () => {
      expect(component.getMonth('apr')).toBe('April');
    });
    it('should return May if it is passed may', () => {
      expect(component.getMonth('may')).toBe('May');
    });
    it('should return June if it is passed jun', () => {
      expect(component.getMonth('jun')).toBe('June');
    });
    it('should return July if it is passed jul', () => {
      expect(component.getMonth('jul')).toBe('July');
    });
    it('should return August if it is passed aug', () => {
      expect(component.getMonth('aug')).toBe('August');
    });
    it('should return September if it is passed sep', () => {
      expect(component.getMonth('sep')).toBe('September');
    });
    it('should return October if it is passed oct', () => {
      expect(component.getMonth('oct')).toBe('October');
    });
    it('should return November if it is passed nov', () => {
      expect(component.getMonth('nov')).toBe('November');
    });
    it('should return December if it is passed dec', () => {
      expect(component.getMonth('dec')).toBe('December');
    });
    it('should return undefined if an unexpected string is passed in', () => {
      expect(component.getMonth('lalalala')).toBe(undefined);
    });
  });
  describe('updateMonth', () => {
    let mockFn;
    const currentMonth = 'jan';
    const average = 10;
    beforeEach(() => {
      component.internalFormControlValue = currentMonth;
      mockFn = jest.fn((month) => ({ average }));
      component.getWeatherWidgetItemByMonth = mockFn;
      component.updateMonth();
    });
    it('Should update the monthly temperature to be the average for the currently selected month', () => {
      expect(component.monthlyTemperature).toBe(average);
    });
    it('Should pass the value to getWeatherWidgetItemByMonth', () => {
      expect(mockFn.mock.calls[0][0]).toBe(currentMonth);
    });
    it('Should set this.month to the full name asssociated to the FormControl value passed in', () => {
      expect(component.month).toBe('January');
    });
  });
  describe('getWeatherWidgetItemByMonth', () => {
    it('Shoud return the weather widget object matching the month passed in', () => {
      component.weatherData = [
        {
          month: 'apr',
          high: 58,
          low: 39,
          average: 48,
        },
        {
          month: 'may',
          high: 68,
          low: 49,
          average: 58,
        },
        {
          month: 'jun',
          high: 77,
          low: 59,
          average: 68,
        },
      ];
      expect(component.getWeatherWidgetItemByMonth('may')).toEqual(
        component.weatherData[1]
      );
    });
  });
  describe('formControlValue', () => {
    const passedValue = 'January';
    it('Should set the value of control to the value passed in', () => {
      component.formControlValue = passedValue;
      expect(component.control.value).toBe(passedValue);
    });
  });
});
