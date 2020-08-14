import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-featured-image',
  templateUrl: './jb-featured-image.component.html',
  styleUrls: ['./jb-featured-image.component.scss'],
  host: {
    class: 'db pt5 pb4',
  },
})
export class JbFeaturedImageComponent {
  /** Image source. Defaults to empty string. */
  @Input() src = '';
  /** Alt tag for the image. Defaults to empty string, which will not be read by screen reader */
  @Input() alt = '';
  /** Title for the image. Optional. */
  @Input() title = '';
  /** Caption for the image. Optional. */
  @Input() caption = '';
}
