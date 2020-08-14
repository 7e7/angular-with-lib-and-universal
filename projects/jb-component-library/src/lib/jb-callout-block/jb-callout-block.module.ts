import { NgModule } from '@angular/core';

import { JbCalloutBlockComponent } from './jb-callout-block.component';
import { JbCopyModule } from './../jb-copy/jb-copy.module';
import { JbIconModule } from './../jb-icon/jb-icon.module';
import { JbImageModule } from './../jb-image/jb-image.module';

@NgModule({
  imports: [JbCopyModule, JbIconModule, JbImageModule],
  declarations: [JbCalloutBlockComponent],
  exports: [JbCalloutBlockComponent],
})
export class JbCalloutBlockModule {}
