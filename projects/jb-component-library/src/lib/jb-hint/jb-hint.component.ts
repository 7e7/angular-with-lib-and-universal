import { Component, Input } from '@angular/core';

import { JbFormFieldControlDirective } from '../forms/form-field-control.directive';

let uniqueId = 0;

@Component({
  selector: 'jb-hint',
  templateUrl: './jb-hint.component.html',
  host: {
    class: 'jb-hint slate-gray',
    '[id]': 'id',
  },
})
export class JbHintComponent {
  @Input() id = `jb-hint-id-${uniqueId++}`;
  @Input() showHint: boolean;

  controls: JbFormFieldControlDirective[] = [];

  // Errors appear if any of the controls within form-field-container has error
  get controlHasError(): boolean {
    return this.controls.some((control) => control.errorState);
  }

  setControl(control: JbFormFieldControlDirective) {
    this.controls.push(control);
  }
}
