import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-info-tooltip',
  templateUrl: './jb-info-tooltip.component.html',
})
export class JbInfoTooltipComponent {
  @Input() title: string;
  @Input() zIndex: string = null;
  @Input() offsetX = '8px';
  @Input() offsetY = '8px';
  @Input() buttonAriaLabel: string = null;
}
