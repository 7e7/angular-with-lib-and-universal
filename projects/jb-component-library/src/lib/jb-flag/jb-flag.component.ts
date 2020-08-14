import { Component, Input } from '@angular/core';

import { JbTheme } from '../types/jb-theme.type';

type FlagTheme = 'lightNavy' | 'lightBlue' | 'lightestBlue';

@Component({
  selector: 'jb-flag',
  template: `
    {{ title }}
  `,
  // These cannot be moved into the global color palette until they are approved for app-wide use
  styles: [
    `
      :host(.bg-light-navy) {
        background-color: #aeb8c9;
      }
      :host(.bg-light-blue) {
        background-color: #d7ecf7;
      }
      :host(.bg-lightest-blue) {
        background-color: #eef7fc;
      }
    `,
  ],
  host: {
    class: 'pv1 ph3 copy-s b br-rounded-3 dib',
    '[class.bg-core-blue]': 'theme === "dark"',
    '[class.white]': 'theme === "dark"',
    '[class.bg-white]': 'theme === "light"',
    '[class.bg-light-navy]': 'theme === "lightNavy"',
    '[class.bg-light-blue]': 'theme === "lightBlue"',
    '[class.bg-lightest-blue]': 'theme === "lightestBlue"',
    '[class.core-blue]':
      'theme === "light" || theme === "lightNavy" || theme === "lightBlue" || theme === "lightestBlue"',
  },
})
export class JbFlagComponent {
  @Input() theme: JbTheme | FlagTheme = 'dark';
  @Input() title: string;
}
