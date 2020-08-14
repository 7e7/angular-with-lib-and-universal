import { JbRelatedContentBlockComponent } from './jb-related-content-block.component';
import { JbRelatedContentBlockItemComponent } from '../jb-related-content-block-item/jb-related-content-block-item.component';
import { QueryList } from '@angular/core';

describe('JbRelatedContentBlockComponent', () => {
  let component: JbRelatedContentBlockComponent;

  beforeEach(() => {
    component = new JbRelatedContentBlockComponent();
    component.relatedItems = new QueryList<
      JbRelatedContentBlockItemComponent
    >();
  });

  describe('isSectionSpecific', () => {
    it('should return true if there are no jb-related-item content children', () => {
      expect(component.isSectionSpecific).toBe(true);
    });

    it('should return false if there are jb-related-item content children', () => {
      component.relatedItems.reset([new JbRelatedContentBlockItemComponent()]);
      expect(component.isSectionSpecific).toBe(false);
    });
  });
});
