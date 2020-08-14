import { JbAutocompleteComponent } from './jb-autocomplete.component';
import { createSimpleChangesMock, createStub } from '../test-helpers';
import { Observable } from 'rxjs';

describe('JbAutocompleteComponent', () => {
  let component;
  const mockObs$ = new Observable<boolean>();
  const mockViewPortService = {
    isMobile$: () => mockObs$,
  };

  beforeEach(() => {
    component = new JbAutocompleteComponent(
      createStub(mockViewPortService),
      createStub({ registerControl: jest.fn() }),
      undefined,
      createStub(),
      createStub(),
      createStub()
    );
    component.registerOnChange((value) => {
      component.control.setValue(value);
    });
  });

  describe('on instantiation', () => {
    it('should initialize ngControl', () => {
      const ngControl = {};
      component = new JbAutocompleteComponent(
        createStub(mockViewPortService),
        createStub({ registerControl: jest.fn() }),
        ngControl as any,
        createStub(),
        createStub(),
        createStub()
      );

      expect(component.ngControl.valueAccessor).toBe(component);
    });
  });

  it('should hide options list on initial load', () => {
    expect(component.hideList).toBe(true);
  });

  it('should have no selected option by default', () => {
    expect(component.activeOption).toBe(undefined);
  });

  describe('showDropdown', () => {
    it('should show the list when showDropdown is called', () => {
      component.showDropdown();
      expect(component.hideList).toBe(false);
    });

    it('should set activeOption', () => {
      component.showDropdown();
      expect(component.activeOption).toBe(component.filteredOptions[0]);
    });
  });

  describe('hiding dropdown', () => {
    beforeEach(() => {
      component.allOptions = [{ label: 'One' }];
      component.input = { setActiveDescendant: jest.fn() };
      component.ngOnInit();
      component.setActiveOptionByIndex(0);
    });

    it('should clear selection if query does not match active option', () => {
      component.viewControl.setValue('two');
      component.hideDropdown();

      expect(component.control.value).toBe(null);
    });

    it('should reset active descendant', () => {
      component.hideDropdown();

      expect(component.input.setActiveDescendant).toHaveBeenCalledWith('');
    });
  });

  describe('on query search', () => {
    beforeEach(() => {
      component.allOptions = ['one', 'two', 'three'];
      component.input = { setActiveDescendant: jest.fn() };
      component.ngOnInit();
    });

    it('should filter values', () => {
      const expectedResult = ['two'];
      const search = 'tw';
      component.viewControl.setValue(search);

      expect(component.filteredOptions).toEqual(expectedResult);
    });

    it('should return multiple filter values if more than one match exists', () => {
      const expectedResult = ['two', 'three'];
      const search = 't';
      component.viewControl.setValue(search);

      expect(component.filteredOptions).toEqual(expectedResult);
    });

    it('should filter options by beginning of word only', () => {
      const expectedResult = [];
      const search = 'hree';
      component.viewControl.setValue(search);

      expect(component.filteredOptions).toEqual(expectedResult);
    });

    it('should return the complete list if search is an empty string', () => {
      const expectedResult = ['one', 'two', 'three'];
      const search = '';
      component.viewControl.setValue(search);

      expect(component.filteredOptions).toEqual(expectedResult);
    });

    it('should return the empty list if search is a blank space', () => {
      const expectedResult = [];
      const search = ' ';
      component.viewControl.setValue(search);

      expect(component.filteredOptions).toEqual(expectedResult);
    });

    it('should return every instance where search matches beginning of word', () => {
      const expectedResult = ['San Fransisco', 'Toronto Sandwich'];
      const search = 'san';

      component.allOptions = ['San Fransisco', 'Foo', 'Toronto Sandwich'];
      component.viewControl.setValue(search);

      expect(component.filteredOptions).toEqual(expectedResult);
    });

    it('should set active option to first filtered option if current active is no longer in filter', () => {
      const expected = 'two';
      const search = 't';
      component.setActiveOptionByIndex(0);
      component.viewControl.setValue(search);

      expect(component.activeOption).toEqual(expected);
    });

    it('should return the correct filtered options if allOptions changes and if hasDynamicData is true', async () => {
      const expected = ['apple', 'above', 'ant'];
      const search = 'a';
      component.hasDynamicData = true;
      const changes = createSimpleChangesMock('allOptions', [
        'apple',
        'above',
        'ant',
      ]);

      component.viewControl.value = search;
      component.allOptions = ['apple', 'above', 'ant'];
      component.ngOnChanges(changes);
      await new Promise((res) => setTimeout(res, 1));

      expect(component.filteredOptions).toEqual(expected);
    });
  });

  describe('selectOptionAndHideDropdown', () => {
    beforeEach(() => {
      component.hideDropdown = jest.fn();
      component.popoverAnchor = {
        close: jest.fn(),
      };
    });

    it('should update the input value', () => {
      const val = 'one';

      component.selectOptionAndHideDropdown(val);
      expect(component.control.value).toEqual(val);
    });

    it('should hide dropdown', () => {
      component.selectOptionAndHideDropdown('one');
      expect(component.popoverAnchor.close).toHaveBeenCalled();
    });
  });
});
