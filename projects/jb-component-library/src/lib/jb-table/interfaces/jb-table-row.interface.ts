import { JbTableCell } from './jb-table-cell.interface';

export interface JbTableRow {
  id: number;
  rowName?: string;
  isSubHeader?: boolean;
  rowData: JbTableCell[];
}
