import { Component } from '@angular/core';
import { JbPopoverComponent } from '../jb-popover.component';
import { PopperOptions } from 'popper.js';

@Component({
  selector: 'jb-tooltip',
  templateUrl: '../jb-popover.component.html',
  styleUrls: ['../jb-popover.component.scss'],
})
export class JbTooltipComponent extends JbPopoverComponent {
  offsetValue = '8px';
  options: PopperOptions = {
    placement: 'top-end',
    modifiers: {
      offset: {
        enabled: true,
        offset: `${this.offsetValue}, ${this.offsetValue}`,
      },
      flip: {
        enabled: false,
      },
      arrow: {
        element: '.popover-arrow',
      },
    },
  };

  isToolTip = true;
}
