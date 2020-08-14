import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JbIconModule } from './../jb-icon/jb-icon.module';

import { JbCheckboxComponent } from './jb-checkbox.component';

@NgModule({
  imports: [CommonModule, JbIconModule],
  declarations: [JbCheckboxComponent],
  exports: [JbCheckboxComponent],
  providers: [],
})
export class JbCheckboxModule {}
