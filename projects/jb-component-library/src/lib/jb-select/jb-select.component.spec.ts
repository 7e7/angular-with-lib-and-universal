import { QueryList } from '@angular/core';
import { JbSelectComponent } from './jb-select.component';
import { JbSelectOptionComponent } from './jb-select-option/jb-select-option.component';
import { createStub } from '../test-helpers';

describe('JbSelectComponent', () => {
  let component: JbSelectComponent;

  beforeEach(() => {
    component = new JbSelectComponent(createStub());
    component.options = new QueryList<JbSelectOptionComponent>();
    component.resetActiveDescendant = () => false;
    component.options.reset([
      new JbSelectOptionComponent(createStub({ markForCheck: () => false })),
      new JbSelectOptionComponent(createStub({ markForCheck: () => false })),
    ]);
  });

  describe('setOptionItemToActive', () => {
    it("should set the corresponding option's isActive to true", () => {
      component.setOptionItemToActive(component.options.toArray()[1]);
      expect(component.options.toArray()[1].isActive).toBe(true);
    });
  });

  describe('resetAllActiveOptions', () => {
    it('should set all options isActive value to false for JbSimpleSelectOptionComponent', () => {
      component.options.toArray()[0].isActive = true;
      component.resetAllActiveOptions();
      expect(component.options.toArray()[0].isActive).toBe(false);
    });
  });

  describe('setSelectedOptionName', () => {
    it('should update placeholder name to the designated selected value', () => {
      const expected = 'Best Item Ever';
      component.options.toArray()[0].name = 'Best Item Ever';
      component.setSelectedOptionName(component.options.toArray()[0]);
      expect(component.selectedOption).toBe(expected);
    });
  });

  describe('getFocusIndexInBound', () => {
    it("should update the option's focus by -1", () => {
      const actual = component.getFocusIndexInBound(-1);
      const expected = 0;
      expect(actual).toEqual(expected);
    });
    it("should update the option's focus by 1", () => {
      const actual = component.getFocusIndexInBound(1);
      const expected = 1;
      expect(actual).toEqual(expected);
    });
    it('should round to bottom boundary', () => {
      const actual = component.getFocusIndexInBound(-100);
      const expected = 0;
      expect(actual).toEqual(expected);
    });
    it('should round to upper boundary', () => {
      const actual = component.getFocusIndexInBound(100);
      const expected = 1;
      expect(actual).toEqual(expected);
    });
  });

  describe('toggleDropdownMenu', () => {
    it('should toggle isOpen on click', () => {
      component.isOpen = false;
      component.listbox = {
        nativeElement: {
          style: { height: 0 },
          children: [],
        },
      };
      component.afterOpenedDropdownMenu();
      expect(component.isOpen).toEqual(true);
    });
  });

  describe('closeDropdownMenu', () => {
    it('should update isOpen to false as the dropdown menu is closed', () => {
      component.isOpen = true;
      component.afterClosedDropdownMenu();
      expect(component.isOpen).toEqual(false);
    });
  });

  describe('activeOptionIndex', () => {
    it('should return the index of the active option', () => {
      component.options.toArray()[1].isActive = true;
      expect(component.activeOptionIndex).toEqual(1);
    });
  });

  describe('findOptionByCurrentValue', () => {
    it('should return the component which value matches the active value', () => {
      component.options.toArray()[1].value = 1;
      component.value = 1;
      expect(component.findOptionByCurrentValue()).toEqual(
        component.options.toArray()[1]
      );
    });
  });

  describe('onChange', () => {
    it('should call onChange from extending ControlValueAccessor', () => {
      expect(component.onChange(1)).toBe(undefined);
    });
  });

  describe('onTouched', () => {
    it('should call onTouched from extending ControlValueAccessor', () => {
      expect(component.onTouched()).toBe(undefined);
    });
  });

  describe('registerOnChange', () => {
    it('should call registerOnChange from extending ControlValueAccessor', () => {
      expect(component.registerOnChange(jest.fn)).toBe(undefined);
    });
  });

  describe('registerOnTouched', () => {
    it('should call registerOnTouched from extending ControlValueAccessor', () => {
      expect(component.registerOnTouched(jest.fn)).toBe(undefined);
    });
  });

  describe('setDisabledState', () => {
    it('should set isDisabled to true if currently false', () => {
      const expected = true;
      component.isDisabled = false;
      component.setDisabledState(expected);
      expect(component.isDisabled).toBe(expected);
    });
    it('should set isDisabled to false if currently true', () => {
      const expected = false;
      component.isDisabled = true;
      component.setDisabledState(expected);
      expect(component.isDisabled).toBe(expected);
    });
  });
});
