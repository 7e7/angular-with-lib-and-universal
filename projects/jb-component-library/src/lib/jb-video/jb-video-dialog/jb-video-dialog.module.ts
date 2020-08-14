import { NgModule } from '@angular/core';

import { JbVideoDialogComponent } from './jb-video-dialog.component';
import { JbDialogModule } from './../../jb-dialog/jb-dialog.module';

@NgModule({
  imports: [JbDialogModule],
  declarations: [JbVideoDialogComponent],
  exports: [JbVideoDialogComponent],
})
export class JbVideoDialogModule {}
