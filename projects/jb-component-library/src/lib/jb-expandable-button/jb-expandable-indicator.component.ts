import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { COLORS } from '../jb-utils/colors.constant';
import { CHEVRON_ANIMATIONS } from '../types/jb-chevron-animation.constant';
import { JbChevronIconSizeEnum } from '../types/jb-chevron-icon-size.enum';
import { JbChevronIconTypeEnum } from '../types/jb-chevron-icon-type.enum';

@Component({
  selector: 'jb-expandable-indicator',
  templateUrl: './jb-expandable-indicator.component.html',
  animations: [CHEVRON_ANIMATIONS.transformIcon],
})
export class JbExpandableIndicatorComponent implements OnChanges {
  iconSizes = JbChevronIconSizeEnum;

  defaultIconColor = COLORS.royalBlue;
  errorIconColor = COLORS.red;
  iconName = JbChevronIconTypeEnum.mediumDown;

  @Input() value = false;
  @Input() iconSize: JbChevronIconSizeEnum = JbChevronIconSizeEnum.medium;
  @Input() hasError = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.iconSize) {
      switch (this.iconSize) {
        case JbChevronIconSizeEnum.small:
        case JbChevronIconSizeEnum.compact:
          this.iconName = JbChevronIconTypeEnum.smallDown;
          break;
        default:
          this.iconName = JbChevronIconTypeEnum.mediumDown;
      }
    }
  }
}
