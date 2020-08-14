import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbProductBlockComponent } from './jb-product-block.component';
import { JbCalloutModule } from '../jb-callout/jb-callout.module';
import { JbCopyModule } from '../jb-copy/jb-copy.module';
import { JbSrOnlyModule } from '../jb-sr-only/jb-sr-only.module';

@NgModule({
  imports: [CommonModule, JbCalloutModule, JbCopyModule, JbSrOnlyModule],
  declarations: [JbProductBlockComponent],
  exports: [JbProductBlockComponent],
})
export class JbProductBlockModule {}
