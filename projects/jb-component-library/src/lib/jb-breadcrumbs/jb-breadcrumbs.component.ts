import { Component, Input } from '@angular/core';
import { BreadcrumbsItem } from './types/breadcrumbs-item.type';
import { BreadcrumbsParentPage } from './types/breadcrumbs-parent-page.type';
import { JbThemeEnum } from '../types/jb-theme.enum';

/**
 * Wrapper component to chose the right theme for Breadcrambs
 *
 * @example
 * <jb-breadcrumbs [item]="breadcrumbs" [theme]="'dark'"></jb-breadcrumbs>
 */
@Component({
  selector: 'jb-breadcrumbs',
  templateUrl: 'jb-breadcrumbs.component.html',
})
export class JbBreadcrumbsComponent {
  /** Component theme to display */
  @Input() theme: JbThemeEnum = JbThemeEnum.light;
  @Input()
  get item(): BreadcrumbsItem {
    return (
      this.breadcrumb || {
        name: '',
        href: '',
        parentPages: [],
      }
    );
  }
  set item(value: BreadcrumbsItem) {
    this.breadcrumb = this.transformBreadcrumb(value);
  }

  directParent: BreadcrumbsParentPage;
  breadcrumb: BreadcrumbsItem;

  get isDarkTheme(): boolean {
    return this.theme === JbThemeEnum.dark;
  }
  get isLightTheme(): boolean {
    return this.theme === JbThemeEnum.light;
  }

  transformBreadcrumb(item: BreadcrumbsItem): BreadcrumbsItem {
    this.setDirectParent(item);
    return this.reverseParent(item);
  }

  /**
   * Reverses the parentPages array.
   */
  reverseParent(item: BreadcrumbsItem): BreadcrumbsItem {
    return {
      ...item,
      parentPages: [...item.parentPages].reverse(),
    };
  }

  /**
   * (for mobile): Sets the direct parent, which has to be the breadcrumb
   * item before the current.
   */
  setDirectParent(item: BreadcrumbsItem): void {
    this.directParent = item.parentPages[0];
  }
}
