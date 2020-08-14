import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
  selector: '[jbClickStop]',
})
export class JbClickStopDirective implements OnInit, OnDestroy {
  @Output() stopPropEvent: EventEmitter<Event> = new EventEmitter();
  private unsubscribe: Function;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.unsubscribe = this.renderer.listen(
      this.el.nativeElement,
      'click',
      (event) => {
        event.preventDefault();
        this.stopPropEvent.emit(event);
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
