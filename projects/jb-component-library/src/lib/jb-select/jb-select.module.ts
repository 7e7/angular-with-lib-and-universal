import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { JbSelectComponent } from './jb-select.component';

import { JbSelectOptionComponent } from './jb-select-option/jb-select-option.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbCopyModule } from '../jb-copy/jb-copy.module';
import { JbUtilsModule } from '../jb-utils/utils.module';
import { JbInputLabelModule } from '../forms/jb-input-label.module';
import { JbPopoverModule } from '../jb-popover/jb-popover.module';
import { JbFlyoutModule } from '../jb-flyout/jb-flyout.module';
import { JbExpandableButtonModule } from '../jb-expandable-button/jb-expandable-button.module';

@NgModule({
  imports: [
    JbIconModule,
    JbCopyModule,
    ReactiveFormsModule,
    JbUtilsModule,
    JbInputLabelModule,
    JbPopoverModule,
    JbFlyoutModule,
    JbExpandableButtonModule,
  ],
  declarations: [JbSelectComponent, JbSelectOptionComponent],
  exports: [JbSelectComponent, JbSelectOptionComponent],
})
export class JbSelectModule {}
