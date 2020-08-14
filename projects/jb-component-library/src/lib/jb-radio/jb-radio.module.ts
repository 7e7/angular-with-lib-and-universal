import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbRadioComponent } from './jb-radio.component';
import { JbRadioGroupComponent } from './jb-radio-group.component';
@NgModule({
  imports: [CommonModule],
  declarations: [JbRadioComponent, JbRadioGroupComponent],
  exports: [JbRadioComponent, JbRadioGroupComponent],
  providers: [],
})
export class JbRadioModule {}
