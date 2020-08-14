import { Directive } from '@angular/core';
import { ErrorStateMatcher } from './error-state-matcher';
import { ShowOnSubmitErrorStateMatcher } from './show-on-submit-error-state-matcher';

@Directive({
  selector: '[jbErrorOnSubmit]',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnSubmitErrorStateMatcher },
  ],
})
export class JbErrorOnSubmitDirective {}
