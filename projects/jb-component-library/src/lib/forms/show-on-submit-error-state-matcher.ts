/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * Adapted from https://github.com/angular/material2/blob/master/src/lib/core/error/error-options.ts
 */

import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from './error-state-matcher';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

/** Error state matcher that matches when a control is invalid and form is submitted. */
@Injectable()
export class ShowOnSubmitErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && (form && form.submitted));
  }
}
