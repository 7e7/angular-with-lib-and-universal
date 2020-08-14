import {
  Component,
  Input,
  AfterViewInit,
  ContentChild,
  ViewChild,
  HostBinding,
} from '@angular/core';

import { JbFlyoutComponent } from '../jb-flyout/jb-flyout.component';
import { JbPopoverDirective } from '../jb-popover/jb-popover.directive';
import { JbFormFieldControlDirective } from '../forms/form-field-control.directive';

@Component({
  selector: 'jb-select-button',
  templateUrl: './jb-select-button.component.html',
  styleUrls: ['./jb-select-button.component.scss'],
})
export class JbSelectButtonComponent extends JbFormFieldControlDirective
  implements AfterViewInit {
  @Input() placeholder: string;
  @Input() value: string;
  @Input() ariaDescribedBy: string;
  @Input('hasError')
  set hasError(value: boolean) {
    this.classes = value ? 'jb-invalid' : '';
    this._hasError = value;
  }
  get hasError() {
    return this._hasError;
  }
  @Input() flyoutRef: string;

  @HostBinding('class') classes = '';

  @ContentChild(JbFlyoutComponent) flyout: JbFlyoutComponent;

  @ViewChild('anchor') anchor: JbPopoverDirective;

  // tslint:disable-next-line: variable-name
  private _hasError: boolean;

  ngAfterViewInit(): void {
    if (this.flyout) {
      this.anchor.flyout = this.flyout;
    }
  }
}
