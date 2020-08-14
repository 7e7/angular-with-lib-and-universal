import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { JbDomService } from '../jb-utils/services/dom.service';

@Directive({
  selector: 'label[jbInputLabel]',
  host: {
    class: 'pointer-events-none ma3 absolute db',
  },
})
export class JbInputLabelDirective implements OnChanges, OnInit {
  readonly STYLE_SHRUNK = 'mt2 copy-xs charcoal';
  readonly STYLE_NOT_SHRUNK = 'slate-gray';

  @Input() isShrunk = false;

  constructor(
    private el: ElementRef,
    private domService: JbDomService,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isShrunk) {
      this.updateStyles();
    }
  }

  ngOnInit() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'font-size 150ms'
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition-timing-function',
      'ease-out'
    );
    this.renderer.setStyle(this.el.nativeElement, 'box-sizing', 'border-box');
  }

  private updateStyles() {
    if (this.isShrunk) {
      this.removeClasses(this.STYLE_NOT_SHRUNK);
      this.addClasses(this.STYLE_SHRUNK);
    } else {
      this.removeClasses(this.STYLE_SHRUNK);
      this.addClasses(this.STYLE_NOT_SHRUNK);
    }
  }

  private addClasses(styleClasses: string) {
    this.domService.addClassesAsString(this.el, this.renderer, styleClasses);
  }

  private removeClasses(styleClasses: string) {
    this.domService.removeClassesAsString(this.el, this.renderer, styleClasses);
  }
}
