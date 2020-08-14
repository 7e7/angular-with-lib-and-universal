import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-expandable-container',
  templateUrl: './jb-expandable-container.component.html',
})
export class JbExpandableContainerComponent {
  @Input() isExpanded = false;
}
