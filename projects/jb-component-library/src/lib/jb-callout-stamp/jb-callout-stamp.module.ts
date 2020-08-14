import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbCalloutStampComponent } from './jb-callout-stamp.component';
@NgModule({
  imports: [CommonModule],
  declarations: [JbCalloutStampComponent],
  exports: [JbCalloutStampComponent, CommonModule],
})
export class JbCalloutStampModule {}
