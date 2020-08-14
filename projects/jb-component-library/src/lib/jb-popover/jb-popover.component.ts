import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  TemplateRef,
  Output,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PopperOptions } from 'popper.js';
import { Toggleable } from '../types/jb-toggleable.interface';

export type PaddingIncrements = 'pa1' | 'pa2' | 'pa3' | 'pa4' | 'pa5' | 'pa6';

@Component({
  selector: 'jb-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './jb-popover.component.html',
  styleUrls: ['./jb-popover.component.scss'],
})
export class JbPopoverComponent implements OnChanges {
  // Popover can be attached to multiple anchors
  currentAnchor: Toggleable;

  @Input() popoverContext: any;
  @Input() padding: PaddingIncrements = 'pa3'; // 16px
  @Input() zIndex: string = null;
  @Input() ariaDescribedBy: string;
  @Input() ariaLabelledBy: string;
  @Input() focusContainer = true;
  @Input() offsetX: string;
  @Input() offsetY: string;

  @Output() afterOpened = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  options: PopperOptions = {
    placement: 'top',
    modifiers: {
      arrow: {
        element: '.popover-arrow',
      },
    },
  };
  isToolTip = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options.modifiers.offset && (changes.offsetX || changes.offsetY)) {
      this.options.modifiers.offset.offset = `${this.offsetX}, ${this.offsetY}`;
    } else if (changes.offsetX || changes.offsetY) {
      this.updateOffsetValues();
    }
  }

  updateOffsetValues(): void {
    this.options.modifiers.offset = {
      enabled: true,
      offset: `${this.offsetX}, ${this.offsetY}`,
    };
  }

  forceOpen(isForced: boolean) {
    if (this.currentAnchor) {
      this.currentAnchor.forceOpen(isForced);
    }
  }

  toggle() {
    if (!this.currentAnchor) {
      return;
    }

    // Anchor must be open for popover to have a reference to it,
    // so it'll never make sense to "open" via the popover because
    // it'll never know which anchor to attach to.
    this.currentAnchor.close();
  }

  close(value?: any) {
    if (!this.currentAnchor) {
      return;
    }

    this.currentAnchor.close(value);
  }
}
