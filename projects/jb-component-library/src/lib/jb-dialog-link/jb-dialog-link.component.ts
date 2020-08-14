import { Component, Input } from '@angular/core';
import { linkIconLabels } from '../jb-link/link-icon-labels.constant';

let uniqueId = 0;
@Component({
  selector: 'jb-dialog-link',
  host: {
    class: 'dib royal-blue',
  },
  template: `
    <button
      jbClickStop="click($event)"
      class="copy-xs mt1 mt2-ns ph0 pb0 bn hover-core-blue
      no-underline underline-hover avenir pointer bg-transparent flex color-inherit"
      type="button"
    >
      <ng-content></ng-content>
      <jb-sr-only [id]="contentId">{{ srText }}</jb-sr-only>
      <jb-icon
        name="externalTab"
        [label]="label"
        class="pl1"
        [width]="11"
        [height]="11"
        viewBox="0 0 11 11"
      ></jb-icon>
    </button>
  `,
})
export class JbDialogLinkComponent {
  label = linkIconLabels.modalLink;
  @Input() srText = '';

  contentId = `jb-dialog-link-id-${uniqueId++}`;
}
