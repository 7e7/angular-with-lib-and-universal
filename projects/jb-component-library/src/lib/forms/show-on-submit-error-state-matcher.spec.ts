import { FormControl, NgForm, Validators } from '@angular/forms';
import { ShowOnSubmitErrorStateMatcher } from './show-on-submit-error-state-matcher';

describe('ShowOnSubmitErrorStateMatcher', () => {
  let control: FormControl;
  let form: NgForm;
  let errorStateMatcher: ShowOnSubmitErrorStateMatcher;

  beforeEach(() => {
    control = new FormControl('', Validators.required);
    form = {} as any;
    errorStateMatcher = new ShowOnSubmitErrorStateMatcher();
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      (form as any).submitted = true;
    });

    it('should show error', () => {
      expect(errorStateMatcher.isErrorState(control, form)).toBe(true);
    });
  });

  describe('onTouched', () => {
    beforeEach(() => {
      control.markAsTouched();
      (form as any).submitted = false;
    });

    it('should not show error', () => {
      expect(errorStateMatcher.isErrorState(control, form)).toBe(false);
    });
  });
});
