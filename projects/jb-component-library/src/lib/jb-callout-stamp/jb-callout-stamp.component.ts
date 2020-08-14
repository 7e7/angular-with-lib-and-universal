import { Component, Input } from '@angular/core';
import { JbThemeEnum } from '../types/jb-theme.enum';
import { JbCalloutTypeEnum } from '../types/jb-callout-type.enum';

@Component({
  selector: 'jb-callout-stamp',
  templateUrl: './jb-callout-stamp.component.html',
})
export class JbCalloutStampComponent {
  /* typed Theme can be 'light' or 'dark' */
  @Input() theme: JbThemeEnum = JbThemeEnum.dark;

  /* typed value must be a number */
  @Input() value: number;

  /* typed JbCalloutType can be 'price' or 'percent' */
  @Input() type: JbCalloutTypeEnum = JbCalloutTypeEnum.price;

  /* typed hasBorder is boolean */
  @Input() hasBorder = false;

  get isPercentType(): boolean {
    return this.type === JbCalloutTypeEnum.percent;
  }

  get isPriceType(): boolean {
    return this.type === JbCalloutTypeEnum.price;
  }

  get isDark(): boolean {
    return this.theme === JbThemeEnum.dark;
  }

  get isLight(): boolean {
    return this.theme === JbThemeEnum.light;
  }
}
