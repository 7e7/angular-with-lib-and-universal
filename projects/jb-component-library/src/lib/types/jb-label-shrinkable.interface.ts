import { EventEmitter } from '@angular/core';

// @private
// This is a form field control. For now only text field and text area use this interface
// But ideally, all shrinkable controls should use it.
export interface JbLabelShrinkable<T = any> {
  value: T;
  valueChanges: EventEmitter<T>;
  onFocus: EventEmitter<void | Event>;
  onBlur: EventEmitter<void | Event>;
  setAriaLabelledBy(labelId: string): void;
}

export function isLabelShrinkable(obj: any): obj is JbLabelShrinkable {
  return Boolean(obj.valueChanges && obj.onFocus && obj.setAriaLabelledBy);
}
