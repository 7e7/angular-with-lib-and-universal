import { JbHintComponent } from './jb-hint.component';

describe('Component: JbHintComponent', () => {
  let component: JbHintComponent;

  beforeEach(() => {
    component = new JbHintComponent();
  });

  describe('setControl', () => {
    it('should set the control property', () => {
      const control: any = { ngControl: {} };

      component.setControl(control);

      expect(component.controls).toContain(control);
    });
  });
});
