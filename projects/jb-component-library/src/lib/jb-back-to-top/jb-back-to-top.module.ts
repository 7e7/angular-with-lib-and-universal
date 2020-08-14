import { NgModule } from '@angular/core';
import { JbIconModule } from './../jb-icon/jb-icon.module';

import { JbBackToTopComponent } from './jb-back-to-top.component';

@NgModule({
  imports: [JbIconModule],
  declarations: [JbBackToTopComponent],
  exports: [JbBackToTopComponent],
})
export class JbBackToTopModule {}
