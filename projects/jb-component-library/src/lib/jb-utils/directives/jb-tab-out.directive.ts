import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  OnInit,
  OnDestroy,
  NgZone,
} from '@angular/core';

@Directive({
  selector: '[jbTabOut]',
})
export class JbTabOutDirective implements OnInit, OnDestroy {
  @Output() jbTabOut = new EventEmitter<void>();

  private isKeyboardEvent = false;

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngOnInit() {
    const nativeElement = this.el.nativeElement;

    this.ngZone.runOutsideAngular(() => {
      nativeElement.addEventListener('focusout', this.onFocusOut, true);
      nativeElement.addEventListener('keydown', this.onKeydown, true);
    });
  }

  ngOnDestroy() {
    const nativeElement = this.el.nativeElement;

    nativeElement.removeEventListener('focusout', this.onFocusOut, true);
    nativeElement.removeEventListener('keydown', this.onKeydown, true);
  }

  onFocusOut = (event: FocusEvent) => {
    if (!this.elementContains(event.relatedTarget) && this.isKeyboardEvent) {
      this.ngZone.run(() => this.jbTabOut.emit());
    }
  };

  onKeydown = () => {
    // keydown event will fire right before the blur event
    this.isKeyboardEvent = true;
    // set it to false directly on next tick to prevent future blur events
    // from thinking it's another keyboard event
    setTimeout(() => (this.isKeyboardEvent = false));
  };

  elementContains(target: EventTarget) {
    return target instanceof Node && this.el.nativeElement.contains(target);
  }
}
