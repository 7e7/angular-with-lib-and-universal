import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { JbFormFieldControlDirective } from '../forms/form-field-control.directive';
import { JbRadioComponent } from './jb-radio.component';
import { merge, Subscription } from 'rxjs';
import { delay, startWith, switchMap } from 'rxjs/operators';

let uniqueId = 0;

@Component({
  selector: 'jb-radio-group',
  templateUrl: './jb-radio-group.component.html',
  host: {
    class: 'jb-radio-group',
  },
})
export class JbRadioGroupComponent extends JbFormFieldControlDirective
  implements ControlValueAccessor, AfterContentInit, OnDestroy {
  /** Label for the radio group. */
  @Input() label: string;
  @Input() ariaLabel: string;
  /** Option to style to layout the radio group horizontally */
  @Input() isHorizontal = false;
  /** The id of the group label. */
  labelId = `jb-radio-group-label-id-${uniqueId++}`;

  @ContentChildren(JbRadioComponent) radios: QueryList<JbRadioComponent>;

  value: any;
  errorState: boolean;
  ariaDescribedBy: string;
  subscriptions = new Subscription();

  ngAfterContentInit() {
    const radios$ = this.radios.changes.pipe(startWith(this.radios));

    // set the radio buttons' groupIds
    const groupIdSubscription = radios$
      .pipe(delay(0))
      .subscribe((queryListInstance) => {
        queryListInstance.forEach((radio) => (radio.groupId = this.labelId));
      });

    // listen to blur and then trigger onTouched
    const onTouchedSubscription = radios$
      .pipe(
        switchMap((queryListInstance) =>
          merge(...queryListInstance.map((radio) => radio.blur))
        )
      )
      .subscribe(() => {
        this.onTouched();
        this.allowValidate();
      });

    // listen to value changes and writeValue
    const valueChangeSubscription = radios$
      .pipe(
        switchMap((queryListInstance) =>
          merge(...queryListInstance.map((radio) => radio.valueChanged))
        )
      )
      .subscribe((value) => this.writeValue(value));

    // write value in case writeValue was called before content init
    if (this.value !== undefined) {
      this.writeValue(this.value);
    }

    this.subscriptions.add(groupIdSubscription);
    this.subscriptions.add(onTouchedSubscription);
    this.subscriptions.add(valueChangeSubscription);
  }

  /** Hook for the change event.
   * Assign a callback by passing it to registerOnChanged.
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

  writeValue(value: any) {
    // skip looping until radio children exist
    if (this.radios) {
      this.radios.forEach((radio) => {
        radio.checked = radio.value === value;
      });
    }

    if (this.value === value) {
      return;
    }

    this.value = value;
    this.onChange(value);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /** Assigns a callback to onChange property that is fired on the change event */
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  /**  Assigns a callback to the onTouched property */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
