import { JbDatePickerInputComponent } from './jb-date-picker-input.component';

describe('JbDatePickerInputComponent', () => {
  let mockDatePickerInputComponent: JbDatePickerInputComponent;

  beforeEach(() => {
    mockDatePickerInputComponent = new JbDatePickerInputComponent(
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any
    );
    mockDatePickerInputComponent.input = {
      nativeElement: {
        focus: jest.fn(),
      },
    };
  });

  describe('setDisabledState', () => {
    it('should update isDatePickerDisabled when called', () => {
      mockDatePickerInputComponent.setDisabledState(true);
      expect(mockDatePickerInputComponent.isDatePickerDisabled).toEqual(true);
      mockDatePickerInputComponent.setDisabledState(false);
      expect(mockDatePickerInputComponent.isDatePickerDisabled).toEqual(false);
    });
  });

  describe('setFocus', () => {
    it('should emit focus', () => {
      const focused = jasmine.createSpy('focused');

      mockDatePickerInputComponent.focus.subscribe(focused);

      mockDatePickerInputComponent.setFocus();

      expect(focused).toHaveBeenCalled();
    });
  });

  describe('keyboard press', () => {
    let event: KeyboardEvent;

    beforeEach(() => {
      event = { preventDefault: jest.fn() } as any;
    });
    it('should emit prevent default keyboard event', () => {
      mockDatePickerInputComponent.handleArrowDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should emit arrowDown', () => {
      const spy = jest.fn();

      mockDatePickerInputComponent.arrowDown.subscribe(spy);
      mockDatePickerInputComponent.handleArrowDown(event);

      expect(spy).toHaveBeenCalled();
    });

    it('should emit enter', () => {
      const spy = jest.fn();

      mockDatePickerInputComponent.enterPressed.subscribe(spy);
      mockDatePickerInputComponent.handleEnter();

      expect(spy).toHaveBeenCalled();
    });

    it('should emit tab', () => {
      const spy = jest.fn();

      mockDatePickerInputComponent.tabbed.subscribe(spy);
      mockDatePickerInputComponent.handleTab(event);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onValueChange', () => {
    it('should correctly parse the format MM/dd/yyyy', () => {
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.onValueChange('11/30/2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('11/30/2019')
      );
      mockDatePickerInputComponent.onValueChange('1/03/2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/03/2019')
      );
      mockDatePickerInputComponent.onValueChange('1/31/2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/31/2019')
      );
      mockDatePickerInputComponent.onValueChange('01/3/2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/03/2019')
      );
    });
    it('should correctly parse the format MM/dd/yy', () => {
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.onValueChange('11/30/19');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('11/30/2019')
      );
      mockDatePickerInputComponent.onValueChange('1/03/19');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/03/2019')
      );
      mockDatePickerInputComponent.onValueChange('1/31/19');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/31/2019')
      );
      mockDatePickerInputComponent.onValueChange('01/3/19');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/03/2019')
      );
    });
    it('should correctly parse the format MMMM dd yyyyy', () => {
      const date = new Date('01/04/2019');
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.onValueChange('Jan 4 2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        date
      );
      mockDatePickerInputComponent.onValueChange('jan 4 2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        date
      );
      mockDatePickerInputComponent.onValueChange('Jan. 4, 2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        date
      );
      mockDatePickerInputComponent.onValueChange('Jan. 04, 2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        date
      );
      mockDatePickerInputComponent.onValueChange('January 4 2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        date
      );
    });
    it('should correctly parse the format dd MMMM yyyyy', () => {
      const date = new Date('11/01/2020');
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.onValueChange('1 Nov 2020');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        date
      );
      mockDatePickerInputComponent.onValueChange('1 November 2020');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        date
      );
      mockDatePickerInputComponent.onValueChange('1 nov 2020');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        date
      );
      mockDatePickerInputComponent.onValueChange('1 nov., 2020');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        date
      );
    });
    it('should correctly parse the format yy-MM-dd', () => {
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.onValueChange('19-01-11');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/11/2019')
      );
    });
    it('should correctly parse the format yyyyy-MM-dd', () => {
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.onValueChange('2019-01-11');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/11/2019')
      );
    });
    it('should correctly parse the format EEEE MMMM dd yyyyy', () => {
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.onValueChange('thursday jan 3 2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/03/2019')
      );
      mockDatePickerInputComponent.onValueChange('mon jan 7 2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/07/2019')
      );
      mockDatePickerInputComponent.onValueChange('m jan 7 2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/07/2019')
      );
      mockDatePickerInputComponent.onValueChange('mo jan 7 2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/07/2019')
      );
      mockDatePickerInputComponent.onValueChange('monday january 14 2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/14/2019')
      );
      mockDatePickerInputComponent.onValueChange('monday january 07 2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/07/2019')
      );
    });
    it('should correctly parse the format MMMM dd', () => {
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.minDate = new Date('12/01/2018');
      mockDatePickerInputComponent.maxDate = new Date('5/25/2019');
      mockDatePickerInputComponent.onValueChange('Jan 4');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2019')
      );
      mockDatePickerInputComponent.minDate = new Date('12/01/2019');
      mockDatePickerInputComponent.maxDate = new Date('5/25/2020');
      mockDatePickerInputComponent.onValueChange('jan 04');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2020')
      );
      mockDatePickerInputComponent.minDate = new Date('01/20/2020');
      mockDatePickerInputComponent.maxDate = new Date('5/25/2020');
      mockDatePickerInputComponent.onValueChange('Jan. 21');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/21/2020')
      );
      mockDatePickerInputComponent.minDate = new Date('01/01/2020');
      mockDatePickerInputComponent.maxDate = new Date('01/20/2020');
      mockDatePickerInputComponent.onValueChange('Jan. 04');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2020')
      );
      mockDatePickerInputComponent.onValueChange('January 4');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2020')
      );
    });
    it('should correctly parse the format dd MMMM', () => {
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.minDate = new Date('12/01/2018');
      mockDatePickerInputComponent.maxDate = new Date('05/30/2019');
      mockDatePickerInputComponent.onValueChange('4 Jan');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2019')
      );
      mockDatePickerInputComponent.minDate = new Date('12/01/2019');
      mockDatePickerInputComponent.maxDate = new Date('5/5/2020');
      mockDatePickerInputComponent.onValueChange('4 jan');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2020')
      );
      mockDatePickerInputComponent.minDate = new Date('01/01/2020');
      mockDatePickerInputComponent.maxDate = new Date('5/5/2020');
      mockDatePickerInputComponent.onValueChange('4 Jan.');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2020')
      );
      mockDatePickerInputComponent.minDate = new Date('01/01/2020');
      mockDatePickerInputComponent.maxDate = new Date('01/20/2020');
      mockDatePickerInputComponent.onValueChange('04 Jan.');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2020')
      );
      mockDatePickerInputComponent.onValueChange('4 January');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2020')
      );
    });
    it('should correctly parse the format MM/dd', () => {
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.minDate = new Date('12/01/2018');
      mockDatePickerInputComponent.maxDate = new Date('5/30/2019');
      mockDatePickerInputComponent.onValueChange('01/04');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2019')
      );
      mockDatePickerInputComponent.minDate = new Date('12/01/2019');
      mockDatePickerInputComponent.maxDate = new Date('05/20/2020');
      mockDatePickerInputComponent.onValueChange('01/04');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2020')
      );
      mockDatePickerInputComponent.minDate = new Date('01/01/2020');
      mockDatePickerInputComponent.maxDate = new Date('05/20/2020');
      mockDatePickerInputComponent.onValueChange('01/04');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2020')
      );
      mockDatePickerInputComponent.minDate = new Date('01/01/2020');
      mockDatePickerInputComponent.maxDate = new Date('01/20/2020');
      mockDatePickerInputComponent.onValueChange('01/04');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('01/04/2020')
      );
    });
    it('should handle invalid dates gracefully', () => {
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.onValueChange('Nomember 10 2020');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        'Nomember 10 2020'
      );
    });
    it('should handle invalid date formats gracefully', () => {
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.dateInputFormats = [
        'MM/DD/YYYY',
        'MM/dd/yyyy',
      ];
      mockDatePickerInputComponent.onValueChange('11/30/2019');
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith(
        new Date('11/30/2019')
      );
    });
    it('should handle void input gracefully', () => {
      mockDatePickerInputComponent.writeValue = jest.fn();
      mockDatePickerInputComponent.onValueChange(undefined);
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith('');
      mockDatePickerInputComponent.onValueChange(null);
      expect(mockDatePickerInputComponent.writeValue).toHaveBeenCalledWith('');
    });
    it('should format the same date when the date is entered multiple times', () => {
      mockDatePickerInputComponent.onValueChange('thursday jan 3 2019');
      expect(mockDatePickerInputComponent.input.nativeElement.value).toEqual(
        '01/03/2019'
      );
      mockDatePickerInputComponent.onValueChange('jan 3 2019');
      expect(mockDatePickerInputComponent.input.nativeElement.value).toEqual(
        '01/03/2019'
      );
      mockDatePickerInputComponent.onValueChange('19-01-04');
      expect(mockDatePickerInputComponent.input.nativeElement.value).toEqual(
        '01/04/2019'
      );
      mockDatePickerInputComponent.onValueChange('04 jan 2019');
      expect(mockDatePickerInputComponent.input.nativeElement.value).toEqual(
        '01/04/2019'
      );
      mockDatePickerInputComponent.onValueChange('jan 04 2019');
      expect(mockDatePickerInputComponent.input.nativeElement.value).toEqual(
        '01/04/2019'
      );
    });
  });
});
