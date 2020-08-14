import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Inject,
  Injector,
  ElementRef,
  Renderer2,
  Type,
  ComponentRef,
  EmbeddedViewRef,
} from '@angular/core';

import { DOCUMENT } from '../injection-tokens';

/** Dynamically adds a componenent to the DOM's body */
@Injectable({
  providedIn: 'root',
})
export class JbDomService {
  /** Holds the instance of the component that's being added to the DOM. */
  private componentRefs = new Set<ComponentRef<any>>();

  constructor(
    private applicationReference: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document
  ) {}

  /** Creates a component reference and subsequently attaches this to the ApplicationRef so that this
   * exists inside the ng component tree. It then gets the DOM element from the component and appends
   * it to the body.
   * @param component - Accepts a component that will be rendered.
   * @param element - (Optional), if provided, the component will be appended inside of it; Otherwise
   * it will be appended to the body.
   */
  appendComponent<C>(
    component: Type<C>,
    element?: HTMLElement,
    data?: any
  ): ComponentRef<C> {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    this.componentRefs.add(componentRef);

    this.applicationReference.attachView(componentRef.hostView);

    const domElement = (componentRef.hostView as EmbeddedViewRef<C>)
      .rootNodes[0];

    element
      ? element.appendChild(domElement)
      : this.document.body.appendChild(domElement);

    if (data) {
      (componentRef.instance as any).data = data;
    }

    return componentRef;
  }

  /** Removes the component from the ng component tree and from the DOM. */
  removeComponent<C>(componentRef: ComponentRef<C>): void {
    if (this.componentRefs.has(componentRef)) {
      this.componentRefs.delete(componentRef);

      this.applicationReference.detachView(componentRef.hostView);
      componentRef.destroy();
    }
  }

  removeAllComponents(): void {
    for (const ref of this.componentRefs.values()) {
      this.removeComponent(ref);
    }
  }

  /** Returns an Array of focuseable elements.
   * @param element - Accepts an element that will be used to extract all the focuseable items.
   */
  getFocusableElements(element: HTMLElement): HTMLElement[] {
    return Array.from(
      element.querySelectorAll(
        `button:not([tabindex="-1"]),
        [href]:not([tabindex='-1']),
        input:not([tabindex='-1']),
        select:not([tabindex='-1']),
        textarea:not([tabindex='-1']),
        [tabindex]:not([tabindex="-1"]),
        iframe:not([tabindex="-1"])`
      )
    );
  }

  /** Set element focus. */
  setElementFocus(element: HTMLElement, preventScroll: boolean = false): void {
    if (element) {
      element.focus({ preventScroll });
    }
  }

  /** Selects all the input's text */
  selectInputText(input: HTMLInputElement): void {
    if (input) {
      input.setSelectionRange(0, input.value.length);
    }
  }

  /** Calls a native method with arguments on a given element. */
  callNativeMethod(elmRef: ElementRef, method: string, ...args): void {
    elmRef.nativeElement[method](...args);
  }

  addClass = (element: ElementRef, renderer: Renderer2) => (name: string) =>
    renderer.addClass(element.nativeElement, name);

  addClassesAsString(
    elementRef: ElementRef,
    renderer: Renderer2,
    classes: string
  ) {
    this.addClassesAsArray(elementRef, renderer, classes.split(/\s+/));
  }

  addClassesAsArray(
    elementRef: ElementRef,
    renderer: Renderer2,
    classes: string[]
  ) {
    classes.forEach(this.addClass(elementRef, renderer));
  }

  removeClass = (element: ElementRef, renderer: Renderer2) => (name: string) =>
    renderer.removeClass(element.nativeElement, name);

  removeClassesAsString(
    elementRef: ElementRef,
    renderer: Renderer2,
    classes: string
  ) {
    this.removeClassesAsArray(elementRef, renderer, classes.split(/\s+/));
  }

  removeClassesAsArray(
    elementRef: ElementRef,
    renderer: Renderer2,
    classes: string[]
  ) {
    classes.forEach(this.removeClass(elementRef, renderer));
  }
}
