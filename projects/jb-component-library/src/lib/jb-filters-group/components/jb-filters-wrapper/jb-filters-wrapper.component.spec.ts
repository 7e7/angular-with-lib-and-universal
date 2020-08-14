import { JbFilterWrapperComponent } from './jb-filters-wrapper.component';
import { createStub } from '../../../test-helpers';
import { Observable } from 'rxjs';

describe('JbFiltersWrapperComponent', () => {
  let component: JbFilterWrapperComponent;
  const mockObs$ = new Observable<boolean>();
  const mockViewPortService = {
    isMobile$: () => mockObs$,
  };

  beforeEach(() => {
    component = new JbFilterWrapperComponent(createStub(mockViewPortService));
    component.button = {
      isVisible: false,
      isApplied: false,
      setFocus: jest.fn(),
    } as any;
    component.popoverAnchor = {
      toggle: jest.fn(),
      close: jest.fn(),
    } as any;
    component.content = {
      isApplied: false,
      onApply: jest.fn(),
    } as any;
  });

  describe('isApplied', () => {
    it('should set children isApplied', () => {
      component.isApplied = true;

      expect(component.button.isApplied).toBe(true);
      expect(component.content.isApplied).toBe(true);
    });
  });

  describe('toggle', () => {
    it('should call toggle on popoverAnchor', () => {
      component.toggle();

      expect(component.popoverAnchor.toggle).toHaveBeenCalled();
    });
  });

  describe('hide', () => {
    it('should call close on popoverAnchor', () => {
      component.hide();

      expect(component.popoverAnchor.close).toHaveBeenCalled();
    });
  });

  describe('focusButton', () => {
    it('should focus button', () => {
      component.focusButton();

      expect(component.button.setFocus).toHaveBeenCalled();
    });
  });

  describe('apply', () => {
    it('should emit the apply event', () => {
      component.apply();
      expect(component.content.onApply).toHaveBeenCalled();
    });

    it('should not emit the apply event when isMobile is true', () => {
      component.isMobile = true;
      component.apply();
      expect(component.content.onApply).not.toHaveBeenCalled();
    });
  });
});
