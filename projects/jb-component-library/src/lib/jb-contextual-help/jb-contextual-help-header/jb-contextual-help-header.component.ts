import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jb-contextual-help-header',
  templateUrl: './jb-contextual-help-header.html',
  host: {
    class: 'flex',
  },
})
export class JbContextualHelpHeaderComponent {
  /** Emitter for the toggleExpansion event.  */
  @Output() toggleExpansion = new EventEmitter();
  /** The expanded state of the header set by the panel */
  isExpanded: boolean;
  /** Aria controls attribute set by the panel. */
  ariaControls: string;

  setIsExpanded(isExpanded: boolean) {
    this.isExpanded = isExpanded;
  }

  /** Emits the toggleExpansion event. */
  onToggleExpansion(event: MouseEvent) {
    this.toggleExpansion.emit(event);
  }
}
