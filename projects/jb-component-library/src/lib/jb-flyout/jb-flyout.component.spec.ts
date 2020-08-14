import { Subject } from 'rxjs';
import { JbFlyoutComponent } from './jb-flyout.component';
import { Toggleable } from '../types/jb-toggleable.interface';
import { JbViewPortService } from '../jb-utils/utils.module';
import Popper from 'popper.js';
import Offset = Popper.Offset;

describe('JbFlyoutComponent', () => {
  let component: JbFlyoutComponent;
  let anchor: any;
  const window = { innerHeight: 800 };
  let viewportService: JbViewPortService;
  const isMobileSubject$ = new Subject<boolean>();

  beforeEach(() => {
    viewportService = {
      isMobile$: () => isMobileSubject$,
    } as any;

    component = new JbFlyoutComponent(window, viewportService);
    anchor = {
      isOpen: true,
      open: jest.fn(() => (anchor.isOpen = true)),
      close: jest.fn(() => (anchor.isOpen = false)),
      getIsOpen: () => anchor.isOpen,
    };

    component.currentAnchor = anchor as Toggleable;
  });

  describe('close', () => {
    it('should close on current anchor', () => {
      component.close();

      expect(anchor.close).toHaveBeenCalled();
    });
  });

  describe('setWidthToAnchorWidth', () => {
    const anchorWidthPixels = '200px';
    const anchorWidth = '200';

    it('should set width to anchor width if fitToAnchorWidth is true', () => {
      component.fitToAnchorWidth = true;
      component.setWidthToAnchorWidth(anchorWidthPixels);
      expect(component.width).toEqual(anchorWidthPixels);
    });

    it('should set max width to anchor width when fitToAnchorWidth is true', () => {
      component.fitToAnchorWidth = true;
      component.maxWidth = '150';
      component.setWidthToAnchorWidth(anchorWidthPixels);

      expect(component.currentMaxWidth).toEqual(anchorWidth);
      expect(component.width).toEqual(anchorWidthPixels);
    });

    it('should set minWidth to anchor width when fitToAnchorWidth is true', () => {
      component.fitToAnchorWidth = true;
      component.minWidth = '250';
      component.setWidthToAnchorWidth(anchorWidthPixels);
      expect(component.currentMinWidth).toEqual(anchorWidth);
      expect(component.width).toEqual(anchorWidthPixels);
    });

    it('should not let max width be less than anchor width when minIsAnchorWidth is true', () => {
      component.minIsAnchorWidth = true;
      component.maxWidth = '150';
      component.setWidthToAnchorWidth(anchorWidthPixels);
      expect(component.currentMaxWidth).toEqual(anchorWidth);
    });

    it('should not let min width be less than anchor width when minIsAnchorWidth is true', () => {
      component.minIsAnchorWidth = true;
      component.minWidth = '150';
      component.setWidthToAnchorWidth(anchorWidthPixels);
      expect(component.currentMinWidth).toEqual(anchorWidth);
    });

    it('should use min and max widths when minIsAnchorWidth and fitToAnchor are false', () => {
      component.fitToAnchorWidth = false;
      component.minIsAnchorWidth = false;
      component.minWidth = '100';
      component.maxWidth = '150';
      component.setWidthToAnchorWidth(anchorWidthPixels);
      expect(component.currentMaxWidth).toEqual('150');
      expect(component.currentMinWidth).toEqual('100');
      expect(component.width).toEqual(null);
    });
  });

  describe('flip', () => {
    describe('overflow boundaries', () => {
      it('should return true if flyout overflows right boundary', () => {
        const flyout1 = { left: 100 };
        const anchor1 = { left: 200 };
        component.flyoutOffsetX = 10;

        expect(
          component.doesFlyoutOverflowRightBoundary(flyout1, anchor1)
        ).toBe(true);
      });
      it('should return false if flyout does not overflow right boundary', () => {
        const flyout1 = { left: 200 };
        const anchor1 = { left: 100 };
        component.flyoutOffsetX = 10;

        expect(
          component.doesFlyoutOverflowRightBoundary(flyout1, anchor1)
        ).toBe(false);
      });
      it('should return true if flyout overflows left boundary', () => {
        const flyout1 = { left: 200, width: 75 };
        const anchor1 = { left: 100, width: 50 };
        component.flyoutOffsetX = 10;

        expect(component.doesFlyoutOverflowLeftBoundary(flyout1, anchor1)).toBe(
          true
        );
      });
      it('should return false if flyout does not overflow left boundary', () => {
        const flyout1 = { left: 100, width: 75 };
        const anchor1 = { left: 200, width: 50 };
        component.flyoutOffsetX = 10;

        expect(component.doesFlyoutOverflowLeftBoundary(flyout1, anchor1)).toBe(
          false
        );
      });
    });
  });

  describe('displayFlyoutUnderAnchor', () => {
    it('should place the flyout under the anchor when there is no bounding rectangle', () => {
      const flyout: Offset = { top: 0, width: 0, height: 0, left: 100 };
      const anchorOffset = { top: 150, left: 150, height: 50 };
      const anchorBoundingRect = {};
      const boundaryElementRect = null;
      component.flyoutOffsetY = 10;
      component.displayFlyoutUnderAnchor(
        flyout,
        anchorOffset,
        anchorBoundingRect,
        boundaryElementRect
      );
      expect(flyout.top).toEqual(210);
    });
    it('should place the flyout under the anchor when there is a bounding rectangle', () => {
      const flyout: Offset = { top: 0, width: 0, height: 0, left: 100 };
      const anchorOffset = { top: 150, left: 150, height: 50 };
      const anchorBoundingRect = {
        top: 150,
        left: 150,
        bottom: 200,
        right: 200,
      };
      const boundaryElementRect = {
        top: 100,
        left: 100,
        bottom: 400,
        right: 400,
      };
      component.flyoutOffsetY = 10;
      component.displayFlyoutUnderAnchor(
        flyout,
        anchorOffset,
        anchorBoundingRect,
        boundaryElementRect
      );
      expect(flyout.top).toEqual(210);
    });
    it('should place the flyout within the bounding rectangle', () => {
      const flyout: Offset = { top: 0, width: 0, height: 0, left: 100 };
      const anchorOffset = { top: 150, left: 150, height: 50 };
      const anchorBoundingRect = { top: 0, left: 150, bottom: 50, right: 200 };
      const boundaryElementRect = {
        top: 100,
        left: 100,
        bottom: 400,
        right: 400,
      };
      component.flyoutOffsetY = 10;
      component.displayFlyoutUnderAnchor(
        flyout,
        anchorOffset,
        anchorBoundingRect,
        boundaryElementRect
      );
      expect(flyout.top).toEqual(260);
    });
  });

  describe('displayFlyoutOverAnchor', () => {
    it('should place the flyout over the anchor when there is no bounding rectangle', () => {
      const flyout: Offset = { top: 0, width: 0, height: 200, left: 100 };
      const anchorOffset = { top: 350, left: 150, height: 50 };
      const anchorBoundingRect = {};
      const boundaryElementRect = null;
      component.flyoutOffsetY = 10;
      component.displayFlyoutOverAnchor(
        flyout,
        anchorOffset,
        anchorBoundingRect,
        boundaryElementRect
      );
      expect(flyout.top).toEqual(140);
    });
    it('should place the flyout over the anchor when there is a bounding rectangle', () => {
      const flyout: Offset = { top: 0, width: 0, height: 100, left: 100 };
      const anchorOffset = { top: 200, left: 150, height: 50 };
      const anchorBoundingRect = {
        top: 200,
        left: 150,
        bottom: 250,
        right: 200,
      };
      const boundaryElementRect = {
        top: 100,
        left: 100,
        bottom: 400,
        right: 400,
      };
      component.flyoutOffsetY = 10;
      component.displayFlyoutOverAnchor(
        flyout,
        anchorOffset,
        anchorBoundingRect,
        boundaryElementRect
      );
      expect(flyout.top).toEqual(90);
    });
    it('should place the flyout within the bounding rectangle', () => {
      const flyout: Offset = { top: 0, width: 0, height: 100, left: 100 };
      const anchorOffset = { top: 500, left: 150, height: 50 };
      const anchorBoundingRect = {
        top: 500,
        left: 150,
        bottom: 50,
        right: 200,
      };
      const boundaryElementRect = {
        top: 100,
        left: 100,
        bottom: 400,
        right: 400,
      };
      component.flyoutOffsetY = 10;
      component.displayFlyoutOverAnchor(
        flyout,
        anchorOffset,
        anchorBoundingRect,
        boundaryElementRect
      );
      expect(flyout.top).toEqual(290);
    });
  });

  describe('flyoutBottomOverflow', () => {
    it('should return a positive overflow when the flyout does not fit', () => {
      const flyout: Offset = { top: 0, width: 0, height: 200, left: 100 };
      const anchorBoundingRect: any = { top: 400, left: 150, height: 50 };
      const boundaryElementRect = null;
      window.innerHeight = 600;
      component.flyoutOffsetY = 10;
      const topOverflow = component.flyoutBottomOverflow(
        flyout,
        anchorBoundingRect,
        boundaryElementRect
      );
      expect(topOverflow).toEqual(60);
    });
    it('should return a negative overflow when the flyout does fit', () => {
      const flyout: Offset = { top: 0, width: 0, height: 200, left: 100 };
      const anchorBoundingRect: any = { top: 300, left: 150, height: 50 };
      const boundaryElementRect = null;
      window.innerHeight = 600;
      component.flyoutOffsetY = 10;
      const topOverflow = component.flyoutBottomOverflow(
        flyout,
        anchorBoundingRect,
        boundaryElementRect
      );
      expect(topOverflow).toEqual(-40);
    });
    it('should return take into account the bounding rectangle', () => {
      const flyout: Offset = { top: 0, width: 0, height: 200, left: 100 };
      const anchorBoundingRect: any = { top: 300, left: 150, height: 50 };
      const boundaryElementRect: any = {
        top: 100,
        left: 100,
        bottom: 500,
        right: 400,
      };
      component.flyoutOffsetY = 10;
      const topOverflow = component.flyoutBottomOverflow(
        flyout,
        anchorBoundingRect,
        boundaryElementRect
      );
      expect(topOverflow).toEqual(60);
    });
  });
});
