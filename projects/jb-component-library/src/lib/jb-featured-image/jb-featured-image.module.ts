import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbImageModule } from '../jb-image/jb-image.module';
import { JbMediaModule } from '../jb-media/jb-media.module';
import { JbFeaturedImageComponent } from './jb-featured-image.component';

@NgModule({
  imports: [CommonModule, JbImageModule, JbMediaModule],
  declarations: [JbFeaturedImageComponent],
  exports: [JbFeaturedImageComponent],
})
export class JbFeaturedImageModule {}
