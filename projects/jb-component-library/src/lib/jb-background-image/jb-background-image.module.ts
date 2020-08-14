import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbBackgroundComponent } from './jb-background.component';
import { JbImageModule } from '../jb-image/jb-image.module';

@NgModule({
  imports: [CommonModule, JbImageModule],
  declarations: [JbBackgroundComponent],
  exports: [JbBackgroundComponent],
})
export class JbBackgroundImageModule {}
