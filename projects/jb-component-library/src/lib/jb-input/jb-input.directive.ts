import {
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  Self,
  Optional,
  OnInit,
  Inject,
  forwardRef,
} from '@angular/core';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';

import { JbInputType } from './types/jb-input-type.enum';
import { isValidInputType } from './types/jb-input-type.functions';
import { JbDomService } from '../jb-utils/services/dom.service';
import { JbFormFieldControlDirective } from '../forms/form-field-control.directive';
import { ErrorStateMatcher } from '../forms/error-state-matcher';
import { JbVariantTypeEnum } from '../types/jb-variant-type.enum';
import { JbFormFieldContainerComponent } from '../jb-form-field-container/jb-form-field-container.component';
import { JbLabelShrinkable } from '../types/jb-label-shrinkable.interface';

@Directive({
  selector: '[jbInput], [jbTextArea]',
  // TODO: Refactor to expose charactersRemainingCount in another way
  // exportAs makes the directive available as a template reference variable
  // but this also exposes the directive's methods which is a security risk
  exportAs: 'jbTextArea',
  host: {
    class: 'avenir pl3 pr2 ba b--solid w-100 jb-form-field', // ba b--medium-gray
    '(input)': 'inputChange()',
    '(focus)': 'handleFocus(true)',
    '(blur)': 'handleFocus(false); allowValidate()',
    '[attr.type]': 'type',
    '[attr.aria-invalid]': 'errorState',
    '[attr.aria-labelledby]': 'ariaLabelledBy',
    '[attr.aria-describedby]': 'ariaDescribedBy',
  },
})
export class JbInputDirective extends JbFormFieldControlDirective
  implements OnChanges, DoCheck, OnInit, JbLabelShrinkable {
  readonly STYLE_PRIMARY = 'pt4 pb2 bg-transparent charcoal copy';
  readonly STYLE_SECONDARY = 'pv3';
  isFocused = false;
  currentCharacterCount = 0;
  charactersRemainingCount: number;
  styleType = '';
  ariaLabelledBy: string;

  @Input() type: JbInputType = JbInputType.text;
  @Input() value: string;
  @Input() ariaDescribedBy: string;
  @Input() jbInput: string;
  @Input() maxlength: number;
  @Output() valueChanges = new EventEmitter<string>();
  @Output() onFocus = new EventEmitter<void>();
  @Output() onBlur = new EventEmitter<void>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private domService: JbDomService,

    @Optional()
    @Inject(forwardRef(() => JbFormFieldContainerComponent))
    container: JbFormFieldContainerComponent,

    @Optional()
    @Self()
    public ngControl: NgControl,
    @Optional() ngForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    defaultErrorStateMatcher: ErrorStateMatcher
  ) {
    super(
      container,
      ngControl,
      ngForm,
      parentFormGroup,
      defaultErrorStateMatcher
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Helps identify whether the directive is being used for textarea or text-field
    this.jbInput === ''
      ? this.addClasses('jb-input')
      : this.addClasses('h-7 jb-text-area');

    setTimeout(() => {
      this.currentCharacterCount =
        (this.elementRef.nativeElement.value &&
          this.elementRef.nativeElement.value.length) ||
        0;
      this.charactersRemainingCount =
        this.maxlength - this.currentCharacterCount;
    });
  }

  ngOnChanges(change: SimpleChanges) {
    this.validateType();
    // sync native attributes with directive
    Object.keys(change).forEach((attribute) => {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        attribute,
        change[attribute].currentValue
      );
    });
  }

  ngDoCheck() {
    super.ngDoCheck();

    const inputValue = this.elementRef.nativeElement.value;
    if (this.value !== inputValue) {
      this.value = this.escapeValue(inputValue);
      this.valueChanges.emit(this.value);
    }
  }

  escapeValue(value: string): string {
    return this.encodeURIComponent(value)
      .replace(new RegExp('%20', 'g'), ' ')
      .replace(new RegExp('%40', 'g'), '@');
  }

  encodeURIComponent(value: string): string {
    return encodeURIComponent(value);
  }

  inputChange() {
    // a no-op function that hooks into (input) event
    // Angular doesnt run change detection on the input unless (input) event is handled
    this.currentCharacterCount =
      (this.elementRef.nativeElement.value &&
        this.elementRef.nativeElement.value.length) ||
      0;
    this.charactersRemainingCount = this.maxlength - this.currentCharacterCount;
  }

  validateType(): void {
    if (!isValidInputType(this.type)) {
      throw Error(`Invalid input type "${this.type}"`);
    }
  }

  setAriaLabelledBy(id: string) {
    this.ariaLabelledBy = id;
  }

  handleFocus(focus: boolean) {
    this.isFocused = focus;
    focus ? this.onFocus.emit() : this.onBlur.emit();
  }

  setStyleType(styleType: JbVariantTypeEnum) {
    const styles =
      styleType === JbVariantTypeEnum.primary
        ? this.STYLE_PRIMARY
        : this.STYLE_SECONDARY;
    this.addClasses(styles);
  }

  addClasses(classes: string) {
    this.domService.addClassesAsString(this.elementRef, this.renderer, classes);
  }
}
