import { Component, Input } from '@angular/core';
import { PLACEHOLDER_DATA_URI } from '../jb-image/placeholder-data-uri.const';

@Component({
  selector: 'jb-overlay-image',
  template: `
    <!-- Overlay as foreground image on desktop and mobile -->
    <div
      class="flex tc relative"
      [ngClass]="{
        'w-50 h-50-ns': imageSize === '50',
        'w-60 h-60-ns': imageSize === '60',
        'w-70 h-70-ns': imageSize === '70',
        'w-80 h-80-ns': imageSize === '80',
        'w-90 h-90-ns': imageSize === '90',
        'w-100 h-100-ns': imageSize === '100',
        'pa3 pa0-ns': imageSize !== '100'
      }"
    >
      <jb-image
        [src]="src"
        [defer]="defer"
        [isLazy]="isLazy"
        [alt]="alt"
        [cropped]="cropped"
        [placeholder]="placeholder"
        [ngClass]="{
          'items-start-ns': vPosition === 'top',
          'items-end-ns': vPosition === 'bottom',
          'items-center-ns': vPosition === 'center',
          'justify-start-ns': hPosition === 'left',
          'justify-end-ns': hPosition === 'right',
          'justify-center-ns': hPosition === 'center'
        }"
        class="absolute-ns top-0-ns left-0-ns right-0-ns center flex-ns"
      ></jb-image>
    </div>
  `,
  host: {
    class: 'h-100 flex w-100 justify-center items-center relative',
    '[class.items-start-ns]': 'vPosition === "top"',
    '[class.items-end-ns]': 'vPosition === "bottom"',
    '[class.justify-start-ns]': 'hPosition === "left"',
    '[class.justify-end-ns]': 'hPosition === "right"',
  },
  styleUrls: ['./jb-overlay-image.component.scss'],
})
export class JbOverlayImageComponent {
  @Input() vPosition: 'top' | 'bottom' | 'center' = 'center';
  @Input() hPosition: 'left' | 'right' | 'center' = 'center';
  @Input() imageSize: '50' | '60' | '70' | '80' | '90' | '100' = '100';
  @Input() src: string;
  @Input() defer = false;
  @Input() isLazy = false;
  @Input() alt = '';
  @Input() cropped = false;
  @Input() placeholder = PLACEHOLDER_DATA_URI;
}
