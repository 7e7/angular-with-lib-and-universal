import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'jb-subnav',
  template: `
    <nav *ngIf="isOpen" class="bg-off-white">
      <ng-content></ng-content>
    </nav>
  `,
})
export class JbSubNavComponent implements OnChanges {
  /** Controls the visibility of the subnav. */
  @Input() isOpen = false;
  /** Handles 2-way data binding for isOpen. */
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isOpen) {
      changes.isOpen.currentValue ? this.openNav() : this.closeNav();
    }
  }

  /** Displays the subnav. */
  openNav() {
    this.setIsOpen(true);
  }

  /** Hides the subnav. */
  closeNav() {
    this.setIsOpen(false);
  }

  /** Sets the isOpen property and emits for 2-way data binding. */
  private setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
    this.isOpenChange.emit(isOpen);
  }
}
