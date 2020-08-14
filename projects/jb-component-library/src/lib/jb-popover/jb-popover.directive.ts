import {
  Directive,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewContainerRef,
  EmbeddedViewRef,
  OnDestroy,
  NgZone,
  OnInit,
  Inject,
  HostListener,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Subscription } from 'rxjs';
import Popper from 'popper.js';
import { ClickOutsideService } from '../jb-utils/services/click-outside.service';
import { JbPopoverComponent } from './jb-popover.component';
import { JbTooltipComponent } from './jb-tooltip/jb-tooltip.component';
import { JbFlyoutComponent } from '../jb-flyout/jb-flyout.component';
import { POPPER_TOKEN, PopperService } from './popper.service';
import { Toggleable } from '../types/jb-toggleable.interface';
import { JbViewPortService } from '../jb-utils/utils.module';

@Directive({
  selector: '[jbAnchor]',
  exportAs: 'jbAnchor',
})
export class JbPopoverDirective implements OnDestroy, OnInit, Toggleable {
  @Input() set tooltip(value: JbTooltipComponent) {
    this.popover = value;
  }
  @Input() set flyout(value: JbFlyoutComponent) {
    this.popover = value;
  }
  @Input() popover: JbPopoverComponent | JbFlyoutComponent;
  @Input() popoverContext: any;

  // Deprecate popoverAfterOpened and popoverAfterClosed in the future
  @Output() popoverAfterOpened = new EventEmitter<any>();
  @Output() popoverAfterClosed = new EventEmitter<any>();
  @Output() beforeOpened = new EventEmitter<any>();
  @Output() afterOpened = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  disableClose = false;
  disableOpen = false;
  isMobile: boolean;
  subscriptions = new Subscription();
  width: string;

  get shouldDisablePopper() {
    const disabled =
      (this.popover as JbFlyoutComponent).fullscreenOnPhone ||
      (this.popover as JbFlyoutComponent).customStylesOnPhone;
    return this.popover && disabled && this.isMobile;
  }

  private viewRef: EmbeddedViewRef<any>;
  private outsideClickSubscription: Subscription;
  private popper: Popper = null;
  private previouslyFocusedElement: HTMLElement | null = null;

  constructor(
    public elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private ngZone: NgZone,
    private clickOutsideService: ClickOutsideService,
    @Inject(POPPER_TOKEN) private popperService: PopperService,
    @Inject(DOCUMENT) private document: any,
    private viewportService: JbViewPortService
  ) {}

  ngOnInit() {
    const ngZoneSubscription = this.ngZone.onStable.subscribe(() => {
      if (this.popper) {
        // re-position popover in case of dynamic content change
        this.popper.scheduleUpdate();
      }

      // handle setting anchor width resizing as well
      this.setPopoverWidth();
    });

    const isMobileSubscription = this.viewportService
      .isMobile$()
      .subscribe((isMobileWidth) => {
        this.isMobile = isMobileWidth;

        // check if popper needs to be destroyed
        if (this.shouldDisablePopper) {
          if (this.popper) {
            this.popper.destroy();
            this.popper = null;
          }
        }
        // tablet/desktop
        else {
          // check if popper needs to be created
          if (this.getIsOpen() && !this.popper) {
            this.positionPopover();
          }
        }
      });

    this.subscriptions.add(isMobileSubscription);
    this.subscriptions.add(ngZoneSubscription);
  }

  getIsOpen(): boolean {
    return Boolean(this.viewRef);
  }

  getIsPopper(): boolean {
    return Boolean(this.popper);
  }

  toggle() {
    this.getIsOpen() ? this.close() : this.open();
  }

  scheduleUpdate() {
    if (this.popper) {
      this.popper.scheduleUpdate();
    }
  }

  open(value?: any) {
    this.beforeOpened.emit(value);

    // if already open or shouldn't open, don't try to open now
    if (this.getIsOpen() || this.disableOpen) {
      return;
    }

    // close any other anchors for this popover
    if (this.popover.currentAnchor) {
      this.popover.currentAnchor.close();
    }

    if (this.popover instanceof JbFlyoutComponent) {
      this.popover.beforeOpened.emit(value);
    }

    this.viewRef = this.viewContainerRef.createEmbeddedView(
      this.popover.templateRef
    );

    this.setPopoverWidth();

    this.positionPopover();

    this.closeOnOutsideClick();

    this.previouslyFocusedElement = this.document.activeElement as HTMLElement;
    this.popover.currentAnchor = this;

    if (this.popover instanceof JbPopoverComponent) {
      this.popover.popoverContext = this.popoverContext;
    }
    this.popover.afterOpened.emit(value);
    // deprecate popoverAfterOpened in the future
    this.popoverAfterOpened.emit(value);
    this.afterOpened.emit(value);
  }

  setPopoverWidth() {
    if (this.popover instanceof JbFlyoutComponent) {
      this.popover.setWidthToAnchorWidth(
        `${this.elementRef.nativeElement.offsetWidth}px`
      );
    }
  }

  @HostListener('document:keydown.esc')
  close(
    value?: any,
    options: { focusOnPreviousElement: boolean } = {
      focusOnPreviousElement: true,
    }
  ) {
    this.beforeClosed.emit(value);

    if (!this.getIsOpen() || this.disableClose) {
      return;
    }

    if (this.popover instanceof JbFlyoutComponent) {
      this.popover.beforeClosed.emit(value);
    }

    this.unlistenToOutsideClick();

    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    this.viewContainerRef.detach(0);
    this.viewRef.destroy();
    this.viewRef = null;

    if (options.focusOnPreviousElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }

    this.popover.currentAnchor = null;
    this.popover.afterClosed.emit(value);
    // deprecate popoverAfterClosed in the future
    this.popoverAfterClosed.emit(value);
    this.afterClosed.emit(value);
  }

  ngOnDestroy() {
    this.close();
    this.subscriptions.unsubscribe();
    this.unlistenToOutsideClick();
  }

  forceOpen(bool) {
    this.disableClose = bool;
  }

  forceClose(bool) {
    this.disableOpen = bool;
  }

  private unlistenToOutsideClick() {
    if (this.outsideClickSubscription) {
      this.outsideClickSubscription.unsubscribe();
    }
  }

  private closeOnOutsideClick() {
    this.unlistenToOutsideClick();

    this.outsideClickSubscription = this.clickOutsideService
      .onOutsideClick(this.viewRef.rootNodes[0])
      .subscribe((ev) => {
        if (!this.elementRef.nativeElement.contains(ev.target)) {
          this.close(undefined, { focusOnPreviousElement: false });
        }
      });
  }

  private positionPopover() {
    // Popper.js's built in transform styles prevent display: fixed; so popper must
    // be disabled if popover needs to be fullscreen on mobile.
    if (this.shouldDisablePopper) {
      return;
    }

    const popoverEl = this.viewRef.rootNodes[0];
    const anchorEl = this.elementRef.nativeElement;
    const options = this.popover.options;

    // Popper's scroll/resize event listeners fire unnecessary change
    // detection if we don't run outside Angular.
    this.ngZone.runOutsideAngular(() => {
      this.popper = this.popperService.create(anchorEl, popoverEl, options);
    });
  }
}
