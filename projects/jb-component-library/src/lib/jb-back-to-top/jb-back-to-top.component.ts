import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT, WINDOW } from '../jb-utils/injection-tokens';
import { JbScrollService } from '../jb-utils/services/scroll.service';

@Component({
  selector: 'jb-back-to-top',
  template: `
    <button
      *ngIf="isVisible"
      class="bg-bright-blue o-90 h-2-5 w-2-5
        hover-o-100 br-100 shadow-4 flex items-center justify-center
        b--none  pointer"
      type="button"
      (click)="scrollToTop()"
      aria-label="Back To Top"
    >
      <jb-icon
        class="fill-white white flex"
        name="backToTopArrow"
        [width]="18"
        [height]="18"
      ></jb-icon>
    </button>
  `,
  styleUrls: ['./jb-back-to-top.component.scss'],
  host: {
    class: 'absolute-ns fixed bottom-0 right-0 mb3 mr3',
  },
})
export class JbBackToTopComponent implements OnInit, OnDestroy {
  /** Flag that controls back-to-top button visibility. */
  isVisible = false;

  constructor(
    private scrollService: JbScrollService,
    @Inject(WINDOW) private window,
    @Inject(DOCUMENT) private document
  ) {}

  /** Subscribe to button visibility changes. */
  ngOnInit() {
    this.scrollService.registerScrollHandler(this.updateIsVisible);
  }

  ngOnDestroy(): void {
    this.scrollService.removeScrollHandler();
  }

  /** Scrolls to the top of the page and focuses h1 element. */
  scrollToTop() {
    this.focusOnH1();
    this.scrollService.scrollToTop();
  }

  updateIsVisible = () => {
    const boundary = this.window.innerHeight * 4;
    this.isVisible = this.window.pageYOffset >= boundary;
  };

  /*
   * Helpers
   */

  private focusOnH1() {
    this.scrollService.focusElementWithNoScroll(
      this.document.querySelector('h1')
    );
  }
}
