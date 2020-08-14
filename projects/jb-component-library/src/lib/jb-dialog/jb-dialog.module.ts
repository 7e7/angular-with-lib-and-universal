import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

import { JbIconModule } from './../jb-icon/jb-icon.module';

import { JbDialogComponent } from './jb-dialog.component';
import { JbDialogTitleModule } from './jb-dialog-title/jb-dialog-title.module';
import { JbDialogContentModule } from './jb-dialog-content/jb-dialog-content.module';
import { JbDialogActionsModule } from './jb-dialog-actions/jb-dialog-actions.module';
import { JbDialogHeaderModule } from './jb-dialog-header/jb-dialog-header.module';
import { JbDialogCancelButtonModule } from './jb-dialog-cancel-button/jb-dialog-cancel-button.module';

import { JbDialogService } from './jb-dialog.service';
import { JbUtilsModule } from '../jb-utils/utils.module';

@NgModule({
  imports: [
    JbIconModule,
    JbDialogTitleModule,
    JbDialogContentModule,
    JbDialogActionsModule,
    JbDialogHeaderModule,
    JbDialogCancelButtonModule,
    JbUtilsModule,
    A11yModule,
  ],
  declarations: [JbDialogComponent],
  exports: [
    JbDialogComponent,
    JbDialogTitleModule,
    JbDialogContentModule,
    JbDialogActionsModule,
    JbDialogHeaderModule,
    JbDialogCancelButtonModule,
  ],
  providers: [JbDialogService],
})
export class JbDialogModule {}

export * from './jb-dialog.service';
