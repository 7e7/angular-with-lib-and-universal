import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { JbErrorModule } from '../jb-error/jb-error.module';
import { JbInputLabelModule } from '../forms/jb-input-label.module';
import { JbInputLabelComponent } from './jb-input-label.component';
import { JbInputDirective } from './jb-input.directive';

@NgModule({
  imports: [JbErrorModule, CommonModule, FormsModule, JbInputLabelModule],
  declarations: [JbInputDirective, JbInputLabelComponent],
  exports: [JbInputDirective, JbInputLabelComponent],
})
export class JbInputModule {}
