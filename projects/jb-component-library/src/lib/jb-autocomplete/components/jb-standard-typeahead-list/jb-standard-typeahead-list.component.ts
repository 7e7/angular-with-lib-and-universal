import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { JbTypeaheadListDirective } from '../../jb-typeahead-list.directive';

@Component({
  selector: 'jb-standard-typeahead-list',
  templateUrl: 'jb-standard-typeahead-list.component.html',
  styleUrls: ['./jb-standard-typeahead-list.component.scss'],
})
export class JbStandardTypeaheadListComponent extends JbTypeaheadListDirective
  implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.visible = !this.hidden && this.options.length > 0;
  }
}
