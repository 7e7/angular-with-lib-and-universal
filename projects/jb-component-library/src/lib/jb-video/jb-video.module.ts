import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbVideoThumbnailModule } from './jb-video-thumbnail/jb-video-thumbnail.module';
import { JbVideoDialogModule } from './jb-video-dialog/jb-video-dialog.module';
import { JbVideoComponent } from './jb-video.component';
import { JbVideoDialogComponent } from './jb-video-dialog/jb-video-dialog.component';
import { JbMediaModule } from '../jb-media/jb-media.module';

@NgModule({
  imports: [
    CommonModule,
    JbVideoThumbnailModule,
    JbVideoDialogModule,
    JbMediaModule,
  ],
  declarations: [JbVideoComponent],
  exports: [JbVideoComponent],
  entryComponents: [JbVideoDialogComponent],
})
export class JbVideoModule {}
