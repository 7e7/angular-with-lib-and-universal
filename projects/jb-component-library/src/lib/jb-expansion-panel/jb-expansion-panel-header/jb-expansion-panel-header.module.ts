import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JbIconModule } from '../../jb-icon/jb-icon.module';
import { JbExpansionPanelHeaderComponent } from './jb-expansion-panel-header.component';
import { JbExpansionPanelHeaderExpandedOnlyContentComponent } from './jb-expansion-panel-header-expanded-only-content.component';
import { JbExpansionPanelHeaderCollapsedOnlyContentComponent } from './jb-expansion-panel-header-collapsed-only-content.component';

@NgModule({
  imports: [CommonModule, JbIconModule],
  declarations: [
    JbExpansionPanelHeaderComponent,
    JbExpansionPanelHeaderExpandedOnlyContentComponent,
    JbExpansionPanelHeaderCollapsedOnlyContentComponent,
  ],
  exports: [
    JbExpansionPanelHeaderComponent,
    JbExpansionPanelHeaderExpandedOnlyContentComponent,
    JbExpansionPanelHeaderCollapsedOnlyContentComponent,
  ],
})
export class JbExpansionPanelHeaderModule {}
