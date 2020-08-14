import { JbImageComponent } from './jb-image.component';
import { createStub } from '../test-helpers';

describe('JbImageComponent', () => {
  let component: JbImageComponent;
  let windowMock;
  let documentMock;
  let elementRefMock;

  const getMsEdgeUserAgent = (version: string) => {
    return (
      `Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko)` +
      `Chrome/42.0.2311.135 Safari/537.36 Edge/${version}`
    );
  };

  beforeEach(() => {
    windowMock = {};
    documentMock = {};
    elementRefMock = { nativeElement: {} };

    component = new JbImageComponent(
      elementRefMock,
      createStub(),
      createStub({ detectChanges: () => false }),
      true,
      windowMock,
      documentMock
    );
  });

  describe('getScrollPosition', () => {
    it('should return number of pixels that window is scrolled vertically plus the document height', () => {
      windowMock.scrollY = 5;
      documentMock.documentElement = { clientHeight: 3 };

      expect(component.getScrollPosition()).toBe(8);
    });

    it('should support alternative scroll and document height properties', () => {
      windowMock.pageYOffset = 13;
      documentMock.documentElement = {};
      documentMock.body = { clientHeight: 2 };
      expect(component.getScrollPosition()).toBe(15);
    });
  });

  describe('Microsoft Edge Detection', () => {
    beforeEach(() => {
      windowMock.navigator = {
        userAgent: getMsEdgeUserAgent('12.10136'),
      };
    });

    describe('getMicrosoftEdgeVersion', () => {
      it('should return the Edge version', () => {
        expect(component.getMicrosoftEdgeVersion()).toBe('12.10136');
      });
    });

    describe('isMicrosoftEdge', () => {
      it('should return true if user agent is MS Edge', () => {
        expect(component.isMicrosoftEdge()).toBe(true);
      });

      it('should return false if userAgent is not MS Edge', () => {
        windowMock.navigator.userAgent = 'Chrome';
        expect(component.isMicrosoftEdge()).toBe(false);
      });
    });

    describe('isMicrosoftEdge16OrBetter', () => {
      it('should return false for Edge 12', () => {
        expect(component.isMicrosoftEdge16OrBetter()).toBe(false);
      });

      it('should return true if version is 16 or greater', () => {
        windowMock.navigator.userAgent = getMsEdgeUserAgent('16.321');
        expect(component.isMicrosoftEdge16OrBetter()).toBe(true);
      });
    });
  });

  describe('hasCompatibleBrowser', () => {
    it('should return true if browser supports IntersectionObserver', () => {
      windowMock.IntersectionObserver = { iAmAMock: true };
      windowMock.navigator = { userAgent: 'Chrome' };
      expect(component.hasCompatibleBrowser()).toBe(true);
    });

    it('should return false if browser does not support IntersectionObserver and is not MS Edge 16+', () => {
      windowMock.navigator = { userAgent: 'Chrome' };
      expect(component.hasCompatibleBrowser()).toBe(false);
    });

    it('should return true if has IntersectionObserver and is MS Edge 16+', () => {
      windowMock.IntersectionObserver = {
        iAmAPrettyIntersectionObserver: true,
      };
      windowMock.navigator = {
        userAgent: getMsEdgeUserAgent('16.321'),
      };

      expect(component.hasCompatibleBrowser()).toBe(true);
    });
  });

  describe('src & placeholder', () => {
    it('should load the src when provided one', () => {
      const expectedSrc = 'assets/img/sampleimage.jpg';
      let nextSpy;

      component.src = expectedSrc;
      component.ngOnInit();

      spyOn(component.src$, 'next');
      nextSpy = component.src$.next;

      component.ngAfterContentInit();
      expect(nextSpy).toHaveBeenCalled();

      expect(nextSpy.calls.allArgs()[0][0]).toBe(expectedSrc);
    });

    it('should have a default placeholder image', () => {
      expect(/^data:image/.test(component.placeholder)).toBe(true);
    });
  });

  describe('isValidSrc', () => {
    it('should return true if src is gif', () => {
      const src = '/assets/img.gif';
      expect(component.isValidSrc(src)).toBe(true);
    });

    it('should return true if src is jpg', () => {
      expect(component.isValidSrc('123.jpg')).toBe(true);
      expect(component.isValidSrc('123.jpeg')).toBe(true);
    });

    it('should return true if src is tiff', () => {
      expect(component.isValidSrc('abc.tiff')).toBe(true);
    });

    it('should return true if src is png', () => {
      expect(component.isValidSrc('cat.png')).toBe(true);
    });

    it('should return if src is webp', () => {
      expect(component.isValidSrc('dog.webp')).toBe(true);
    });

    it('should return true if src is svg', () => {
      expect(component.isValidSrc('toronto.svg'));
    });

    it('should be case insensitive', () => {
      expect(component.isValidSrc('TREEHOUSE.JPG')).toBe(true);
    });

    it('should return false if src does not have recognized file extension', () => {
      expect(component.isValidSrc('my_novel.txt')).toBe(false);
    });
  });

  describe('isVisible', () => {
    it('should return true if element top offset position is less than or equal to the scroll position', () => {
      component.getScrollPosition = () => 42;
      elementRefMock.nativeElement = { offsetTop: 36 };
      expect(component.isVisible()).toBe(true);
    });

    it('should return false if element top offset is greater than scroll position', () => {
      component.getScrollPosition = () => 42;
      elementRefMock.nativeElement = { offsetTop: 50 };
      expect(component.isVisible()).toBe(false);
    });
  });

  describe('checkIsIntersecting', () => {
    it("should return true if entry.isIntersecting is true and target is component's native element", () => {
      const entryMock = createStub({
        isIntersecting: true,
        target: elementRefMock.nativeElement,
      });
      expect(component.checkIfIntersecting(entryMock)).toBe(true);
    });

    it('should return false if entry.isIntersecting is false', () => {
      const entryMock = createStub({
        isIntersecting: false,
        target: elementRefMock.nativeElement,
      });
      expect(component.checkIfIntersecting(entryMock)).toBe(false);
    });

    it("should return false if target is not component's native element", () => {
      const entryMock = createStub({ isIntersecting: true });
      expect(component.checkIfIntersecting(entryMock)).toBe(false);
    });
  });
});
