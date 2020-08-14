import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbSubNavComponent } from './jb-subnav.component';

@NgModule({
  imports: [CommonModule],
  declarations: [JbSubNavComponent],
  exports: [JbSubNavComponent],
})
export class JbSubNavModule {}

export { JbSubNavComponent } from './jb-subnav.component';
