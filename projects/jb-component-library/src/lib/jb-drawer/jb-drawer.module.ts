import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { JbDrawerComponent } from './jb-drawer.component';
import { JbDrawerHeaderComponent } from './jb-drawer-header/jb-drawer-header.component';
import { JbDrawerBodyComponent } from './jb-drawer-body/jb-drawer-body.component';
import { JbButtonCloseModule } from './../jb-button-close/jb-button-close.module';
import { JbUtilsModule } from '../jb-utils/utils.module';
@NgModule({
  imports: [CommonModule, A11yModule, JbButtonCloseModule, JbUtilsModule],
  declarations: [
    JbDrawerComponent,
    JbDrawerHeaderComponent,
    JbDrawerBodyComponent,
  ],
  exports: [JbDrawerComponent, JbDrawerHeaderComponent, JbDrawerBodyComponent],
})
export class JbDrawerModule {}
