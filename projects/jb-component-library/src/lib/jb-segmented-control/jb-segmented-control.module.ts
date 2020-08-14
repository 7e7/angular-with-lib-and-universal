import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbSegmentedControlComponent } from './jb-segmented-control.component';
import { JbSegmentComponent } from './jb-segment.component';

@NgModule({
  imports: [CommonModule],
  declarations: [JbSegmentedControlComponent, JbSegmentComponent],
  exports: [JbSegmentedControlComponent, JbSegmentComponent],
  providers: [],
})
export class JbSegmentedControlModule {}
