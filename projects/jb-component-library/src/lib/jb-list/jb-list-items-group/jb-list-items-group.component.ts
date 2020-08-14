import { Component, Input } from '@angular/core';
import { SubSection } from '../types/list.type';

@Component({
  selector: 'jb-list-items-group',
  templateUrl: './jb-list-items-group.component.html',
})
export class JbListItemsGroupComponent {
  @Input() dataColumn: SubSection;
}
