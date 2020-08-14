import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Inject,
  forwardRef,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  NgForm,
  FormGroupDirective,
} from '@angular/forms';

import { JbFormFieldControlDirective } from '../forms/form-field-control.directive';
import { JbFormFieldContainerComponent } from '../jb-form-field-container/jb-form-field-container.component';
import { ErrorStateMatcher } from '../forms/error-state-matcher';
import { JbDeviceService } from '../jb-utils/services/device-service';

@Component({
  selector: 'jb-incrementer',
  templateUrl: './jb-incrementer.component.html',
  styleUrls: ['./jb-incrementer.component.scss'],
})
export class JbIncrementerComponent extends JbFormFieldControlDirective
  implements ControlValueAccessor {
  /** Sets the min allowed value for the incrementer component */
  @Input() min = 0;
  /** Sets the max allowed value for the incrementer component */
  @Input() max = Infinity;
  /** To be used when both incrementers are to be disabled (For instance, form submission) */
  @Input() isDisabled = false;
  /** Holds the value to be displayed */
  @Input() value = 0;
  /** Displays the label for the component */
  @Input() label = '';
  /** Displays the label the decrease button */
  @Input() decreaseLabel = 'decrease';
  /** Displays the label the increase button */
  @Input() increaseLabel = 'increase';
  /** To be used when component should occupy full width of parent */
  @Input() fluidWidth = false;
  /** Emits the modified value back */
  @Output() onChange = new EventEmitter<number>();

  /** Decrement button being hovered */
  isDecrementFocused = false;
  /** Increment button being hovered */
  isIncrementFocused = false;

  control = new FormControl();
  isMobileDevice = false;

  constructor(
    private deviceService: JbDeviceService,

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

    this.isMobileDevice = this.deviceService.isDevice();
  }

  onChangeCallback = (_: any) => undefined;
  onTouched = () => undefined;

  /** Calculates the value entered, whether it's incrementing or decrementing */
  stepBy(num: number): void {
    this.writeValue(this.value + num);

    // update icon state on mobile devices after click is triggered
    if (this.isMobileDevice) {
      this.isDecrementFocused = num < 0 && !this.isMinDisable;
      this.isIncrementFocused = num > 0 && !this.isMaxDisable;
    }
  }

  /** Decrement button handler, updates the hover state of the button. */
  decrementHoverHandler(state: boolean): void {
    // decrementHoverHandler will be called even on actual mobile devices
    if (this.isMobileDevice) {
      return;
    }

    this.isDecrementFocused = state;

    if (this.isIncrementFocused && this.isMaxDisable) {
      this.isIncrementFocused = false;
    }
  }

  /** Increment button handler, updates the hover state of the button. */
  incrementHoverHandler(state: boolean): void {
    // incrementHoverHandler will be called even on actual mobile devices
    if (this.isMobileDevice) {
      return;
    }

    this.isIncrementFocused = state;

    if (this.isDecrementFocused && this.isMinDisable) {
      this.isDecrementFocused = false;
    }
  }

  writeValue(value: any) {
    const numValue = Number(value);

    if (this.value === numValue) {
      return;
    }

    this.value = numValue;
    this.onChange.emit(this.value);
    this.onChangeCallback(this.value);
  }

  /** Assigns a callback to onChange property that is fired on the change event */
  registerOnChange(fn: (_: any) => void): void {
    this.onChangeCallback = fn;
  }

  /**  Assigns a callback to the onTouched property */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** Checks whether the value entered exceeds the maximum number allowed */
  get isMaxDisable(): boolean {
    return this.value >= this.max || this.isDisabled;
  }
  /** Checks whether the value entered is lowered the minimum number allowed */
  get isMinDisable(): boolean {
    return this.value <= this.min || this.isDisabled;
  }
  /** returns the corresponding icon name for hover states (applies only to disabled scenarios) */
  get disableIncrementerUp(): string {
    return this.isMaxDisable ? 'incrementerUp' : 'incrementerUpHover';
  }
  /** returns the corresponding icon name for hover states (applies only to disabled scenarios) */
  get disableIncrementerDown(): string {
    return this.isMinDisable ? 'incrementerDown' : 'incrementerDownHover';
  }
}
