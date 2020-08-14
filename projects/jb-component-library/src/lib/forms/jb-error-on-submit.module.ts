import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbErrorOnSubmitDirective } from './jb-error-on-submit.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [JbErrorOnSubmitDirective],
  exports: [JbErrorOnSubmitDirective],
})
export class JbErrorOnSubmitModule {}
