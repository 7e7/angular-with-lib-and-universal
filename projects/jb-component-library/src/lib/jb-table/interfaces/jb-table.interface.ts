import { JbTableRow } from './jb-table-row.interface';
import { JbTableHeader } from './jb-table-header.interface';

export interface JbTable {
  tableName?: string;
  type: 'simple' | 'comparison';
  legal?: string[];
  fixHeader: boolean;
  mobileGrouping?: 'row' | 'column';
  headers: JbTableHeader[];
  rows: JbTableRow[];
  footers?: JbTableRow[];
}
