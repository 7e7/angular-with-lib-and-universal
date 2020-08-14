import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'button[jb-action-menu-item], a[jb-action-menu-item]',
  template: '<span><ng-content></ng-content></span>',
  styleUrls: ['./jb-action-menu-item.component.scss'],
  host: {
    class:
      'db tl bg-transparent bn pa0 avenir pointer no-underline royal-blue relative',
  },
})
export class JbActionMenuItemComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit() {
    if (this.elementRef.nativeElement.tagName === 'A') {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        'tabIndex',
        '0'
      );
      this.renderer.setStyle(this.elementRef.nativeElement, 'top', '1px');
    }
  }
}
