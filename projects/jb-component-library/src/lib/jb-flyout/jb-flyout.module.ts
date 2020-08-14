import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { JbPopoverModule } from '../jb-popover/jb-popover.module';

import { JbFlyoutComponent } from './jb-flyout.component';
import { JbFlyoutInnerComponent } from './jb-flyout-inner.component';
import { CommonModule } from '@angular/common';
import { JbUtilsModule } from '../jb-utils/utils.module';

@NgModule({
  imports: [A11yModule, JbPopoverModule, CommonModule, JbUtilsModule],
  declarations: [JbFlyoutComponent, JbFlyoutInnerComponent],
  exports: [JbFlyoutComponent, JbFlyoutInnerComponent],
})
export class JbFlyoutModule {}
