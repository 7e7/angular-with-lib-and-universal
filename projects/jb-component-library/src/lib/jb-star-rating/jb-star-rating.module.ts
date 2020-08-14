import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbStarRatingComponent } from './jb-star-rating.component';

@NgModule({
  imports: [CommonModule, JbIconModule],
  declarations: [JbStarRatingComponent],
  exports: [JbStarRatingComponent],
})
export class JbStarRatingModule {}
