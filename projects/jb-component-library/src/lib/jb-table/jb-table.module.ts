import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbTableComponent } from './jb-table.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbExpansionPanelModule } from '../jb-expansion-panel/jb-expansion-panel.module';

@NgModule({
  imports: [CommonModule, JbIconModule, JbExpansionPanelModule],
  declarations: [JbTableComponent],
  exports: [JbTableComponent],
})
export class JbTableModule {}

export { JbTableRow } from './interfaces/jb-table-row.interface';
export { JbTableCell } from './interfaces/jb-table-cell.interface';
export { JbTable } from './interfaces/jb-table.interface';
export { JbTableHeader } from './interfaces/jb-table-header.interface';
