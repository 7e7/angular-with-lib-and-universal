import { Injectable, Type } from '@angular/core';

import { JbDomService } from '../jb-utils/services/dom.service';
import { Subject, Observable } from 'rxjs';

/** A service used to open and close any given dialog. */
@Injectable()
export class JbDialogService {
  /** Holds the DOM reference of the element that opened the dialog. This is
   * used to re-focus the element on close for accessbility purposes.
   */
  private initialFocusedElement: any;
  private componentReference: any;
  private close: Subject<void>;

  constructor(private domService: JbDomService) {}

  openDialog<C>(
    dialog: Type<C>,
    returnFocus?: EventTarget,
    data?: any
  ): C & any {
    if (this.componentReference) {
      console.warn(
        'Component Library only supports opening one dialog at a time. ' +
          'The previous dialog was closed. Please close it yourself before opening a new one'
      );
      this.closeDialog();
    }

    // The second argument will append to an element if it exists, otherwise it will append to the body
    this.componentReference = this.domService.appendComponent(
      dialog,
      null,
      data
    );

    if (returnFocus) {
      this.initialFocusedElement = returnFocus;
    }

    const focuseableElements = this.domService.getFocusableElements(
      this.componentReference.hostView.rootNodes[0]
    );

    // Triggers the focuseable trap within the dialog modal by focusing on the first focuseable element.
    // Passes a `true` preventScroll flag to setElementFocus to prevent page from scrolling beneath modal when it opens
    if (focuseableElements.length) {
      this.domService.setElementFocus(focuseableElements[0], true);
    }

    this.close = new Subject<void>();

    return this.componentReference.instance;
  }

  closeDialog(): void {
    if (!this.componentReference) {
      return;
    }

    this.domService.removeComponent(this.componentReference);

    if (this.initialFocusedElement) {
      this.initialFocusedElement.focus();
    }

    this.close.next();
    this.close.complete();

    this.initialFocusedElement = undefined;
    this.componentReference = undefined;
    this.close = undefined;
  }

  afterClosed(): Observable<void> {
    return this.close;
  }

  /** Helper function so methods can subscribe to the component instance . */
  getComponentReference(): any {
    return this.componentReference
      ? this.componentReference.instance
      : undefined;
  }
}
