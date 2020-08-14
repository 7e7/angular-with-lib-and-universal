import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JbFlightBlockComponent } from './jb-flight-block.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbImageModule } from '../jb-image/jb-image.module';
import { JbDialogLinkModule } from '../jb-dialog-link/jb-dialog-link.module';
import { JbCalloutModule } from '../jb-callout/jb-callout.module';
import { JbCopyModule } from '../jb-copy/jb-copy.module';
import { JbFareSaleModule } from '../jb-fare-sale/jb-fare-sale.module';

@NgModule({
  imports: [
    CommonModule,
    JbIconModule,
    JbImageModule,
    JbDialogLinkModule,
    JbCalloutModule,
    JbCopyModule,
    JbFareSaleModule,
  ],
  declarations: [JbFlightBlockComponent],
  exports: [JbFlightBlockComponent],
})
export class JbFlightBlockModule {}
