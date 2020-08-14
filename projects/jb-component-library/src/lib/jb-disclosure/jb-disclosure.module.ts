import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbDisclosureComponent } from './jb-disclosure.component';
import { JbActionModule } from '../jb-action/jb-action.module';

@NgModule({
  imports: [CommonModule, JbIconModule, JbActionModule],
  declarations: [JbDisclosureComponent],
  exports: [JbDisclosureComponent],
})
export class JbDisclosureModule {}
