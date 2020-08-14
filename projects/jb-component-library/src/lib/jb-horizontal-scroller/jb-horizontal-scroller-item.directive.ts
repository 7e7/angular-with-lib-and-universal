import {
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[scrollItem]',
})
export class JbHorizontalScrollerItemDirective implements OnInit, OnDestroy {
  @Output() onFocus = new EventEmitter<void>();

  constructor(private elementRef: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    const nativeElement = this.elementRef.nativeElement;
    this.zone.runOutsideAngular(() => {
      nativeElement.addEventListener('focus', this.handleFocus, true);
    });
  }

  ngOnDestroy() {
    const nativeElement = this.elementRef.nativeElement;
    nativeElement.removeEventListener('focus', this.handleFocus, true);
  }

  handleFocus = () => {
    this.onFocus.emit();
  };

  boundingClientRect(): ClientRect {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  setFocus() {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        if (
          this.elementRef.nativeElement &&
          this.elementRef.nativeElement.firstElementChild
        ) {
          this.elementRef.nativeElement.firstElementChild.focus();
        }
      });
    });
  }
}
