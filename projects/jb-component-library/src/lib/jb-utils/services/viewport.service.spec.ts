import { JbViewPortService } from './viewport.service';
import { BREAKPOINTS } from '../breakpoints.constant';

describe('JbViewPortService on initial load', () => {
  let service: JbViewPortService;
  let windowMock;
  let isMobile;

  beforeEach(() => {
    windowMock = {
      // tslint:disable-next-line:no-empty
      addEventListener: () => {},
    };
    service = new JbViewPortService(windowMock);
  });

  describe('when viewport is mobile width or smaller', () => {
    beforeEach(() => {
      windowMock = {
        // tslint:disable-next-line:no-empty
        addEventListener: () => {},
        innerWidth: BREAKPOINTS.mobile_max,
      };
      service = new JbViewPortService(windowMock);
    });

    it('should return true', () => {
      service
        .isMobile$()
        .subscribe((isMobileWidth) => (isMobile = isMobileWidth));
      expect(isMobile).toBe(true);
    });
  });

  describe('when viewport is tablet width or larger', () => {
    beforeEach(() => {
      windowMock = {
        // tslint:disable-next-line:no-empty
        addEventListener: () => {},
        innerWidth: BREAKPOINTS.mobile_max + 1,
      };
      service = new JbViewPortService(windowMock);
    });

    it('should return false', () => {
      service
        .isMobile$()
        .subscribe((isMobileWidth) => (isMobile = isMobileWidth));
      expect(isMobile).toBe(false);
    });
  });
});
