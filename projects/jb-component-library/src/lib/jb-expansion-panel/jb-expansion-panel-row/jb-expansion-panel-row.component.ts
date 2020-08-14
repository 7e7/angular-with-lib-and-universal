import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'jb-expansion-panel-row',
  template: `
    <section
      class="copy pa3 pt0 expansion-panel-section h-100 page-margin"
      [ngClass]="{
        'bg-off-white core-blue': isPrimary,
        'bg-transparent charcoal': !isPrimary
      }"
    >
      <ng-content></ng-content>
    </section>
  `,
  host: {
    class: 'jb-expansion-panel-row flex flex-column',
    tabIndex: '-1',
  },
  styleUrls: ['./jb-expansion-panel-row.component.scss'],
})
export class JbExpansionPanelRowComponent {
  /** Flag to use primary or secondary styling. */
  @Input() isPrimary = true;

  constructor(private el: ElementRef) {}

  getElementRef() {
    return this.el.nativeElement;
  }
}
