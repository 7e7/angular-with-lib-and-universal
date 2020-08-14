import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbFareSaleButtonComponent } from './jb-fare-sale-button/jb-fare-sale-button.component';
import { JbCopyModule } from '../jb-copy/jb-copy.module';
import { JbSrOnlyModule } from '../jb-sr-only/jb-sr-only.module';

@NgModule({
  imports: [CommonModule, JbCopyModule, JbSrOnlyModule],
  declarations: [JbFareSaleButtonComponent],
  exports: [JbFareSaleButtonComponent],
})
export class JbFareSaleModule {}
