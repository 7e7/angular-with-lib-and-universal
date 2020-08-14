import { JbFiltersContentComponent } from './jb-filters-content.component';

describe('JbFiltersContentComponent', () => {
  let component: JbFiltersContentComponent;

  beforeEach(() => {
    component = new JbFiltersContentComponent();
  });

  describe('onApply', () => {
    it('should emit the apply event', () => {
      spyOn(component.apply, 'emit');
      component.onApply();
      expect(component.apply.emit).toHaveBeenCalled();
    });
  });

  describe('onReset', () => {
    it('should emit the reset event', () => {
      spyOn(component.reset, 'emit');
      component.onReset();
      expect(component.reset.emit).toHaveBeenCalled();
    });
  });

  describe('onClose', () => {
    it('should emit the reset event', () => {
      spyOn(component.close, 'emit');
      component.onClose();
      expect(component.close.emit).toHaveBeenCalled();
    });
  });

  describe('onCancel', () => {
    it('should emit the cancel event', () => {
      spyOn(component.cancel, 'emit');
      component.onCancel();
      expect(component.cancel.emit).toHaveBeenCalled();
    });
  });

  describe('onCancel', () => {
    it('should emit the cancel event', () => {
      spyOn(component.cancel, 'emit');
      component.onCancel();
      expect(component.cancel.emit).toHaveBeenCalled();
    });
  });

  describe('applyOnMobile', () => {
    it('should emit the apply event', () => {
      spyOn(component.apply, 'emit');
      component.isMobile = true;
      component.applyOnMobile();
      expect(component.apply.emit).toHaveBeenCalled();
    });
  });
});
