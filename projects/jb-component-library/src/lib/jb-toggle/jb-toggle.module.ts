import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbToggleComponent } from './jb-toggle.component';
import { JbCopyModule } from '../jb-copy/jb-copy.module';

@NgModule({
  imports: [CommonModule, JbCopyModule],
  declarations: [JbToggleComponent],
  exports: [JbToggleComponent],
})
export class JbToggleModule {}
