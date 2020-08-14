import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-logo-grid-item',
  template: `
    <div class="flex justify-center items-center w-6 h-5-5">
      <img [attr.src]="src" [attr.alt]="alt" class="max-w-6 max-h-5-5" />
    </div>
  `,
  host: {
    class: `col-6 col-2-ns flex justify-center items-center`,
  },
})
export class JbLogoGridItemComponent {
  @Input() src = '';
  @Input() alt = '';
}
