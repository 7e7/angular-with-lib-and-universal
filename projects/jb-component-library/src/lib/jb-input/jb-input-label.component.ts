import { Component } from '@angular/core';
import { JbVariantTypeEnum } from '../types/jb-variant-type.enum';

let uniqueId = 0;

@Component({
  selector: 'jb-input-label',
  templateUrl: './jb-input-label.component.html',
  host: { '[id]': 'id' },
})
export class JbInputLabelComponent {
  isLabelShrunk = false;
  isPrimary = true;

  id = `jb-input-label-id-${uniqueId++}`;

  setStyleType(styleType: JbVariantTypeEnum) {
    this.isPrimary = styleType === JbVariantTypeEnum.primary;
  }

  setIsLabelShrunk(isLabelShrunk: boolean) {
    this.isLabelShrunk = isLabelShrunk;
  }
}
