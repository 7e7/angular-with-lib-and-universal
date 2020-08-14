import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbFlyoutModule } from '../jb-flyout/jb-flyout.module';
import { JbPopoverModule } from '../jb-popover/jb-popover.module';
import { JbActionMenuComponent } from './jb-action-menu.component';
import { JbActionMenuItemComponent } from './jb-action-menu-item/jb-action-menu-item.component';
import { JbActionMenuIconComponent } from './jb-action-menu-icon/jb-action-menu-icon.component';
import { JbUtilsModule } from './../jb-utils/utils.module';

@NgModule({
  imports: [CommonModule, JbUtilsModule, JbFlyoutModule, JbPopoverModule],
  declarations: [
    JbActionMenuComponent,
    JbActionMenuItemComponent,
    JbActionMenuIconComponent,
  ],
  exports: [
    JbActionMenuComponent,
    JbActionMenuItemComponent,
    JbActionMenuIconComponent,
  ],
})
export class JbActionMenuModule {}
