import { JbCheckboxComponent } from './jb-checkbox.component';

describe('checkbox test: if the checkbox is not disabled', () => {
  let checkboxInstance: JbCheckboxComponent;
  // define any dependancies (found in constructor)
  let mockElRef: any;

  beforeEach(() => {
    mockElRef = {};
    checkboxInstance = new JbCheckboxComponent(mockElRef);
  });

  it('should set the focus to true when setFocus is called with true', () => {
    checkboxInstance.setFocus(true);
    expect(checkboxInstance.isFocused).toEqual(true);
  });

  it('should set the focus to false when setFocus is called with false', () => {
    checkboxInstance.setFocus(false);
    expect(checkboxInstance.isFocused).toEqual(false);
  });

  it('should uncheck the checkbox when the checkbox is checked', () => {
    checkboxInstance.checked = true;

    checkboxInstance._changeValue(document.createEvent('Event'));
    expect(checkboxInstance.checked).toEqual(false);
  });

  it('should check the checkbox when the checkbox is unchecked', () => {
    checkboxInstance.checked = false;

    checkboxInstance._changeValue(document.createEvent('Event'));
    expect(checkboxInstance.checked).toEqual(true);
  });
});

describe('checkbox test: if the checkbox is disabled', () => {
  let checkboxInstance: JbCheckboxComponent;
  let mockElRef: any;

  beforeEach(() => {
    mockElRef = {};
    checkboxInstance = new JbCheckboxComponent(mockElRef);
    checkboxInstance.disabled = true;
  });

  it('should not update the checkbox when checked', () => {
    checkboxInstance.checked = false;

    checkboxInstance._changeValue(document.createEvent('Event'));
    expect(checkboxInstance.checked).toEqual(false);
  });
});
