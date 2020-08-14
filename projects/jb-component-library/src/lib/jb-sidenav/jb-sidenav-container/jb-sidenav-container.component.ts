import {
  Component,
  Input,
  ContentChild,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

import { JbSidenavContentComponent } from './../jb-sidenav-content/jb-sidenav-content.component';
import { KeyboardKey } from '../../jb-utils/keyboard-key.enum';

@Component({
  selector: 'jb-sidenav-container',
  template: `
    <aside class="relative overflow-hidden">
      <div
        *ngIf="isOpen"
        class="absolute bg-gray o-70 h-100 w-100 no-text-selection"
        (click)="closeNav()"
      ></div>
      <ng-content select="jb-sidenav-content"></ng-content>
      <div
        *ngIf="isOpen"
        class="absolute top-0 left-0 w-60 h-100 overflow-y-scroll bg-white"
      >
        <ng-content select="jb-sidenav"></ng-content>
      </div>
    </aside>
  `,
  styleUrls: ['./jb-sidenav-container.component.scss'],
})
export class JbSidenavContainerComponent implements OnChanges {
  /** Reference to jb-sidenav component. */
  @ContentChild(JbSidenavContentComponent, { static: true })
  content: JbSidenavContentComponent;

  /** Controls if the sidenav is displayed or hidden. */
  @Input() isOpen = false;

  /** Support 2-way data binding for isOpen input. */
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (
      event.key === KeyboardKey.Escape ||
      event.key === KeyboardKey.EscapeIE
    ) {
      this.closeNav();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isOpen) {
      changes.isOpen.currentValue ? this.openNav() : this.closeNav();
    }
  }

  /** Displayed sidenav and prevent content scrolling and focusing. */
  openNav() {
    if (this.content) {
      this.content.setScroll(false);
    }

    this.content.removeFocus();
    this.setIsOpen(true);
  }

  /** Hides sidenav and returns content scrolling and focusing. */
  closeNav() {
    if (this.content) {
      this.content.setScroll(true);
    }

    this.content.returnFocus();
    this.setIsOpen(false);
  }

  /** Sets isOpen property and emits event for 2-way binding. */
  private setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
    this.isOpenChange.emit(isOpen);
  }
}
