import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { JbFormFieldControlDirective } from '../forms/form-field-control.directive';

@Component({
  selector: 'jb-toggle',
  styleUrls: ['./jb-toggle.component.scss'],
  templateUrl: './jb-toggle.component.html',
  host: { class: 'flex' },
})
export class JbToggleComponent extends JbFormFieldControlDirective
  implements ControlValueAccessor {
  ariaDescribedBy: string;
  @Input() value = false;
  @Input() disabled = false;
  @Input() label: string;

  @Output() toggle = new EventEmitter<boolean>();

  onChange = (_: any) => undefined;
  onTouched = () => undefined;

  writeValue(value: any) {
    if (value === this.value) {
      return;
    }

    const boolValue = Boolean(value);
    this.value = boolValue;
    this.onChange(this.value);
    this.toggle.emit(this.value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** Assigns a callback to onChange property that is fired on the change event */
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  /**  Assigns a callback to the onTouched property */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  switchToggle(): void {
    this.writeValue(!this.value);
  }
}
