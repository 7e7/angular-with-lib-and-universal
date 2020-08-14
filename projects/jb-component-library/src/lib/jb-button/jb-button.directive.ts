import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ComponentRef,
} from '@angular/core';

import { JbDomService } from '../jb-utils/services/dom.service';
import { JbButtonLoaderComponent } from './jb-button-loader/jb-button-loader.component';
import { JbButtonSizeEnum } from './types/jb-button-size.enum';
import { JbButtonTypeEnum } from './types/jb-button-type.enum';

@Directive({
  selector: 'button[jbButton], a[jbButton], span[jbButton]',
  host: {
    role: 'button',
    class: `pointer avenir b no-underline
    t-med-bg t-out-hover w-100 w-auto-ns tc border-box inline-flex align-items-center justify-center`,
    '[attr.aria-disabled]': 'isDisabled',
    '[class.jb-button-disabled]': 'isDisabled',
    '[class.jb-button-primary]': 'isPrimary',
    '[class.jb-button-secondary]': 'isSecondary',
    '[class.jb-button-standard]': 'isStandard',
    '[class.jb-button-large]': 'isLarge && !isPaired',
    '[class.jb-button-medium]': 'isMedium && !isPaired',
    '[class.jb-button-small]': 'isSmall && !isPaired',
    '[class.jb-button-paired]': 'isPaired',
    '[class.b--none]': '!isStandard',
    '[class.b--dark-gray]': 'isStandard',
    '[class.bg-dark-gray]': 'isDisabled',
    '[class.bg-royal-blue]': 'isActivePrimary',
    '[class.bg-orange]': 'isActiveSecondary',
    '[class.bg-white]': 'isActiveStandard',
    '[class.br-rounded-1]': 'isRoundedPaired',
    '[class.br-rounded-2]': 'isRoundedSingle',
    '[class.copy]': 'isLarge',
    '[class.copy-s]': '!isLarge',
    '[class.hover-royal-blue]': 'isActiveStandard',
    '[class.hover-white]': '!isActiveStandard',
    '[class.o-40]': 'isDisabledPrimary',
    '[class.o-50]': 'isDisabledSecondary',
    '[class.o-70]': 'isLoading',
    '[class.relative]': 'isFocused',
    '[class.royal-blue]': 'isActiveStandard',
    '[class.white]': '!isActiveStandard',
    '[class.w-max-ns]': '!isPaired',
  },
})
export class JbButtonDirective implements OnInit, OnChanges {
  readonly FILL_COLOUR = 'white';

  /** Determines what colours to apply to the button. */
  @Input() theme: JbButtonTypeEnum = JbButtonTypeEnum.primary;
  /* Determines what size the button is */
  @Input() size: JbButtonSizeEnum = JbButtonSizeEnum.large;
  /** Flag used to apply rounded or square border styling. */
  @Input() isRounded = true;
  /** Flag used to apply paired button styling. */
  @Input() isPaired = false;
  /** Flag used to indicate button is in loading|processing|waiting|thinking state. */
  @Input() isLoading = false;

  isFocused = false;
  isDisabled = false;
  loader: ComponentRef<JbButtonLoaderComponent>;

  /** Holds the last innerHTML content of the button. */
  private childElement: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private domService: JbDomService
  ) {}

  /** Sync the directive disabled state with the native disabled state. */
  ngOnInit() {
    this.isDisabled = this.el.nativeElement.disabled;
    setTimeout(() => {
      // When template syntax is provided childElement is empty
      this.childElement = this.el.nativeElement.innerHTML;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isLoading && !changes.isLoading.firstChange) {
      changes.isLoading.currentValue
        ? Promise.resolve(null).then(() => this.addLoader())
        : Promise.resolve(null).then(() => this.removeLoader());
    }
  }

  get isPrimary(): boolean {
    return (
      this.theme === JbButtonTypeEnum.primary ||
      this.theme === JbButtonTypeEnum.ctaPrimary
    );
  }

  get isSecondary(): boolean {
    return (
      this.theme === JbButtonTypeEnum.secondary ||
      this.theme === JbButtonTypeEnum.ctaSecondary
    );
  }

  get isStandard(): boolean {
    return this.theme === JbButtonTypeEnum.standard;
  }

  get isLarge(): boolean {
    return this.size === JbButtonSizeEnum.large;
  }

  get isMedium(): boolean {
    return this.size === JbButtonSizeEnum.medium;
  }

  get isSmall(): boolean {
    return this.size === JbButtonSizeEnum.small;
  }

  get isActive(): boolean {
    return !this.isDisabled;
  }

  get isActivePrimary(): boolean {
    return this.isPrimary && this.isActive;
  }

  get isActiveSecondary(): boolean {
    return this.isSecondary && this.isActive;
  }

  get isActiveStandard(): boolean {
    return this.isStandard && this.isActive;
  }

  get isDisabledPrimary(): boolean {
    return this.isPrimary && this.isDisabled;
  }

  get isDisabledSecondary(): boolean {
    return this.isSecondary && this.isDisabled;
  }

  get isRoundedPaired(): boolean {
    return this.isRounded && this.isPaired;
  }

  get isRoundedSingle(): boolean {
    return this.isRounded && !this.isPaired;
  }

  @HostListener('focus')
  onFocus() {
    this.isFocused = true;
  }

  @HostListener('blur')
  onBlur() {
    this.isFocused = false;
  }

  /** Appends a class name to the existing class list. */
  addClass(className: string): void {
    this.domService.addClass(this.el, this.renderer)(className);
  }

  /** Appends a list of class names to the existing class list. */
  addClasses(classNames: string[]): void {
    this.domService.addClassesAsArray(this.el, this.renderer, classNames);
  }

  /** Adds an attribute to the element. */
  addAttribute(type: string, value: string): void {
    this.renderer.setAttribute(this.el.nativeElement, type, value);
  }

  /** Dynamically adds the loader by creating and appending the JbButtonLoaderComponent. */
  private addLoader() {
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '');
    this.loader = this.domService.appendComponent(
      JbButtonLoaderComponent,
      this.el.nativeElement
    );
    this.loader.instance.name = 'loading';
    this.loader.instance.fill = this.FILL_COLOUR;
  }

  /** Removes the existing instance of the loader that was created by the addLoader method. */
  private removeLoader() {
    if (this.childElement) {
      this.domService.removeComponent(this.loader);
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerHTML',
        this.childElement
      );
    }
  }
}
