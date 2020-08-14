import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { JbExpansionPanelHeaderComponent } from './jb-expansion-panel-header/jb-expansion-panel-header.component';
import { KeyboardKey } from '../jb-utils/keyboard-key.enum';

let uniqueId = 0;

@Component({
  selector: 'jb-expansion-panel',
  templateUrl: './jb-expansion-panel.component.html',
  styleUrls: ['./jb-expansion-panel.component.scss'],
  host: {
    class: 'jb-expansion-panel w-100 db t-fast',
    '[class.ph0]': 'removeHorizontalPadding',
    '[class.b--none]': '!isPrimary',
    '[class.secondary]': '!isPrimary',
    '[id]': 'id',
  },
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
export class JbExpansionPanelComponent
  implements OnChanges, AfterContentInit, OnDestroy {
  /** Controls the expanded state of the panel */
  @Input() isExpanded = false;
  /** A flag to distinguish if the panel belongs to an accordion. */
  @Input() isAlone = false;
  /** Flag to use primary or secondary styling. */
  @Input() isPrimary = true;
  @Input() removeHorizontalPadding = false;

  /** Emits when the panel is opened. */
  @Output() opened: EventEmitter<any> = new EventEmitter();
  /** Emits when the panel is closed. */
  @Output() closed: EventEmitter<any> = new EventEmitter();
  /** Emits an action when a valid key is pressed. */
  @Output() keypress: EventEmitter<KeyboardEvent> = new EventEmitter();

  /** Reference to the header component. */
  @ContentChild(JbExpansionPanelHeaderComponent)
  header: JbExpansionPanelHeaderComponent;

  /** Reference to the content elements. */
  @ViewChild('contentContainer')
  contentContainer: ElementRef;

  /** The panel id. */
  id = `jb-expansion-panel-id-${uniqueId++}`;
  /** The content wrapper id. */
  contentId = `jb-expansion-panel-content-id-${uniqueId++}`;
  /** A flag used to determine if the panel is currently focused. */
  isFocused: boolean;
  /** A flag that is set to true while the animation is active. */
  isInTransition = false;

  /** Initializes header and content properties. */
  ngAfterContentInit() {
    // subscribe to header click events
    this.header.expand.subscribe(() => this.toggleExpansion());

    // set aria controls attribute
    this.header.ariaControls = this.contentId;

    this.header.setIsExpanded(this.isExpanded);
  }

  /** Change detection to sync changed attributes. */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.isExpanded && this.header) {
      this.header.setIsExpanded(this.isExpanded);
    }
  }

  /** Unsubscribe to header click events. */
  ngOnDestroy() {
    this.header.expand.unsubscribe();
  }

  captureStartEvent($event: any) {
    this.isInTransition = true;
  }

  captureDoneEvent($event: any) {
    setTimeout(() => {
      this.isInTransition = false;
    }, 0);
  }

  /** Listens for keydown events used for keyboard navigation  */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case KeyboardKey.Tab:
        this.handleTabKey(event);
        break;
      case KeyboardKey.Home:
        event.preventDefault();
        this.handleHomeKey(event);
        break;
      case KeyboardKey.End:
        event.preventDefault();
        this.handleEndKey(event);
        break;
      default:
        break;
    }
  }

  /** Notifies the accordion to handle the End key press. */
  handleEndKey(event: KeyboardEvent) {
    this.emitKeypressEvent(event);
  }

  handleTabKey(event: KeyboardEvent) {
    if (this.shouldDispatchTabAction()) {
      this.emitKeypressEvent(event);
    }
  }

  /** Notifies the accordion to handle the Home key press. */
  handleHomeKey(event: KeyboardEvent) {
    if (!this.isAlone) {
      this.emitKeypressEvent(event);
    }
  }

  /** Emits actions to the accordion for moving focus and handling other panels. */
  emitKeypressEvent(event: KeyboardEvent) {
    this.keypress.emit(event);
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
  toggleExpansion() {
    this.isExpanded ? this.closePanel() : this.openPanel();
  }

  /*
   * Helpers
   */
  private shouldDispatchTabAction(): boolean {
    return this.header.isFocused && !this.isAlone && !this.isExpanded;
  }
}
