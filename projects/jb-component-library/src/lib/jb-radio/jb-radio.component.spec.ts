import { JbRadioComponent } from './jb-radio.component';
import { JbRadioGroupComponent } from './jb-radio-group.component';

describe('JbRadioComponent', () => {
  let component: JbRadioComponent;

  beforeEach(() => {
    component = new JbRadioComponent(new JbRadioGroupComponent());
    component.value = '1';
  });

  describe('_changeValue', () => {
    it('should emit valueChanged event', (done) => {
      const muhValue = 'muh value';

      component.valueChanged.subscribe((value) => {
        expect(value).toEqual(muhValue);
        done();
      });

      component.value = muhValue;
      component._changeValue();
    });
  });

  describe('writeValue', () => {
    it('should set checked if value  matches local value', () => {
      component.checked = false;
      component.writeValue('1');
      expect(component.checked).toBe(true);
    });

    it("should not be checked if the value doesn't match the local value", () => {
      component.checked = false;
      component.writeValue('124');
      expect(component.checked).toBe(false);
    });

    it('should not be checked if the value is undefined', () => {
      component.checked = false;
      component.writeValue(undefined);
      expect(component.checked).toBe(false);
    });
  });
});
