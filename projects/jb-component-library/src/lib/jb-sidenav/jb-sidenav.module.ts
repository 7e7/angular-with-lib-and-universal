import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbSidenavContainerModule } from './jb-sidenav-container/jb-sidenav.module';
import { JbSidenavContentModule } from './jb-sidenav-content/jb-sidenav-content.module';

import { JbSidenavComponent } from './jb-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    JbIconModule,
    JbSidenavContainerModule,
    JbSidenavContentModule,
  ],
  declarations: [JbSidenavComponent],
  exports: [
    JbSidenavComponent,
    JbSidenavContainerModule,
    JbSidenavContentModule,
  ],
})
export class JbSidenavModule {}

export {
  JbSidenavContainerComponent,
} from './jb-sidenav-container/jb-sidenav-container.component';
