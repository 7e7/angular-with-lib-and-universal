import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  HostListener,
  NgZone,
} from '@angular/core';
import { JbTabAriaSelected } from '../types/jb-tab-aria-selected.enum';
import { KeyboardKey } from '../../jb-utils/keyboard-key.enum';

let uniqueId = 0;

@Component({
  selector: 'jb-tab-panel',
  template: `
    <ng-content *ngIf="isActive"></ng-content>
  `,
  host: {
    class: 'db flex-none top-0',
    role: 'tabpanel',
    '[attr.aria-labelledby]': 'tabId',
    '[attr.aria-hidden]': 'ariaHidden',
    '[attr.id]': 'tabpanelId',
  },
})
export class JbTabPanelComponent implements OnChanges {
  @Input() label: string;
  @Input() iconName: string;
  @Input() isActive: boolean;

  ariaSelected: JbTabAriaSelected = JbTabAriaSelected.false;
  ariaHidden: boolean;
  isFocused = false;

  readonly id = uniqueId++;
  readonly tabId = `jb-tab-id-${this.id}`;
  readonly tabpanelId = `jb-tabpanel-id-${this.id}`;

  constructor(public element: ElementRef, private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setAriaValues();
  }

  show(): void {
    this.isActive = true;
    this.isFocused = true;

    this.setAriaValues();
  }

  hide(): void {
    this.isActive = false;
    this.isFocused = false;

    this.setAriaValues();
  }

  setAriaValues(): void {
    this.ariaHidden = !this.isActive;
    this.ariaSelected = this.isActive
      ? JbTabAriaSelected.true
      : JbTabAriaSelected.false;
  }

  setContainerFocus() {
    let containerElm;

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        containerElm = this.element.nativeElement.firstElementChild;

        if (containerElm) {
          containerElm.setAttribute('tabindex', 0);
          containerElm.focus();
        }
      });
    });
  }

  removeContainerFocus(): void {
    this.element.nativeElement.firstElementChild.setAttribute('tabindex', -1);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case KeyboardKey.Shift:
        this.removeContainerFocus();
        break;
      default:
        break;
    }
  }
}
