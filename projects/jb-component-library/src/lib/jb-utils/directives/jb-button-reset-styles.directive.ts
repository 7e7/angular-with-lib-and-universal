import { Directive, Input, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[jbButtonResetStyles]',
})
export class JbButtonResetStylesDirective implements OnInit {
  @Input() display = 'dib';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    [
      'tl',
      'bg-transparent',
      'bn',
      'pa0',
      'avenir',
      'pointer',
      this.display,
    ].forEach((className) =>
      this.renderer.addClass(this.el.nativeElement, className)
    );
  }
}
