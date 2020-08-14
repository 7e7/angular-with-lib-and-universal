import { JbRelatedContentBlockGridContainerComponent } from './jb-related-content-block-grid-container.component';

describe('JBRelatedContentBlockGridContainerComponent', () => {
  let component: JbRelatedContentBlockGridContainerComponent;
  let relatedContentBlock;

  beforeEach(() => {
    relatedContentBlock = {
      relatedItems: [],
    };

    component = new JbRelatedContentBlockGridContainerComponent(
      relatedContentBlock
    );
  });

  describe('isGridOffset', () => {
    it('should return true if related items is <= 2', () => {
      expect(component.isGridOffset).toBe(true);
    });

    it('should return false if related items is > 2', () => {
      relatedContentBlock.relatedItems = [1, 2, 3];
      expect(component.isGridOffset).toBe(false);
    });
  });
});
