import { Component, HostBinding, Input } from '@angular/core';
import { JbCopySize } from './types/jb-copy-size.enum';

@Component({
  selector: 'jb-copy',
  template: `
    <ng-content></ng-content>
  `,
  host: { class: 'avenir db' },
})
export class JbCopyComponent {
  /** Controls the size of the text and scales responsively */
  @Input() size: JbCopySize = JbCopySize.standard;

  @HostBinding('class.copy-l')
  get isLarge() {
    return this.size === JbCopySize.large;
  }
  @HostBinding('class.copy-m')
  get isMedium() {
    return this.size === JbCopySize.medium;
  }
  @HostBinding('class.copy')
  get isStandard() {
    return this.size === JbCopySize.standard;
  }
  @HostBinding('class.copy-s')
  get isSmall() {
    return this.size === JbCopySize.small;
  }
  @HostBinding('class.copy-xs')
  get isXSmall() {
    return this.size === JbCopySize.x_small;
  }
}
