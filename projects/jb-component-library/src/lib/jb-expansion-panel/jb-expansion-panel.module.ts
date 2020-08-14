import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbAccordionModule } from './jb-accordion/jb-accordion.module';
import { JbExpansionPanelHeaderModule } from './jb-expansion-panel-header/jb-expansion-panel-header.module';
import { JbExpansionPanelRowModule } from './jb-expansion-panel-row/jb-expansion-panel-row.module';
import { JbExpansionPanelComponent } from './jb-expansion-panel.component';

@NgModule({
  imports: [
    CommonModule,
    JbAccordionModule,
    JbExpansionPanelHeaderModule,
    JbExpansionPanelRowModule,
  ],
  declarations: [JbExpansionPanelComponent],
  exports: [
    JbExpansionPanelComponent,
    JbAccordionModule,
    JbExpansionPanelHeaderModule,
    JbExpansionPanelRowModule,
  ],
})
export class JbExpansionPanelModule {}
