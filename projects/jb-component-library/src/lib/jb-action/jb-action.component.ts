import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-action',
  templateUrl: './jb-action.component.html',
  host: {
    class: 'dib',
  },
})
export class JbActionComponent {
  @Input() actionIcon: String;
  @Input() ariaExpanded: Boolean;
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';
}
