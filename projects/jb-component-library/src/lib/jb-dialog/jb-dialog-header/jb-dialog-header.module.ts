import { NgModule } from '@angular/core';

import { JbDialogHeaderComponent } from './jb-dialog-header.component';
import { JbButtonCloseModule } from '../../jb-button-close/jb-button-close.module';

@NgModule({
  imports: [JbButtonCloseModule],
  declarations: [JbDialogHeaderComponent],
  exports: [JbDialogHeaderComponent],
})
export class JbDialogHeaderModule {}
