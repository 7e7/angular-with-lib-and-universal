import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  ViewChild,
  ElementRef,
  OnChanges,
  AfterContentInit,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { JbContextualHelpHeaderComponent } from './jb-contextual-help-header/jb-contextual-help-header.component';

@Component({
  selector: 'jb-contextual-help',
  template: `
    <hr class="hr-help" />
    <ng-content select="jb-contextual-help-header"></ng-content>
    <div
      class="overflow-hidden"
      [@accordionExpanded]="isExpanded"
      #contentContainer
    >
      <ng-content select="jb-contextual-help-content"></ng-content>
      <ng-content select="[jbActionLink]"></ng-content>
    </div>
  `,
  host: {
    class: 'w-60-ns w-100 center-ns tc-ns',
  },
  styleUrls: ['./jb-contextual-help.component.scss'],
  animations: [
    trigger('accordionExpanded', [
      state(
        'false',
        style({
          height: 0,
          opacity: 0,
          visibility: 'hidden',
        })
      ),
      state(
        'true',
        style({
          height: '*',
          opacity: 1,
          visibility: 'visible',
        })
      ),
      transition('false <=> true', animate('300ms ease')),
    ]),
  ],
})
export class JbContextualHelpComponent
  implements OnChanges, AfterContentInit, OnDestroy {
  /** Controls the expanded state of the panel */
  @Input() isExpanded = false;

  /** Emits when the panel is opened. */
  @Output() opened: EventEmitter<void> = new EventEmitter();
  /** Emits when the panel is closed. */
  @Output() closed: EventEmitter<void> = new EventEmitter();

  /** Reference to the header component. */
  @ContentChild(JbContextualHelpHeaderComponent)
  header: JbContextualHelpHeaderComponent;

  /** Reference to the content elements. */
  @ViewChild('contentContainer')
  contentContainer: ElementRef;

  /** Initializes header and content properties. */
  ngAfterContentInit() {
    // subscribe to header toggleExpansion events
    this.header.toggleExpansion.subscribe((event: any) =>
      this.toggleExpansion(event)
    );
  }

  /** Change detection to sync changed attributes. */
  ngOnChanges(change: SimpleChanges) {
    if (change.expanded) {
      this.setExpansion(change.expanded.currentValue);
    }
  }

  /** Unsubscribe to header toggleExpansion events. */
  ngOnDestroy() {
    this.header.toggleExpansion.unsubscribe();
  }

  /** Opens the panel. */
  openPanel() {
    this.setExpansion(true);
    this.opened.emit();
  }

  /** Closes the panel. */
  closePanel() {
    this.setExpansion(false);
    this.closed.emit();
  }

  /** Explicitly sets the expanded state of the panel and its header. */
  setExpansion(expanded: boolean) {
    this.isExpanded = expanded;
    this.header.setIsExpanded(expanded);
  }

  /** Toggles the panel expanded state. */
  toggleExpansion(event: any) {
    this.isExpanded ? this.closePanel() : this.openPanel();
  }
}
