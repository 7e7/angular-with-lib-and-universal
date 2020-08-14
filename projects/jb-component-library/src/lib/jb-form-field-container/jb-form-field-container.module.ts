import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbFormFieldContainerComponent } from './jb-form-field-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [JbFormFieldContainerComponent],
  exports: [JbFormFieldContainerComponent],
})
export class JbFormFieldContainerModule {}
