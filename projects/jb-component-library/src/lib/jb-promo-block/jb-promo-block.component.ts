import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

import { elementHasContent } from '../jb-utils/utilities.functions';
import { JbThemeEnum } from '../types/jb-theme.enum';
import { JbPromoBlockVAlignment } from './types/jb-promo-block-v-alignment.enum';
import { JbPromoBlockHAlignment } from './types/jb-promo-block-h-alignment.enum';
import { JbPromoBlockCardSize } from './types/jb-promo-block-card-size.enum';
import { JbPromoBlockStampAlignment } from './types/jb-promo-block-stamp-alignment.enum';

@Component({
  selector: 'jb-promo-block',
  templateUrl: './jb-promo-block.component.html',
  styleUrls: ['./jb-promo-block.component.scss'],
  host: {
    class: 'db',
    '[class.promo-block-one-up]': '!fullBleed',
  },
})
export class JbPromoBlockComponent implements OnChanges {
  @Input() theme: JbThemeEnum = JbThemeEnum.dark;
  @Input() cardVAlignment: JbPromoBlockVAlignment = JbPromoBlockVAlignment.none;
  @Input() cardHAlignment: JbPromoBlockHAlignment = JbPromoBlockHAlignment.left;
  @Input() cardSize: JbPromoBlockCardSize = JbPromoBlockCardSize.small;
  @Input()
  stampAlignment: JbPromoBlockStampAlignment = JbPromoBlockStampAlignment.left;
  @Input() link: string;
  @Input() href: string;
  @Input() target: string;
  @Input() fullBleed = true;
  isOneUpAndStampAlignedRight: boolean;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    this.isOneUpAndStampAlignedRight =
      !this.fullBleed &&
      this.stampAlignment === JbPromoBlockStampAlignment.right &&
      this.cardHAlignment !== JbPromoBlockHAlignment.right;
  }

  get isDarkTheme(): boolean {
    return this.theme === JbThemeEnum.dark;
  }

  hasContent(element: HTMLElement): boolean {
    return elementHasContent(element);
  }
}
