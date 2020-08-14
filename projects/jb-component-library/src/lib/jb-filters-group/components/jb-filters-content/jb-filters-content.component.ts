import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'jb-filters-content',
  templateUrl: `./jb-filters-content.component.html`,
  styleUrls: ['./jb-filters-content.component.scss'],
  host: {
    class: 'h-auto-ns h-100 w-100 filter-w-20-ns bg-white overlay-z-index',
  },
})
export class JbFiltersContentComponent {
  @Input() hasDivider = false;
  @Input() drawer = false;
  @Input() hasSections = false;

  @Output() apply = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  isApplied = false;
  isMobile = false;

  onApply(): void {
    this.apply.emit();
  }

  onReset(): void {
    this.reset.emit();
  }

  onClose(): void {
    this.close.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  applyOnMobile() {
    if (this.isMobile) {
      this.onApply();
    }
  }
}
