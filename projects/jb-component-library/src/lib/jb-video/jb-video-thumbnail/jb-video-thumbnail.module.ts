import { NgModule } from '@angular/core';

import { JbVideoThumbnailComponent } from './jb-video-thumbnail.component';
import { JbIconModule } from './../../jb-icon/jb-icon.module';
import { JbImageModule } from './../../jb-image/jb-image.module';

@NgModule({
  imports: [JbIconModule, JbImageModule],
  declarations: [JbVideoThumbnailComponent],
  exports: [JbVideoThumbnailComponent],
})
export class JbVideoThumbnailModule {}
