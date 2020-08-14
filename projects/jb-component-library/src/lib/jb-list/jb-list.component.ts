import { Component, Input } from '@angular/core';
import { Column, SubSection } from './types/list.type';

@Component({
  selector: 'jb-list',
  templateUrl: `./jb-list.component.html`,
  styleUrls: ['./jb-list.component.scss'],
})
export class JbListComponent {
  @Input() listData: Column[];

  columnHasSubheader = (column: SubSection): boolean =>
    column.subHeader !== undefined;
}
