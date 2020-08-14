import { Directive, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'jb-slider > input',
})
export class JbSliderInputDirective {
  constructor(public el: ElementRef) {}
}
