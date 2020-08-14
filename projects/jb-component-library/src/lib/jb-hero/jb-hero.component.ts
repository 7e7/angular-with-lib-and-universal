import { Component, Input } from '@angular/core';
import { BreadcrumbsItem } from '../jb-breadcrumbs/types/breadcrumbs-item.type';
import { JbTheme } from '../types/jb-theme.type';
import { JbVariantType } from '../types/jb-variant-type.type';
import { JbThemeEnum } from '../types/jb-theme.enum';
import { JbVariantTypeEnum } from '../types/jb-variant-type.enum';

/**
 * Hero Component
 * @example
 * <jb-hero
 *   [breadcrumbs]="mockBreadcrumbs"
 *   theme="light"
 *   type="primary"
 *   data-testid="hero-transparent-no-subheader"
 *   imageSrc="assets/img/plane.png"
 * >
 *   <ng-container JbTitle>
 *     Page Title Headline
 *   </ng-container>
 * </jb-hero>
 */
@Component({
  selector: 'jb-hero',
  templateUrl: './jb-hero.component.html',
  styleUrls: ['./jb-hero.component.scss'],
})
export class JbHeroComponent {
  @Input() imageSrc: string;
  @Input() imageAlt: string;
  /** A string that defines which theme to use. Choices of "light" and "dark". */
  @Input() theme: JbTheme = JbThemeEnum.light;
  /** Array of items to be displayed by the breadcrumbs. */
  @Input() breadcrumbs: BreadcrumbsItem[] = [];
  /** A string that defines which theme to use. Choices of "primary" and "secondary". */
  @Input() type: JbVariantType = JbVariantTypeEnum.primary;
  /**
   * Returns true if the theme passed to the component matches the Light theme's enum,
   * otherwise it will return false.
   */
  get isLightTheme(): boolean {
    return this.theme === JbThemeEnum.light;
  }

  /**
   * Returns true if the theme passed to the component matches the Dark theme's enum,
   * otherwise it will return false.
   */
  get isDarkTheme(): boolean {
    return this.theme === JbThemeEnum.dark;
  }

  /**
   * Returns true if type is primary
   */
  get isPrimary(): boolean {
    return this.type === JbVariantTypeEnum.primary;
  }
  /**
   * Returns true if type is secondary
   */
  get isSecondary(): boolean {
    return this.type === JbVariantTypeEnum.secondary;
  }
}
