import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ElementRef,
  Optional,
  Self,
  Inject,
  OnInit,
} from '@angular/core';

import {
  ControlValueAccessor,
  NgControl,
  NgForm,
  FormGroupDirective,
} from '@angular/forms';
import { JbFormFieldControlDirective } from '../forms/form-field-control.directive';
import { ErrorStateMatcher } from '../forms/error-state-matcher';
import { JbFormFieldContainerComponent } from '../jb-form-field-container/jb-form-field-container.component';

@Component({
  selector: 'jb-checkbox',
  templateUrl: './jb-checkbox.component.html',
  styleUrls: ['./jb-checkbox.component.scss'],
  host: {
    role: 'checkbox',
    '[attr.aria-checked]': 'checked',
    '(keydown.space)': '_changeValue($event)',
    '(keydown.Spacebar)': '_changeValue($event)', // IE11
    '(focus)': 'setFocus(true)',
    '(blur)': 'setFocus(false); onTouched(); allowValidate()',
    '(click)': '_changeValue($event); onTouched()',
  },
})
export class JbCheckboxComponent extends JbFormFieldControlDirective
  implements ControlValueAccessor, OnInit {
  errorState: boolean;
  ariaDescribedBy: string;
  @Input() label: string;
  /** If the checkbox is disabled or not */
  @Input() disabled = false;
  /** If the checkbox is checked or un-checked */
  @Input() checked = false;
  /** Emits when the checkbox value changes */
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  @Output()
  checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /** Store the focused state of the checkbox. */
  isFocused: boolean;

  constructor(
    private el: ElementRef,

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

  /** Set the tabIndex attribute. */
  ngOnInit() {
    super.ngOnInit();

    if (!this.disabled) {
      this.el.nativeElement.tabIndex = '0';
    }
  }

  /** Hook for the change event.
   * Assign a callback by passing it to registerOnChange.
   */
  onChange = (_: any) => {
    /**/
  };
  /** Hook for the touched event.
   * Assign a callback by passing it to registerOnTouched.
   */
  onTouched = () => {
    /**/
  };

  writeValue(value: any): void {
    if (value !== undefined) {
      this.checked = !!value;
    }
  }
  /** Assigns a callback to the change event. */
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  /** Assigns a callback to the touched event. */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** Sets the checked value to the new value.
   * Passes the new value to the change callback.
   * Emits the new value through valueChanged.
   */
  _changeValue(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
      this.valueChanged.emit(this.checked);
      this.checkedChange.emit(this.checked);
    }
  }

  /** Sets the focused state. */
  setFocus(focus: boolean) {
    this.isFocused = focus;
  }
}
