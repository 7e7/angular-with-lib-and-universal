import { JbFocusHelperService } from '../../jb-utils/services/focus-helper.service';
import { Component, HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'jb-sidenav-content',
  template: `
    <ng-content></ng-content>
  `,
})
export class JbSidenavContentComponent {
  /** Flag to control if content is scrollable. */
  private isScrollable = true;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private focusHelper: JbFocusHelperService
  ) {}

  /** Prevent 'scroll' events. */
  @HostListener('scroll', ['$event'])
  onScroll(event) {
    if (!this.isScrollable) {
      event.preventDefault();
    }
  }

  /** Prevent 'mousewheel' events. */
  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event) {
    if (!this.isScrollable) {
      event.preventDefault();
    }
  }

  /** Prevent 'touchmove' events. */
  @HostListener('touchmove', ['$event'])
  onTouchMove(event) {
    if (!this.isScrollable) {
      event.preventDefault();
    }
  }

  /** Setter to enable or prevent scrolling.  */
  setScroll(isScroll: boolean) {
    this.isScrollable = isScroll;
  }

  /** Remove user ability to focus focusable elements. */
  removeFocus() {
    this.focusHelper.removeElementFocus(this.el.nativeElement, this.renderer);
  }

  /** Return user ability to focus focusable elements. */
  returnFocus() {
    this.focusHelper.returnElementFocus(this.el.nativeElement, this.renderer);
  }
}
