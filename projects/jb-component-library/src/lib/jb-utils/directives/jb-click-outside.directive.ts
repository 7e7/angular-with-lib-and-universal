import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[jbClickOutside]',
})
export class JbClickOutsideDirective {
  @Output() clickOutside: EventEmitter<void> = new EventEmitter();
  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement): void {
    const clickedOutside = !this.el.nativeElement.contains(targetElement);
    if (clickedOutside) {
      this.clickOutside.emit();
    }
  }
}
