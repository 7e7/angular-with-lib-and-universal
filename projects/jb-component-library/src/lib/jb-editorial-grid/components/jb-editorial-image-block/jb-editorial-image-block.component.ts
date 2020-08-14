import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-editorial-image-block',
  templateUrl: './jb-editorial-image-block.component.html',
  styleUrls: ['./jb-editorial-image-block.component.scss'],
  host: {
    class: 'relative db w-100 w-50-m w-third-l',
  },
})
export class JbEditorialImageBlockComponent {
  @Input() iconName = '';
  @Input() href = '';
  @Input() link = '';
  @Input() target: string;

  get isHrefAvailable(): boolean {
    return !!this.href;
  }

  get isLinkAvailable(): boolean {
    return !!this.link;
  }
}
