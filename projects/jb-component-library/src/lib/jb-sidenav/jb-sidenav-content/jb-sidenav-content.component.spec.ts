import { JbSidenavContentComponent } from './jb-sidenav-content.component';
import { createStub } from '../../test-helpers';

describe('JbSideNavContentComponent', () => {
  let component: JbSidenavContentComponent;
  let focusHelperMock;

  beforeEach(() => {
    focusHelperMock = {
      removeElementFocus: jest.fn(),
      returnElementFocus: jest.fn(),
    };

    component = new JbSidenavContentComponent(
      createStub(),
      createStub(),
      createStub(focusHelperMock)
    );
  });

  describe('onScroll, onMouseWheel and onTouchMove', () => {
    let eventMock;

    beforeEach(() => {
      eventMock = {
        preventDefault: jest.fn(),
      };
    });

    describe('removeFocus', () => {
      it('should call removeElementFocus on JbFocusHelper', () => {
        component.removeFocus();
        expect(focusHelperMock.removeElementFocus.mock.calls.length).toBe(1);
      });
    });

    describe('returnFocus', () => {
      it('should call returnElementFocus on JbFocusHelper', () => {
        component.returnFocus();
        expect(focusHelperMock.returnElementFocus.mock.calls.length).toBe(1);
      });
    });

    describe('onScroll', () => {
      it('should prevent default behaviour if scrolling is disabled', () => {
        component.setScroll(false);
        component.onScroll(eventMock);
        expect(eventMock.preventDefault.mock.calls.length).toBe(1);
      });

      it('should not prevent default behaviour if scrolling is enabled', () => {
        component.setScroll(true);
        component.onScroll(eventMock);
        expect(eventMock.preventDefault.mock.calls.length).toBe(0);
      });
    });

    describe('onMouseWheel', () => {
      it('should prevent default behaviour if scrolling is disabled', () => {
        component.setScroll(false);
        component.onMouseWheel(eventMock);
        expect(eventMock.preventDefault.mock.calls.length).toBe(1);
      });

      it('should not prevent default behaviour if scrolling is enabled', () => {
        component.setScroll(true);
        component.onMouseWheel(eventMock);
        expect(eventMock.preventDefault.mock.calls.length).toBe(0);
      });
    });

    describe('onTouchMove', () => {
      it('should prevent default behaviour if scrolling is disabled', () => {
        component.setScroll(false);
        component.onTouchMove(eventMock);
        expect(eventMock.preventDefault.mock.calls.length).toBe(1);
      });

      it('should not prevent default behaviour if scrolling is enabled', () => {
        component.setScroll(true);
        component.onTouchMove(eventMock);
        expect(eventMock.preventDefault.mock.calls.length).toBe(0);
      });
    });
  });
});
