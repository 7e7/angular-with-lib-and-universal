import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbCalloutComponent } from './jb-callout.component';

@NgModule({
  declarations: [JbCalloutComponent],
  imports: [CommonModule],
  exports: [JbCalloutComponent, CommonModule],
})
export class JbCalloutModule {}
