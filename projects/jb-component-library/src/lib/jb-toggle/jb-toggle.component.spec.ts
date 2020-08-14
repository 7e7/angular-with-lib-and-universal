import { JbToggleComponent } from './jb-toggle.component';

describe('JbToggleComponent', () => {
  let mockToggleComponent;

  beforeEach(() => {
    mockToggleComponent = new JbToggleComponent();
  });

  describe('switchToggle', () => {
    it('should set value to true if it was false', () => {
      mockToggleComponent.value = false;
      mockToggleComponent.switchToggle();
      expect(mockToggleComponent.value).toBe(true);
    });

    it('should set value to false if it was true', () => {
      mockToggleComponent.value = true;
      mockToggleComponent.switchToggle();
      expect(mockToggleComponent.value).toBe(false);
    });

    it('should emit new value', (done) => {
      mockToggleComponent.value = true;
      mockToggleComponent.toggle.subscribe((event) => {
        expect(event).toEqual(false);
        done();
      });
      mockToggleComponent.switchToggle();
    });
  });
});
