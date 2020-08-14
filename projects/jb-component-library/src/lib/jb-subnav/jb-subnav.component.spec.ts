import { JbSubNavComponent } from './jb-subnav.component';
import { createStub } from '../test-helpers';

describe('JbSubNavComponent', () => {
  let component: JbSubNavComponent;

  beforeEach(() => {
    component = new JbSubNavComponent();
  });

  describe('openNav', () => {
    it('should set isOpen to true', () => {
      component.isOpen = false;
      component.openNav();
      expect(component.isOpen).toBe(true);
    });

    it('should emit the isOpenChange event with true', (done) => {
      component.isOpenChange.subscribe((value: boolean) => {
        expect(value).toBe(true);
        done();
      });

      component.openNav();
    });
  });

  describe('closeNav', () => {
    it('should set isOpen to false', () => {
      component.isOpen = true;
      component.closeNav();
      expect(component.isOpen).toBe(false);
    });

    it('should emit the isOpenChange event with false', (done) => {
      component.isOpenChange.subscribe((value: boolean) => {
        expect(value).toBe(false);
        done();
      });
      component.closeNav();
    });
  });

  describe('ngOnChanges', () => {
    it('should open if isOpen input changes to true', () => {
      component.isOpen = false;
      component.ngOnChanges(createStub({ isOpen: { currentValue: true } }));
      expect(component.isOpen).toBe(true);
    });

    it('should close if isOpen input changes to false', () => {
      component.isOpen = true;
      component.ngOnChanges(createStub({ isOpen: { currentValue: false } }));
      expect(component.isOpen).toBe(false);
    });
  });
});
