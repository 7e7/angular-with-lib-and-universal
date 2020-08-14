import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbSelectButtonComponent } from './jb-select-button.component';

import { JbFlyoutModule } from '../jb-flyout/jb-flyout.module';
import { JbPopoverModule } from '../jb-popover/jb-popover.module';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbInputLabelModule } from '../forms/jb-input-label.module';
import { JbExpandableButtonModule } from '../jb-expandable-button/jb-expandable-button.module';

@NgModule({
  imports: [
    CommonModule,
    JbFlyoutModule,
    JbPopoverModule,
    JbIconModule,
    JbInputLabelModule,
    JbExpandableButtonModule,
  ],
  declarations: [JbSelectButtonComponent],
  exports: [JbSelectButtonComponent],
})
export class JbSelectButtonModule {}
