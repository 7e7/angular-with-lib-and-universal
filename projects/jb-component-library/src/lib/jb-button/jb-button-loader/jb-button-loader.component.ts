import { Component } from '@angular/core';

@Component({
  template: `
    <jb-icon [name]="name" [fill]="fill" [width]="width"></jb-icon>
  `,
})
export class JbButtonLoaderComponent {
  name = '';
  fill = '';
  width = '3em';
}
