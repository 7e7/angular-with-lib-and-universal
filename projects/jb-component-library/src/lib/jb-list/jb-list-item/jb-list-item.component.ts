import { Component, Input } from '@angular/core';
import { Items } from '../types/list.type';

@Component({
  selector: 'jb-list-item',
  templateUrl: './jb-list-item.component.html',
  styleUrls: ['./jb-list-item.component.scss'],
})
export class JbListItemComponent {
  @Input() listItemData: Items;
}
