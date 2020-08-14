import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  TemplateRef,
  Output,
  ViewChild,
  Input,
  OnInit,
  ElementRef,
  Inject,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PopperOptions, Data, Offset, Placement } from 'popper.js';
import { Toggleable } from '../types/jb-toggleable.interface';
import { getNativeElement } from '../jb-utils/utilities.functions';
import { WINDOW } from '../jb-utils/injection-tokens';
import { JbViewPortService } from '../jb-utils/utils.module';

@Component({
  selector: 'jb-flyout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './jb-flyout.component.html',
})
export class JbFlyoutComponent implements OnInit, OnDestroy, OnChanges {
  @Input() ariaDescribedBy: string;
  @Input() ariaLabelledBy: string;
  @Input() cornerRadiusBottom = '6px';
  @Input() cornerRadiusTop = '0px';
  @Input() boxShadow: string;
  @Input() width: string;
  @Input() minWidth: string;
  @Input() maxWidth: string;
  @Input() offsetX = '0px';
  @Input() offsetY = '0px';
  @Input() placement: 'bottom-start' | 'bottom-end' = 'bottom-start';
  @Input() horizontalFlipping = true;
  @Input() verticalFlipping = true;
  @Input() boundaryElement: HTMLElement | ElementRef;
  @Input() fitToAnchorWidth = false;
  @Input() enableFocusTrap = true;
  @Input() focusOnContainer: boolean;
  @Input() fullscreenOnPhone = false;
  @Input() customStylesOnPhone = false;
  @Input() visibility: string;
  @Input() minIsAnchorWidth = true; // Does not shrink below anchor width

  @Output() beforeOpened = new EventEmitter<any>();
  @Output() afterOpened = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  // flyout can be attached to multiple anchors
  currentAnchor: Toggleable;
  anchorWidth: string;
  currentMinWidth: string;
  currentMaxWidth: string;
  options: PopperOptions = {};
  isMobileSubscription: Subscription;
  isMobile: boolean;
  flyoutOffsetX: number;
  flyoutOffsetY: number;

  constructor(
    @Inject(WINDOW) private window,
    private viewportService: JbViewPortService
  ) {}

  ngOnInit() {
    this.setPopperOptions();
    this.isMobileSubscription = this.viewportService
      .isMobile$()
      .subscribe((isMobileWidth) => {
        this.isMobile = isMobileWidth;
      });
    this.currentMinWidth = this.minWidth;
    this.currentMaxWidth = this.maxWidth;
  }

