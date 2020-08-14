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
  selector: '[jbInlineLink]',
  host: {
    class: 'pointer underline hover-core-blue dib royal-blue',
    '[attr.aria-describedby]':
      "ariaDescribedBy || srText ? [ariaDescribedBy, srText ? srId : ''] : null",
  },
})
export class InlineLinkDirective implements AfterViewInit {
  @Input() ariaDescribedBy: string;
  @Input() srText: string;
  @Input() srId?: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    @Inject(IS_BROWSER) private isBrowser
  ) {}

  ngAfterViewInit() {
    if (this.srText && this.isBrowser) {
      addSrOnly(this.document, this.srText, this.renderer, this.elementRef);
    }
  }
}
