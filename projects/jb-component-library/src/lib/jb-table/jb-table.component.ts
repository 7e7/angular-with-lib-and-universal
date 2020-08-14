import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';

import { JbTableHeader } from './interfaces/jb-table-header.interface';
import { JbTableRow } from './interfaces/jb-table-row.interface';
import { JbTable } from './interfaces/jb-table.interface';
import { JbTableSortingDirectionEnum } from './types/jb-table-sorting-direction.enum';
import { JbColumnCellInterface } from './interfaces/jb-column-cell.interface';

@Component({
  selector: 'jb-table',
  templateUrl: './jb-table.component.html',
  styleUrls: ['./jb-table.component.scss'],
  host: { class: 'jb-grid' },
})
export class JbTableComponent implements OnChanges {
  @Input()
  set tableData(value: JbTable) {
    if (value) {
      this.title = value.tableName || '';
      this.type = value.type || 'simple';
      this.legal = value.legal || [];
      this.headers = value.headers || [];
      this.rows = value.rows || [];
      this.footers = value.footers || [];
      this.mobileGrouping = value.mobileGrouping || 'row';
    }
  }
  @Input() title = '';
  @Input() type: 'simple' | 'comparison' = 'simple';
  @Input() legal: string[] = [];
  @Input() mobileGrouping: 'row' | 'column' = 'row';
  @Input() headers: JbTableHeader[] = [];
  @Input() rows: JbTableRow[] = [];
  @Input() footers: JbTableRow[] = [];
  @Input() headerOffset = 0;
  @Input() stickyHeader = false;

  @ViewChild('bodyRow') bodyRow: ElementRef;
  @ViewChild('headerRow') headerRow: ElementRef;

  isSortable = false;
  hasLessThanFourHeaders = false;
  hasTwoHeaders = false;
  hasThreeHeaders = false;
  hasMoreThanFourHeaders = false;
  isLegalAvailable = false;
  accordionTitle = '';
  isSimpleType = false;
  isComparisonType = false;
  rowArray: JbTableRow[] = [];
  activeSortingColumn = {
    index: 0, // Index to control which role to be sorted by default
    state: JbTableSortingDirectionEnum.asc,
    ariaSortLabel: JbTableSortingDirectionEnum.asc,
  };
  columnArray: JbColumnCellInterface[][];

  constructor(public element: ElementRef, public renderer: Renderer2) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    this.hasLessThanFourHeaders = this.headers.length < 4;
    this.hasTwoHeaders = this.headers.length === 2;
    this.hasThreeHeaders = this.headers.length === 3;
    this.hasMoreThanFourHeaders = this.headers.length > 3;
    this.isLegalAvailable = this.legal && this.legal.length > 0;
    this.accordionTitle = this.headers[0].headerName || this.title;
    this.isSimpleType = this.type === 'simple';
    this.isComparisonType = this.type === 'comparison';
    this.rowArray = [...this.rows];
    this.sortColumn(this.activeSortingColumn.index);
    this.isSortable = this.rows.filter((row) => row.isSubHeader).length === 0;
    if (
      simpleChanges.rows ||
      simpleChanges.footers ||
      simpleChanges.header ||
      simpleChanges.mobileGrouping
    ) {
      // Generate the collapsed column array
      this.columnArray = this.getColumnArray();
    }
  }

  getHeaderById(id: number): JbTableHeader {
    return this.headers.find((header) => header.id === id);
  }

  renderIcon(value: string): string {
    return value && value !== '' ? value : 'checkmark';
  }

  sortGroupByHeaderIndex(index: number): void {
    this.updateHeaderSortState(index);

    switch (this.activeSortingColumn.state) {
      case JbTableSortingDirectionEnum.asc:
        this.sortColumn(index);
        break;
      default:
        this.sortColumn(index).reverse();
        break;
    }
  }

  isDescendingOrdered(
    index: number,
    direction: string = JbTableSortingDirectionEnum.asc ||
      JbTableSortingDirectionEnum.desc
  ): boolean {
    return (
      this.activeSortingColumn.index === index &&
      this.activeSortingColumn.state === direction
    );
  }

  sortColumn = (index: number): JbTableRow[] =>
    this.rowArray.sort(this.doRowSortComparison(index));

  doRowSortComparison = (index: number) => (
    a: JbTableRow,
    b: JbTableRow
  ): number => a.rowData[index].sortValue - b.rowData[index].sortValue;

  getAriaSort(index: number): string {
    return this.activeSortingColumn.index === index
      ? this.activeSortingColumn.ariaSortLabel
      : JbTableSortingDirectionEnum.none;
  }

  private getColumnArray(): JbColumnCellInterface[][] {
    if (!this.mobileGrouping) {
      return null;
    }
    // Make our table data into an array of column x row size so we can walk through
    // it.  We do this to account for the possibility of sparse row data.
    const columns = this.headers.length;
    const rows = this.rows.length;
    const footers = this.footers.length;
    const columnArray = [...Array(columns)].map(() => Array(rows + footers));
    this.rows.forEach((row, rowIndex) => {
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        let columnData;
        if (row.isSubHeader) {
          columnData = {
            ...row.rowData[0],
            isSubHeader: true,
          };
        } else {
          columnData = row.rowData.find(
            (cell) => cell.columnId === columnIndex + 1
          );
          columnArray[columnIndex][rowIndex] = columnData
            ? { ...columnData }
            : {};
        }
        columnData.isLastRow = rowIndex === rows - 1;
        columnArray[columnIndex][rowIndex] = columnData;
      }
    });
    this.footers.forEach((footer, footerIndex) => {
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        const columnData = footer.rowData.find(
          (cell) => cell.columnId === columnIndex + 1
        );
        columnArray[columnIndex][footerIndex + rows] = columnData
          ? { ...columnData, isFooter: true }
          : {};
      }
    });
    this.columnArray = columnArray;
    return columnArray;
  }

  private updateHeaderSortState(index: number): void {
    if (this.activeSortingColumn.index !== index) {
      this.setActiveSortingColumn(index, JbTableSortingDirectionEnum.asc);
      return;
    }
    switch (this.activeSortingColumn.state) {
      case JbTableSortingDirectionEnum.asc:
        this.setActiveSortingColumn(index, JbTableSortingDirectionEnum.desc);
        break;
      default:
        this.setActiveSortingColumn(index, JbTableSortingDirectionEnum.asc);
        break;
    }
  }

  private setActiveSortingColumn(
    index: number,
    direction: JbTableSortingDirectionEnum
  ): void {
    this.activeSortingColumn.index = index;
    this.activeSortingColumn.state = direction;
    this.activeSortingColumn.ariaSortLabel = direction;
  }
}
