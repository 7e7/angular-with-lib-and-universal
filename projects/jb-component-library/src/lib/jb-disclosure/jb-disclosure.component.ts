import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jb-disclosure',
  templateUrl: './jb-disclosure.component.html',
})
export class JbDisclosureComponent {
  @Input() title = '';

  @Output() close = new EventEmitter<void>();
  @Output() open = new EventEmitter<void>();

  isExpanded = false;

  toggle() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.open.emit();
    } else {
      this.close.emit();
    }
  }
}
