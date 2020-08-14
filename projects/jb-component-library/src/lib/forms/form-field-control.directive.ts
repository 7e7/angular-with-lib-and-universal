import {
  DoCheck,
  OnInit,
  Inject,
  forwardRef,
  Optional,
  Self,
  HostBinding,
  Directive,
} from '@angular/core';
import {
  NgControl,
  NgForm,
  FormGroupDirective,
  FormControl,
} from '@angular/forms';
import { ErrorStateMatcher } from '../forms/error-state-matcher';
import { JbFormFieldContainerComponent } from '../jb-form-field-container/jb-form-field-container.component';

/**
 * @internal
 * Be aware that overrides to ngOnInit, ngDoCheck, or constructor needs to call `super`.
 * If the inherited class needs other dependencies, it must declare all the declarations below as well.
 */

@Directive()
export class JbFormFieldControlDirective implements DoCheck, OnInit {
  @HostBinding('class.jb-invalid') errorState: boolean;
  ariaDescribedBy: string;
  canBeValidated = false;

  constructor(
    @Optional()
    @Inject(forwardRef(() => JbFormFieldContainerComponent))
    private container: JbFormFieldContainerComponent,

    @Optional()
    @Self()
    public ngControl: NgControl,
    @Optional() private ngForm: NgForm,
    @Optional() public parentFormGroup: FormGroupDirective,
    private defaultErrorStateMatcher: ErrorStateMatcher
  ) {
    // Do this instead of providing NG_VALUE_ACCESSOR to avoid circular dependency
    // writeValue is usually implemented except for in jbInputDirective
    if (this.ngControl && (this as any).writeValue) {
      this.ngControl.valueAccessor = this as any;
    }
  }

  ngDoCheck() {
    this.updateErrorState();
  }

  ngOnInit() {
    if (this.container) {
      this.container.registerControl(this as any);
    }
  }

  allowValidate() {
    this.canBeValidated = true;
  }

  setAriaDescribedBy(ids: string): void {
    this.ariaDescribedBy = ids;
  }

  private updateErrorState() {
    const parent: FormGroupDirective | NgForm | null =
      this.parentFormGroup || this.ngForm;
    /**
     * The canBeValidated flag is used to determine when we should start doing
     * error validation.  For example, the select canBeValidated flag is not set
     * until a selection or blur, and this flag prevents validation on the first
     * touch event.
     */
    if (
      this.ngControl &&
      (this.canBeValidated || (parent && parent.submitted))
    ) {
      this.errorState = this.defaultErrorStateMatcher.isErrorState(
        this.ngControl.control as FormControl,
        parent
      );
    } else {
      this.errorState = false;
    }
  }
}
