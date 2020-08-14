import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-editorial-image',
  template: `
    <img [src]="src" [alt]="alt" />
  `,
  styleUrls: ['./jb-editorial-image.component.scss'],
  host: {
    class: 'flex h-100',
  },
})
export class JbEditorialImageComponent {
  @Input() src = '';
  @Input() alt = '';
}
