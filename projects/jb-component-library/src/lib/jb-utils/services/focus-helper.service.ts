import { Injectable, Renderer2 } from '@angular/core';

/** A service that helps remove an element's ability to be tab-focused.
 * Eg. Dialog overlays that remove the user's ability to interact with
 * specific content.
 */
@Injectable({
  providedIn: 'root',
})
export class JbFocusHelperService {
  // Tabbable elements
  private focusableEls: string[] = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable]',
  ];

  /** Sets tabindex to -1 on focusable elements. */
  removeElementFocus(element: HTMLElement, renderer: Renderer2) {
    Array.from(element.querySelectorAll(this.focusableEls.join(', '))).forEach(
      (el: any) => {
        renderer.addClass(el, 'jbFocusHelperService');
        renderer.setAttribute(el, 'tabIndex', '-1');
      }
    );
  }

  /** Sets tabindex back to 0 on focusable elements that may have been changed
   * by removeElementFocus.
   */
  returnElementFocus(element: HTMLElement, renderer: Renderer2) {
    Array.from(element.querySelectorAll('.jbFocusHelperService')).forEach(
      (el: any) => {
        renderer.removeClass(el, 'jbFocusHelperService');
        renderer.setAttribute(el, 'tabIndex', '0');
      }
    );
  }
}
