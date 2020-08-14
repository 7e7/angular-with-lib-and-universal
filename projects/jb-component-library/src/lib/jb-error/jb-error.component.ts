import { Component, Input } from '@angular/core';

import { NgControl } from '@angular/forms';
import { JbFormFieldControlDirective } from '../forms/form-field-control.directive';

let uniqueId = 0;

@Component({
  selector: 'jb-error',
  templateUrl: './jb-error.component.html',
  host: {
    class: 'jb-error',
    '[id]': 'id',
  },
})
export class JbErrorComponent {
  @Input() id = `jb-error-id-${uniqueId++}`;

  ngControl: NgControl;
  controls: JbFormFieldControlDirective[] = [];

  @Input() forError: string;
  @Input() showErrorIf: boolean;

  // Errors appear if any of the controls within form-field-container has error
  get controlHasError(): boolean {
    return (
      this.controls.length && this.controls.some(this.doesControlHaveError)
    );
  }

  doesControlHaveError = (control: JbFormFieldControlDirective) => {
    return (
      this.forError &&
      control.ngControl &&
      control.ngControl.hasError(this.forError) &&
      control.errorState
    );
  };

  setControl(control: JbFormFieldControlDirective) {
    this.controls.push(control);
  }
}
