import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbMediaCaptionComponent } from './jb-media-caption/jb-media-caption.component';
import { JbMediaTitleComponent } from './jb-media-title/jb-media-title.component';
import { JbCopyModule } from '../jb-copy/jb-copy.module';

@NgModule({
  imports: [CommonModule, JbCopyModule],
  declarations: [JbMediaCaptionComponent, JbMediaTitleComponent],
  exports: [JbMediaCaptionComponent, JbMediaTitleComponent],
})
export class JbMediaModule {}
