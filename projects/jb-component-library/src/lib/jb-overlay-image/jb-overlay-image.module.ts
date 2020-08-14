import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbImageModule } from '../jb-image/jb-image.module';

import { JbOverlayImageComponent } from './jb-overlay-image.component';

@NgModule({
  imports: [CommonModule, JbImageModule],
  declarations: [JbOverlayImageComponent],
  exports: [JbOverlayImageComponent],
})
export class JbOverlayImageModule {}
