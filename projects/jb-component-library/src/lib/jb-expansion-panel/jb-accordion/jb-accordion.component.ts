import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnDestroy,
  QueryList,
} from '@angular/core';

import { JbExpansionPanelComponent } from '../jb-expansion-panel.component';
import { KeyboardKey } from '../../jb-utils/keyboard-key.enum';

let uniqueId = 0;

@Component({
  selector: 'jb-accordion',
  template: '<ng-content></ng-content>',
  host: {
    class: 'jb-accordion w-100 db pv5 pv6-ns',
    role: 'presentation',
    '[id]': 'id',
  },
})
export class JbAccordionComponent implements AfterContentInit, OnDestroy {
  /** A reference to the panels within the accordion. */
  @ContentChildren(JbExpansionPanelComponent)
  panels: QueryList<JbExpansionPanelComponent>;

  /** Auto-incrementing unqiue identifier. */
  readonly id = `jb-accordion-id-${uniqueId++}`;

  /** Subscribe to panel state change */
  ngAfterContentInit() {
    this.panels.forEach((panel: JbExpansionPanelComponent, index: number) => {
      panel.keypress.subscribe((event: KeyboardEvent) =>
        this.keyPressHandler(event, index)
      );

      panel.opened.subscribe(() => this.closeOtherPanels(index));
    });
  }

  /** Unsubscribe to panel state changes */
  ngOnDestroy() {
    this.panels.forEach((panel: JbExpansionPanelComponent) => {
      panel.keypress.unsubscribe();
      panel.opened.unsubscribe();
    });
  }

  /** Delegates keyboard navigation. */
  keyPressHandler(event: KeyboardEvent, index: number) {
    switch (event.key) {
      case KeyboardKey.Tab:
        if (this.shouldFocusNextPanel(event)) {
          this.focusNextPanel(event, index);
        }
        break;
      case KeyboardKey.Home:
        this.focusFirstPanel(event);
        break;
      case KeyboardKey.End:
        this.focusLastPanel(event);
        break;
      default:
        break;
    }
  }

  /** Move focus to the last panel header. */
  focusLastPanel(event: KeyboardEvent) {
    this.interceptKeyEvent(event);
    this.panels.last.header.focusButton();
  }

  /** Move focus to the first panel header. */
  focusFirstPanel(event: KeyboardEvent) {
    this.interceptKeyEvent(event);
    this.panels.first.header.focusButton();
  }

  /** Move focus to the next panel header, wrapping to the top. */
  focusNextPanel(event: KeyboardEvent, index: number) {
    if (this.panels.length === 1) {
      this.focusPanel(this.panels.first);
      return;
    }

    const nextPanel = this.getNextPanel(index);

    if (nextPanel) {
      this.interceptKeyEvent(event);
      this.focusPanel(nextPanel);
    }
  }

  /** Close other panels if opened. */
  closeOtherPanels(index: number) {
    this.panels.forEach((panel: JbExpansionPanelComponent, i: number) => {
      if (i !== index && panel.isExpanded) {
        panel.closePanel();
      }
    });
  }

  /*
   * Helpers
   */

  private shouldFocusNextPanel(event: KeyboardEvent) {
    return !event.shiftKey;
  }

  private focusPanel(panel: JbExpansionPanelComponent) {
    panel.header.focusButton();
  }

  private getNextPanel(index: number) {
    return this.panels.filter(
      (panel: JbExpansionPanelComponent, i: number) => i === index + 1
    )[0];
  }

  private interceptKeyEvent(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
