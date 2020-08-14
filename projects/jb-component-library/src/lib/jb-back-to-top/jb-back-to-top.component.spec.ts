import { JbBackToTopComponent } from './jb-back-to-top.component';
import { createStub } from '../test-helpers';

describe('Component: JbBackToTopComponent', () => {
  let windowMock;
  let scrollServiceMock;

  let component: JbBackToTopComponent;

  beforeEach(() => {
    windowMock = {
      innerHeight: 100,
      pageYOffset: 0,
    };

    scrollServiceMock = {
      registerScrollHandler: jest.fn(),
      removeScrollHandler: jest.fn(),
    };

    component = new JbBackToTopComponent(
      scrollServiceMock,
      windowMock,
      createStub()
    );
  });

  describe('ngOnInit', () => {
    it('should register scroll handler', () => {
      component.ngOnInit();
      expect(scrollServiceMock.registerScrollHandler.mock.calls.length).toBe(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should remove scroll handler', () => {
      component.ngOnDestroy();
      expect(scrollServiceMock.removeScrollHandler.mock.calls.length).toBe(1);
    });
  });

  describe('updateIsVisible', () => {
    it('should set isVisible to true if pageYOffset is greater than screen height * 4', () => {
      component.isVisible = false;
      windowMock.pageYOffset = 401;
      component.updateIsVisible();
      expect(component.isVisible).toBe(true);
    });

    it('should set isVisible to false if pageYOffset is less than screen height * 4', () => {
      component.isVisible = true;
      windowMock.pageYOffset = 399;
      component.updateIsVisible();
      expect(component.isVisible).toBe(false);
    });
  });
});
