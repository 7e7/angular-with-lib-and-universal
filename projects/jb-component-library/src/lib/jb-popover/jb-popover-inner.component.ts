import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'jb-popover-inner',
  template: '<ng-content></ng-content>',
})
export class JbPopoverInnerComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {
    // The element starts out as hidden to avoid flash on the screen,
    // and to prevent scrolling
    this.elementRef.nativeElement.style.visibility = 'hidden';
    this.elementRef.nativeElement.style.position = 'absolute';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.style.visibility = 'visible';
      // For Safari: Cache the scroll position and scrolling back to it to prevent
      // the window from jumping when setting the focus.
      // Chrome adheres to preventScroll, and IE is impossible to work with.
      const x = window.scrollX;
      const y = window.scrollY;
      this.elementRef.nativeElement.focus({ preventScroll: true });
      window.scrollTo(x, y);
    }, 0);
  }
}