  ngOnDestroy(): void {
    this.isMobileSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.fitToAnchorWidth ||
      (changes.minIsAnchorWidth && this.anchorWidth)
    ) {
      this.setWidthToAnchorWidth(this.anchorWidth);
    }
    if (
      changes.horizontalFlipping ||
      changes.verticalFlipping ||
      changes.offsetX ||
      changes.offsetY ||
      changes.placement
    ) {
      this.setPopperOptions();
    }
  }

  setPopperOptions() {
    this.flyoutOffsetX = Number.parseInt(this.offsetX, 10);
    this.flyoutOffsetY = Number.parseInt(this.offsetY, 10);
    this.options = {
      placement: this.placement,
      modifiers: {
        offset: {
          enabled: true,
          offset: `${this.flyoutOffsetX},${this.flyoutOffsetY}`,
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: !(
            this.horizontalFlipping || this.verticalFlipping
          ),
          boundariesElement: this.boundaryElement
            ? getNativeElement(this.boundaryElement)
            : 'viewport',
        },
        flip:
          this.horizontalFlipping || this.verticalFlipping
            ? {
                enabled: true,
                fn: this.handleFlipping,
              }
            : {
                enabled: false,
              },
      },
    };
  }

  setWidthToAnchorWidth(anchorWidth) {
    if (!anchorWidth) {
      return;
    }
    this.anchorWidth = anchorWidth;
    let width = null;
    let currentMinWidth = this.minWidth;
    let currentMaxWidth = this.maxWidth;
    const nAnchorWidth = anchorWidth.split('px')[0];
    if (this.fitToAnchorWidth) {
      currentMinWidth = nAnchorWidth;
      currentMaxWidth = nAnchorWidth;
      width = anchorWidth;
    } else if (this.minIsAnchorWidth) {
      const minWidth = this.minWidth ? parseInt(this.minWidth, 10) : null;
      if (!minWidth || minWidth < nAnchorWidth) {
        currentMinWidth = nAnchorWidth;
      }
      const maxWidth = this.maxWidth ? parseInt(this.maxWidth, 10) : null;
      if (maxWidth && maxWidth < nAnchorWidth) {
        currentMaxWidth = nAnchorWidth;
      }
    }
    this.width = width;
    this.currentMinWidth = currentMinWidth;
    this.currentMaxWidth = currentMaxWidth;
  }

  forceOpen(bool) {
    if (this.currentAnchor) {
      this.currentAnchor.forceOpen(bool);
    }
  }

  forceClose(bool) {
    if (this.currentAnchor) {
      this.currentAnchor.forceClose(bool);
    }
  }

  toggle() {
    if (!this.currentAnchor) {
      return;
    }

    // Anchor must be open for flyout to have a reference to it,
    // so it'll never make sense to "open" via the flyout because
    // it'll never know which anchor to attach to.
    this.currentAnchor.close();
  }

  close(value?: any) {
    if (!this.currentAnchor) {
      return;
    }
    this.currentAnchor.close(value);
  }

  doesFlyoutOverflowRightBoundary = (flyout, anchor) =>
    flyout.left < anchor.left + this.flyoutOffsetX;

  doesFlyoutOverflowLeftBoundary = (flyout, anchor) =>
    flyout.left >
    anchor.left + anchor.width + this.flyoutOffsetX - flyout.width;

  flipToBottomEnd = (
    flyout: Offset,
    anchor: Offset,
    placement: Placement,
    anchorBoundingRect: ClientRect,
    boundaryElementRect: ClientRect
  ) => {
    flyout.left = anchor.left + anchor.width - flyout.width;
    placement = 'bottom-end';
    if (
      boundaryElementRect &&
      anchorBoundingRect.right > boundaryElementRect.right
    ) {
      flyout.left -= anchorBoundingRect.right - boundaryElementRect.right;
    }
  };

  flipToBottomStart = (
    flyout: Offset,
    anchor: Offset,
    placement: Placement
  ) => {
    flyout.left = anchor.left;
    placement = 'bottom-start';
  };

  handleHorizontalFlipping(
    flyout: Offset,
    anchor: Offset,
    placement: Placement,
    anchorBoundingRect: ClientRect,
    boundaryElementRect: ClientRect
  ) {
    if (
      placement === 'bottom-start' &&
      this.doesFlyoutOverflowRightBoundary(flyout, anchor)
    ) {
      this.flipToBottomEnd(
        flyout,
        anchor,
        placement,
        anchorBoundingRect,
        boundaryElementRect
      );
    } else if (
      placement === 'bottom-end' &&
      this.doesFlyoutOverflowLeftBoundary(flyout, anchor)
    ) {
      this.flipToBottomStart(flyout, anchor, placement);
    }

    // If the anchor is outside the boundary to the left, then move it
    // back inside the boundary
    if (
      boundaryElementRect &&
      anchorBoundingRect.right < boundaryElementRect.left
    ) {
      flyout.left += boundaryElementRect.left - anchorBoundingRect.right;
    }
  }

  // Calculates the top overflow based on the viewport or boundary element
  flyoutTopOverflow = (
    flyout: Offset,
    anchorBoundingRect: ClientRect,
    boundaryElementRect: ClientRect
  ) => {
    // topOverflow will be positive when outside the bounds
    const topOverflow = boundaryElementRect
      ? boundaryElementRect.top -
        (anchorBoundingRect.top - flyout.height - this.flyoutOffsetY)
      : flyout.height - this.flyoutOffsetY - anchorBoundingRect.top;
    return topOverflow;
  };

  // Calculates the bottom overflow based on the viewport or boundary element
  flyoutBottomOverflow = (
    flyout: Offset,
    anchorBoundingRect: ClientRect,
    boundaryElementRect: ClientRect
  ) => {
    // bottomOverflow will be positive when outside the bounds
    const bottomOverflow = boundaryElementRect
      ? anchorBoundingRect.top +
        anchorBoundingRect.height +
        flyout.height +
        this.flyoutOffsetY -
        boundaryElementRect.bottom
      : anchorBoundingRect.top +
        anchorBoundingRect.height +
        flyout.height +
        this.flyoutOffsetY -
        this.window.innerHeight;
    return bottomOverflow;
  };

  // Places the flyout over the anchor.  If the anchor is outside the bounding
  // rectangle, the flyout is separated from the anchor to move it into the
  // bounding rectangle.
  displayFlyoutOverAnchor = (
    flyout,
    anchor,
    anchorBoundingRect,
    boundaryElementRect
  ) => {
    flyout.top = anchor.top - flyout.height - this.flyoutOffsetY;
    // if the anchor is outside the bounding rectangle offset the flyout
    // to keep it positioned
    if (
      boundaryElementRect &&
      anchorBoundingRect.top > boundaryElementRect.bottom
    ) {
      flyout.top += boundaryElementRect.bottom - anchorBoundingRect.top;
    }
  };

  // Places the flyout under the anchor.  If the anchor is outside the bounding
  // rectangle, the flyout is separated from the anchor to move it into the
  // bounding rectangle.
  displayFlyoutUnderAnchor = (
    flyout,
    anchor,
    anchorBoundingRect,
    boundaryElementRect
  ) => {
    flyout.top = anchor.top + anchor.height + this.flyoutOffsetY;
    // if the anchor is outside the bounding rectangle offset the flyout to keep it positioned
    if (
      boundaryElementRect &&
      anchorBoundingRect.bottom < boundaryElementRect.top
    ) {
      flyout.top += boundaryElementRect.top - anchorBoundingRect.bottom;
    }
  };

  private handleVerticalFlipping = (
    flyout: Offset,
    anchor: Offset,
    anchorBoundingRect: ClientRect,
    boundaryElementRect: ClientRect
  ) => {
    const bottomOverflow = this.flyoutBottomOverflow(
      flyout,
      anchorBoundingRect,
      boundaryElementRect
    );
    if (bottomOverflow <= 0) {
      // If it fits under the anchor display it there
      this.displayFlyoutUnderAnchor(
        flyout,
        anchor,
        anchorBoundingRect,
        boundaryElementRect
      );
    } else if (this.boundaryElement) {
      this.displayFlyoutOverAnchor(
        flyout,
        anchor,
        anchorBoundingRect,
        boundaryElementRect
      );
    } else {
      const topOverflow = this.flyoutTopOverflow(
        flyout,
        anchorBoundingRect,
        boundaryElementRect
      );
      if (topOverflow <= 0 || bottomOverflow > topOverflow) {
        // If it fits over the anchor or we could see more of the flyout over
        // the anchor display it there
        this.displayFlyoutOverAnchor(
          flyout,
          anchor,
          anchorBoundingRect,
          boundaryElementRect
        );
      } else {
        this.displayFlyoutUnderAnchor(
          flyout,
          anchor,
          anchorBoundingRect,
          boundaryElementRect
        );
      }
    }
  };
  private handleFlipping = (data: Data) => {
    // Originally we had manual calculations due to two issues with popperjs v1:
    // 1) https://github.com/popperjs/popper-core/issues/756
    // 2) doesn't flip when resizing
    // Now we handle flipping because we don't want the default behavior where
    // the anchor is covered by the flyout.
    const { offsets } = data;
    const { popper: flyout, reference: anchor } = offsets;

    let boundaryElementRect;
    if (this.boundaryElement) {
      boundaryElementRect = getNativeElement(
        this.boundaryElement
      ).getBoundingClientRect();
    }

    // The anchor offsets are relative to the top of the page, so we
    // pick up the client bounding rectangle to have it relative to the
    // viewport or boundary element.
    const anchorBoundingRect = data.instance.reference.getBoundingClientRect();

    if (this.horizontalFlipping) {
      this.handleHorizontalFlipping(
        flyout,
        anchor,
        data.placement,
        anchorBoundingRect,
        boundaryElementRect
      );
    }

    if (!this.verticalFlipping) {
      flyout.top = anchor.top + anchor.height + this.flyoutOffsetY;
    } else {
      this.handleVerticalFlipping(
        flyout,
        anchor,
        anchorBoundingRect,
        boundaryElementRect
      );
    }

    return data;
  };
}
