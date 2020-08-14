import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbImageComponent } from './jb-image.component';
import { JbImageMinWidthDirective } from './directives/jb-image-min-width.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [JbImageComponent, JbImageMinWidthDirective],
  exports: [JbImageComponent, JbImageMinWidthDirective],
})
export class JbImageModule {}
