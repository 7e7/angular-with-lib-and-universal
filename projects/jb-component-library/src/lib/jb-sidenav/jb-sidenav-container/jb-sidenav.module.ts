import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JbSidenavContainerComponent } from './jb-sidenav-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [JbSidenavContainerComponent],
  exports: [JbSidenavContainerComponent],
})
export class JbSidenavContainerModule {}
