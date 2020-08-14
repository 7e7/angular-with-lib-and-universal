import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  Renderer2,
} from '@angular/core';
import { DOCUMENT, IS_BROWSER } from '../../jb-utils/injection-tokens';
import { addSrOnly } from '../link.utils';

@Directive({
  selector: '[jbStandaloneLink]',
  host: {
    class:
      'pointer h-100 dib no-underline underline-hover hover-core-blue royal-blue',
    '[attr.aria-describedby]':
      "ariaDescribedBy || srText ? [ariaDescribedBy, srText ? srId : ''] : null",
  },
})
export class StandaloneLinkDirective implements AfterViewInit {
  @Input() ariaDescribedBy: string;
  @Input() srText: string;
  srId: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    @Inject(IS_BROWSER) private isBrowser
  ) {}

  ngAfterViewInit() {
    if (this.srText && this.isBrowser) {
      this.srId = addSrOnly(
        this.document,
        this.srText,
        this.renderer,
        this.elementRef
      );
    }
  }
}
