import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbSidenavModule } from '../jb-sidenav/jb-sidenav.module';

import { JbToolbarComponent } from './jb-toolbar.component';

@NgModule({
  imports: [CommonModule, FormsModule, JbIconModule, JbSidenavModule],
  declarations: [JbToolbarComponent],
  exports: [JbToolbarComponent, JbSidenavModule],
})
export class JbToolbarModule {}
