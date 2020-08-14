import {
  Component,
  ContentChild,
  ContentChildren,
  QueryList,
  Input,
  OnDestroy,
  AfterContentInit,
} from '@angular/core';
import { merge, combineLatest, Subscription } from 'rxjs';
import { startWith, map, mapTo } from 'rxjs/operators';

import { JbErrorComponent } from '../jb-error/jb-error.component';
import { JbHintComponent } from '../jb-hint/jb-hint.component';
import { JbFormFieldControlDirective } from '../forms/form-field-control.directive';
import { JbVariantTypeEnum } from '../types/jb-variant-type.enum';
import { JbInputLabelComponent } from '../jb-input/jb-input-label.component';
import {
  JbLabelShrinkable,
  isLabelShrinkable,
} from '../types/jb-label-shrinkable.interface';

@Component({
  selector: 'jb-form-field-container',
  templateUrl: './jb-form-field-container.component.html',
  host: {
    class: 'db',
  },
})
export class JbFormFieldContainerComponent
  implements OnDestroy, AfterContentInit {
  get textFieldIsPrimary(): boolean {
    return this.type === JbVariantTypeEnum.primary;
  }

  @ContentChildren(JbErrorComponent) errorComponents: QueryList<
    JbErrorComponent
  >;
  @ContentChildren(JbHintComponent) hintComponents: QueryList<JbHintComponent>;
  @ContentChild(JbInputLabelComponent)
  textFieldLabel: JbInputLabelComponent;

  /**
   * Flag that controls what styling to apply to the textField and label components.
   */
  @Input() type: JbVariantTypeEnum = JbVariantTypeEnum.primary;

  // force text field type for easier use
  textField: JbLabelShrinkable;

  private controls: JbFormFieldControlDirective[] = [];
  private isLabelShrunkSubscription = new Subscription();

  registerControl(control: JbFormFieldControlDirective) {
    this.controls.push(control);

    if (this.errorComponents || this.hintComponents) {
      // nested controls will register after ngAfterContentInit,
      // so we call for a sync here
      this.syncComponents(control);
    }
  }

  ngAfterContentInit() {
    if (this.controls.length) {
      this.controls.forEach((control) => this.syncComponents(control));
    }
  }

  ngOnDestroy() {
    this.isLabelShrunkSubscription.unsubscribe();
  }

  private syncComponents(control: JbFormFieldControlDirective) {
    const helpComponents: (JbErrorComponent | JbHintComponent)[] = [
      ...(this.errorComponents ? this.errorComponents.toArray() : []),
      ...(this.hintComponents ? this.hintComponents.toArray() : []),
    ];

    if (helpComponents.length) {
      this.setControlForHelpComponents(helpComponents, control);
    }

    // This method is going to bug out if there's multiple text fields
    if (isLabelShrinkable(control)) {
      this.textField = control as any;

      this.syncTextFieldStyle();

      if (this.textFieldIsPrimary) {
        this.syncTextFieldLabelShrink();
      }
    }
  }

  private syncTextFieldStyle() {
    this.textFieldLabel.setStyleType(this.type);
    // setStyleType is strictly for textField, not all shrinkable elements, so we set `any` here
    (this.textField as any).setStyleType(this.type);
    this.textField.setAriaLabelledBy(this.textFieldLabel.id);
  }

  private syncTextFieldLabelShrink() {
    const value$ = this.textField.valueChanges.pipe(
      startWith(this.textField.value)
    );

    const isFocused$ = merge(
      this.textField.onFocus.pipe(mapTo(true)),
      this.textField.onBlur.pipe(mapTo(false))
    ).pipe(startWith(false));

    this.isLabelShrunkSubscription = combineLatest([
      isFocused$,
      value$.pipe(map((value: any) => Boolean(value && value.length > 0))),
    ])
      .pipe(map(([isFocused, hasValue]) => isFocused || hasValue))
      .subscribe((isLabelShrunk) =>
        this.textFieldLabel.setIsLabelShrunk(isLabelShrunk)
      );
  }

  private setControlForHelpComponents(
    components: (JbErrorComponent | JbHintComponent)[],
    control: JbFormFieldControlDirective
  ) {
    components.forEach((component) => {
      component.setControl(control);
    });

    const describedByIds = components
      .map(({ id }) => id)
      .filter((id) => id)
      .join(' ');

    control.setAriaDescribedBy(describedByIds);
  }
}
