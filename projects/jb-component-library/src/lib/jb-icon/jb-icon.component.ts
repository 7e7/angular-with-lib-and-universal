import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  SimpleChanges,
  OnInit,
  Renderer2,
} from '@angular/core';

import { JbIconService } from './jb-icon.service';

@Component({
  selector: 'jb-icon',
  templateUrl: 'jb-icon.component.html',
  styleUrls: ['./jb-icon.component.scss'],
  host: {
    class: 't-fast notranslate',
  },
})
export class JbIconComponent implements OnChanges, OnInit {
  @Input() name: string;
  @Input() src: string; // @deprecated
  @Input() height: string;
  @Input() width: string;
  @Input() stroke: string;
  @Input() fill: string;
  @Input() label: string;
  @Input() viewBox: string;
  @Input() className: string;

  attributes: Record<string, any> = {};

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private iconService: JbIconService
  ) {
    this.elementRef.nativeElement.setAttribute('aria-hidden', 'true');
  }

  ngOnInit() {
    // Fixes how IE treats SVG - they are by default focuseable.
    this.updateSvgAttribute('focusable', 'false');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.name && changes.label) {
      changes.label.currentValue
        ? this.setAriaLabel(changes.label.currentValue)
        : this.removeAriaLabel();
    }

    if (!this.elementHasClass(this.elementRef)) {
      this.renderer.addClass(
        this.elementRef.nativeElement,
        'fill-current-color'
      );
    }

    if (!this.name) {
      this.clearSvgElement();
    }
    if (changes.name) {
      this.setIcon(this.name);
    }
    if (changes.src) {
      this.setSvgSource(changes.src.currentValue);
    }
    if (changes.height) {
      this.updateSvgAttribute('height', this.height);
    }
    if (changes.width) {
      this.updateSvgAttribute('width', this.width);
    }
    if (changes.stroke) {
      this.updateSvgAttribute('stroke', this.stroke);
    }
    if (changes.fill) {
      this.updateSvgAttribute('fill', this.fill);
    }
    if (changes.viewBox) {
      this.updateSvgAttribute('viewBox', this.viewBox);
    }
    if (changes.className) {
      this.updateSvgAttribute('class', this.className);
    }
  }

  elementHasClass = (elementRef: ElementRef): boolean =>
    this.containsClass(elementRef.nativeElement.className);

  setIcon(iconName: string) {
    this.setSvgElement(iconName);
    this.updateSvgAttributes();
  }

  setIconSize(height: string, width: string) {
    this.height = height;
    this.width = width;
    this.updateSvgAttribute('height', this.height);
    this.updateSvgAttribute('width', this.width);
  }

  private containsClass = (classList: string): boolean =>
    classList.match(/(^|\W)fill-[^\s]+/i) !== null;

  private setSvgSource(source: string) {
    this.elementRef.nativeElement.innerHTML = source;
  }

  private setSvgElement(iconName: string) {
    const svg = this.iconService.get(iconName);
    this.elementRef.nativeElement.innerHTML = svg;
  }

  private clearSvgElement() {
    this.elementRef.nativeElement.innerHTML = '';
  }

  private updateSvgAttributes() {
    Object.keys(this.attributes)
      .map((name) => [name, this.attributes[name]])
      .forEach(([name, value]) => this.updateSvgAttribute(name, value));
  }

  private updateSvgAttribute(name: string, value: string) {
    this.attributes[name] = value;
    if (this.name || this.src) {
      value
        ? this.setAttributeOnSvg(name, value)
        : this.removeAttributeFromSvg(name);
    }
  }

  private setAriaLabel(label: string) {
    this.setAttributeOnHost('aria-label', label);
    this.removeAttributeFromHost('aria-hidden');
  }

  private removeAriaLabel() {
    this.setAttributeOnHost('aria-hidden', 'true');
    this.removeAttributeFromHost('aria-label');
  }

  private setAttributeOnHost(attribute: string, value: string) {
    this.elementRef.nativeElement.setAttribute(attribute, value);
  }

  private removeAttributeFromHost(attribute: string) {
    this.elementRef.nativeElement.removeAttribute(attribute);
  }

  private setAttributeOnSvg(attribute: string, value: string) {
    const svgElement = this.elementRef.nativeElement.querySelector('svg');
    if (svgElement) {
      svgElement.setAttribute(attribute, value);
    }
  }

  private removeAttributeFromSvg(attribute) {
    this.elementRef.nativeElement.firstChild.removeAttribute(attribute);
  }
}
