import { JbVideoThumbnailComponent } from './jb-video-thumbnail.component';

describe('JbVideoThumbnailComponent', () => {
  let component: JbVideoThumbnailComponent;

  beforeEach(() => {
    component = new JbVideoThumbnailComponent();
  });

  describe('onMouseOver', () => {
    it('should set isHovered to true', () => {
      component.isHovered = false;
      component.onMouseOver();
      expect(component.isHovered).toBe(true);
    });
  });

  describe('onMouseOut', () => {
    it('should set isHovered to false', () => {
      component.isHovered = true;
      component.onMouseOut();
      expect(component.isHovered).toBe(false);
    });
  });
});
