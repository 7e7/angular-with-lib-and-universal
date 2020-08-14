import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbTabsComponent } from './jb-tabs.component';
import { JbTabPanelComponent } from './jb-tab-panel/jb-tab-panel.component';
import { JbTabNavigationScrollButtonComponent } from './jb-tab-navigation-scroll-button/jb-tab-navigation-scroll-button.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbUtilsModule } from '../jb-utils/utils.module';

@NgModule({
  imports: [CommonModule, JbIconModule, JbUtilsModule],
  declarations: [
    JbTabsComponent,
    JbTabPanelComponent,
    JbTabNavigationScrollButtonComponent,
  ],
  exports: [JbTabsComponent, JbTabPanelComponent],
})
export class JbTabsModule {}
