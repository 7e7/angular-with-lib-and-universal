import { JbScrollService } from './scroll.service';

describe('JbScrollService', () => {
  let service: JbScrollService;
  let documentMock;
  let windowMock;
  let deviceServiceMock;

  beforeEach(() => {
    documentMock = {
      body: {
        classList: {
          remove: jest.fn(),
          add: jest.fn(),
        },
      },
    };

    windowMock = {
      pageXOffset: 23,
      scrollTo: jest.fn(),
    };

    deviceServiceMock = {
      ios: false,

      isIOS() {
        // tslint:disable-next-line:no-invalid-this
        return this.ios;
      },
    };

    service = new JbScrollService(documentMock, windowMock, deviceServiceMock);
  });

  describe('enableScroll', () => {
    it('should remove class disable-scroll-in-layer', () => {
      const removeSpy = documentMock.body.classList.remove;
      service.enableScroll();
      expect(removeSpy.mock.calls.length).toBe(1);
      expect(removeSpy.mock.calls[0][0]).toBe(service.DISABLE_SCROLL_IN_LAYER);
    });

    // integration

    it.skip('should special handle enable scroll for ios', () => {
      /** */
    });
  });

  describe('disableScroll', () => {
    it('should add class disable-scroll-in-layer', () => {
      const addSpy = documentMock.body.classList.add;
      service.disableScroll();
      expect(addSpy.mock.calls.length).toBe(1);
      expect(addSpy.mock.calls[0][0]).toBe(service.DISABLE_SCROLL_IN_LAYER);
    });

    // integration

    it.skip('should special handle disable scroll for ios', () => {
      /** */
    });
  });

  describe('scrollToPosition', () => {
    it('should call window.scrollTo', () => {
      const expected = { top: 10, left: 5, behavior: 'smooth' };
      service.scrollToPosition(10, 5);
      expect(windowMock.scrollTo.mock.calls[0][0]).toEqual(expected);
    });
  });

  describe('scrollToTop', () => {
    it('should scroll to top:0, left: window.getPageXOffset', () => {
      const expected = {
        top: 0,
        left: windowMock.pageXOffset,
        behavior: 'smooth',
      };
      service.scrollToTop();
      expect(windowMock.scrollTo.mock.calls[0][0]).toEqual(expected);
    });
  });

  describe('registerScrollHandler and removeScrollHandler', () => {
    const myHandler = () => true;

    it('registerScrollHandler should set window.onscroll', () => {
      service.registerScrollHandler(myHandler);
      expect(windowMock.onscroll).toBe(myHandler);
    });

    it('removeScrollHandler should set window.onscroll to null', () => {
      service.registerScrollHandler(myHandler);
      expect(windowMock.onscroll).toBeDefined();

      service.removeScrollHandler();
      expect(windowMock.onscroll).toBeNull();
    });
  });

  describe('focusElementWithNoScroll', () => {
    let elementMock;

    beforeEach(() => {
      elementMock = {
        setAttribute: jest.fn(),
        focus: jest.fn(),
      };

      service.focusElementWithNoScroll(elementMock);
    });

    it('should set tabindex attribute on element to 0', () => {
      expect(elementMock.setAttribute.mock.calls[0][0]).toBe('tabindex');
      expect(elementMock.setAttribute.mock.calls[0][1]).toBe('0');
    });

    it('should call focus with preventScroll', () => {
      expect(elementMock.focus.mock.calls[0][0]).toEqual({
        preventScroll: true,
      });
    });
  });
});
