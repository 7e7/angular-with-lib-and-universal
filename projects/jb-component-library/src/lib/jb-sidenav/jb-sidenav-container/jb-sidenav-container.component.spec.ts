import { JbSidenavContainerComponent } from './jb-sidenav-container.component';
import { createSimpleChangesMock, createStub } from '../../test-helpers';
import { KeyboardKey } from '../../jb-utils/keyboard-key.enum';

describe('JbSideNavContainerComponent', () => {
  let component: JbSidenavContainerComponent;
  let contentMock;

  beforeEach(() => {
    contentMock = {
      setScroll: jest.fn(),
      returnFocus: jest.fn(),
      removeFocus: jest.fn(),
    };

    component = new JbSidenavContainerComponent();
    component.content = contentMock;
  });

  describe('closeNav', () => {
    it('should return scroll to content', () => {
      component.closeNav();
      expect(contentMock.setScroll.mock.calls.length).toBe(1);
      expect(contentMock.setScroll.mock.calls[0][0]).toBe(true);
    });

    it('should return focus to content', () => {
      component.closeNav();
      expect(contentMock.returnFocus.mock.calls.length).toBe(1);
    });

    it('should set isOpen to false', () => {
      component.isOpen = true;
      component.closeNav();
      expect(component.isOpen).toBe(false);
    });

    it('should emit isOpenChange event with false', (done) => {
      component.isOpenChange.subscribe((value) => {
        expect(value).toBe(false);
        done();
      });

      component.closeNav();
    });
  });

  describe('openNav', () => {
    it('should disable scrolling on content', () => {
      component.openNav();
      expect(contentMock.setScroll.mock.calls.length).toBe(1);
      expect(contentMock.setScroll.mock.calls[0][0]).toBe(false);
    });

    it('should remove content focus', () => {
      component.openNav();
      expect(contentMock.removeFocus.mock.calls.length).toBe(1);
    });

    it('should set isOpen to true', () => {
      component.isOpen = false;
      component.openNav();
      expect(component.isOpen).toBe(true);
    });

    it('should emit isOpen event with true', (done) => {
      component.isOpenChange.subscribe((value) => {
        expect(value).toBe(true);
        done();
      });
      component.openNav();
    });
  });

  describe('onKeyDown', () => {
    it('should close if ESC key', () => {
      const keyEventMock = createStub({
        key: KeyboardKey.Escape,
      });

      component.isOpen = true;

      component.onKeyDown(keyEventMock);
      expect(component.isOpen).toBe(false);
    });

    it('should not close if non-ESC key', () => {
      const keyEventMock = createStub({
        keyCode: KeyboardKey.Space,
      });

      component.isOpen = true;
      component.onKeyDown(keyEventMock);
      expect(component.isOpen).toBe(true);
    });
  });

  describe('ngOnChanges', () => {
    it('should close if isOpen becomes false', () => {
      const changes = createSimpleChangesMock('isOpen', false);
      component.isOpen = true;
      component.ngOnChanges(changes);
      expect(component.isOpen).toBe(false);
    });

    it('should open if isOpen become true', () => {
      const changes = createSimpleChangesMock('isOpen', true);
      component.isOpen = false;
      component.ngOnChanges(changes);
      expect(component.isOpen).toBe(true);
    });
  });
});
