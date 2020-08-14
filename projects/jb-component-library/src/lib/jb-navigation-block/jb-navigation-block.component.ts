import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JbVariantTypeEnum } from '../types/jb-variant-type.enum';
import { JbCopySize } from '../jb-copy/types/jb-copy-size.enum';

@Component({
  selector: 'jb-navigation-block',
  templateUrl: './jb-navigation-block.component.html',
  styleUrls: ['./jb-navigation-block.component.scss'],
  host: {
    '[attr.aria-describedby]': 'ariaDescribedBy',
  },
})
export class JbNavigationBlockComponent implements OnChanges {
  /** Navigation block type, 'primary' or 'secondary' */
  @Input() type: JbVariantTypeEnum = JbVariantTypeEnum.primary;
  @Input() href: string;
  @Input() imgSrc: string;
  @Input() iconName: string;
  @Input() target = '_self';
  @Input() ariaDescribedBy = '';

  isPrimary: boolean;
  hasIcon: boolean;
  hasImage: boolean;
  hasNoIcon: boolean;
  headerCopySize: JbCopySize;
  descriptionCopySize: JbCopySize;

  ngOnChanges(changes: SimpleChanges): void {
    this.isPrimary = this.type === JbVariantTypeEnum.primary;

    this.headerCopySize = this.isPrimary
      ? JbCopySize.medium
      : JbCopySize.standard;
    this.descriptionCopySize = this.isPrimary
      ? JbCopySize.standard
      : JbCopySize.small;

    this.hasIcon = this.isPrimary && !!this.iconName;
    this.hasImage = this.isPrimary && !!this.imgSrc;
    this.hasNoIcon = !this.iconName;
  }
}
