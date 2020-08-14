import { Inject, Injectable } from '@angular/core';
import { DOCUMENT, WINDOW } from '../injection-tokens';
import { JbDeviceService } from './device-service';

// tslint:disable:max-classes-per-file
class IosScrollService {
  readonly DISABLE_SCROLL_IN_LAYER_IOS = 'disable-scroll-in-layer-ios';

  private setScrollY = undefined;

  constructor(private document: Document, private window: Window) {}

  enableScroll(shouldScrollToTop?: boolean) {
    if (shouldScrollToTop) {
      this.setScrollY = () => {
        this.window.scroll(this.window.scrollX, 0);
      };
    }
    if (this.setScrollY) {
      this.document.body.classList.remove(this.DISABLE_SCROLL_IN_LAYER_IOS);
      this.setScrollY();
      this.setScrollY = undefined;
    }
  }

  disableScroll() {
    if (this.setScrollY) {
      return;
    }

    const scrollY = this.window.scrollY;
    this.document.body.classList.add(this.DISABLE_SCROLL_IN_LAYER_IOS);

    this.setScrollY = () => {
      this.window.scroll(this.window.scrollX, scrollY);
    };
  }
}

@Injectable({ providedIn: 'root' })
export class JbScrollService {
  readonly DISABLE_SCROLL_IN_LAYER = 'disable-scroll-in-layer';

  private iosScrollService = new IosScrollService(this.document, this.window);

  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(WINDOW) private window: any,
    private deviceService: JbDeviceService
  ) {}

  /** Enables the body scroll. */
  enableScroll(shouldScrollToTop?: boolean): void {
    if (this.deviceService.isIOS()) {
      this.iosScrollService.enableScroll(shouldScrollToTop);
    } else {
      this.document.body.classList.remove(this.DISABLE_SCROLL_IN_LAYER);
    }
  }

  /** Disables the body scroll. */
  disableScroll(): void {
    if (this.deviceService.isIOS()) {
      this.iosScrollService.disableScroll();
    } else {
      this.document.body.classList.add(this.DISABLE_SCROLL_IN_LAYER);
    }
  }

  /** Scrolls to a specified top and left pixel location. */
  scrollToPosition(top: number, left: number) {
    this.window.scrollTo({ top, left, behavior: 'smooth' });
  }

  scrollToTop() {
    this.scrollToPosition(0, this.window.pageXOffset);
  }

  registerScrollHandler(scrollHandler) {
    this.window.onscroll = scrollHandler;
  }

  removeScrollHandler() {
    this.window.onscroll = null;
  }

  /** Focuses an element without scrolling to it. */
  focusElementWithNoScroll(element: any) {
    if (!element) {
      console.warn('Cannot find an element to focus.');
      return;
    }

    element.setAttribute('tabindex', '0');
    element.focus({ preventScroll: true });
  }
}
