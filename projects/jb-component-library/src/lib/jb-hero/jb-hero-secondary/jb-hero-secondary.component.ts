import { Component, OnChanges, SimpleChanges } from '@angular/core';

import { JbHeroDirective } from '../jb-hero.directive';

/**
 * Hero Secondary Component
 * @example
 * <jb-hero-secondary
 *   [breadcrumbs]="BreadcrumbsItem"
 *   theme="dark"
 * >
 *   <ng-container JbTitle>
 *     Page Title Headline
 *   </ng-container>
 *   <jb-icon
 *    class="fill-white"
 *    name="icon"
 *    width="64px"
 *    height="64px"
 *  >
 *     <img alt="proper alt" src="imgurl.ext" />
 *   </jb-icon>
 * </jb-hero>
 */
@Component({
  selector: 'jb-hero-secondary',
  templateUrl: './jb-hero-secondary.component.html',
})
export class JbHeroSecondaryComponent extends JbHeroDirective
  implements OnChanges {
  /**
   * On change verify that the hero's body content and breadcrumbs are provided.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!this.breadcrumbs) {
      console.warn(
        'jb-hero-secondary: Missing required [breadcrumbs] input content.',
        'jb-hero-secondary: will be deprecated in favor of jb-hero with primary/secondary type'
      );
    }
  }
}
