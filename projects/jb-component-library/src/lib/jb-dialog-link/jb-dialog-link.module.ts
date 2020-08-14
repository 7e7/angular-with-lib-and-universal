import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbDialogLinkComponent } from './jb-dialog-link.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbUtilsModule } from '../jb-utils/utils.module';
import { JbSrOnlyModule } from '../jb-sr-only/jb-sr-only.module';

@NgModule({
  imports: [CommonModule, JbIconModule, JbUtilsModule, JbSrOnlyModule],
  declarations: [JbDialogLinkComponent],
  exports: [JbDialogLinkComponent],
  providers: [],
})
export class JbDialogLinkModule {}
