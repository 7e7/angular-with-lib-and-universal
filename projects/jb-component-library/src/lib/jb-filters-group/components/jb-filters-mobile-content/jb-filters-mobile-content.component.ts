import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jb-filters-mobile-content',
  templateUrl: `./jb-filters-mobile-content.component.html`,
})
export class JbFiltersMobileContentComponent {
  @Input() isApplied = false;
  @Input() hasSections = false;
  @Output() reset = new EventEmitter<void>();

  onReset() {
    this.reset.emit();
  }
}
