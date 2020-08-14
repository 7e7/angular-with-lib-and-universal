import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
  OnInit,
  AfterContentInit,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

let uniqueId = 0;

@Component({
  selector: 'jb-radio',
  templateUrl: './jb-radio.component.html',
  styleUrls: ['./jb-radio.component.scss'],

  host: {
    class: 'flex items-center pv1',
  },
})
export class JbRadioComponent
  implements ControlValueAccessor, OnInit, AfterContentInit {
  /** Whether the radio button is checked or not. */
  @Input() checked: boolean;

  /** Group id used to connected radios */
  groupId: string;
  modelValue: any;
  /** Radio id is used to connect input to label */
  readonly radioId = `jb-radio-${uniqueId++}`;
  /** Value of the radio button.  */
  @Input() value: any;
  /** Whether the radio button is disabled or not. */
  @Input() disabled: boolean;

  /** Emits when the radio button value changes */
  @Output() blur = new EventEmitter<void>();
  @Output() valueChanged = new EventEmitter<any>();

  // @deprecated
  constructor(
    @Optional()
    @Self()
    public ngControl: NgControl
  ) {
    // Do this instead of providing NG_VALUE_ACCESSOR to avoid circular dependency
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.checked) {
      this.modelValue = this.value;
    }
    this.writeValue(this.modelValue);
  }

  ngAfterContentInit(): void {
    if (typeof this.value === 'undefined') {
      console.warn('jb-radio must have a value');
    }
  }

  // @deprecated
  onChange = (_: any) => {
    /**/
  };

  // @deprecated
  onTouched = () => {
    /**/
  };

  // @deprecated
  writeValue(value: any): void {
    this.modelValue = value;

    if (this.value === undefined) {
      return;
    }

    const isChecked = value !== undefined && value === this.value;

    const previousChecked = this.checked;
    this.checked = isChecked;

    // if it wasn't previously checked, but now it is checked, fire value change
    if (!previousChecked && this.checked) {
      this._changeValue();
    }
  }

  // @deprecated
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // @deprecated
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  _blur(): void {
    this.onTouched(); // @deprecated
    this.blur.emit();
  }

  _changeValue(): void {
    this.onChange(this.value); // @deprecated
    this.valueChanged.emit(this.value);
  }
}
