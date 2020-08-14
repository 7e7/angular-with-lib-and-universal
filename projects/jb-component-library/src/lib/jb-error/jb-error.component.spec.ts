import { JbErrorComponent } from './jb-error.component';

describe('Component: JbErrorComponent', () => {
  let component: JbErrorComponent;

  beforeEach(() => {
    component = new JbErrorComponent();
  });

  describe('setControl', () => {
    it('should set the control property', () => {
      const control: any = { ngControl: {} };

      component.setControl(control);

      expect(component.controls).toContain(control);
    });
  });
});
