import { JbPromoBlockComponent } from './jb-promo-block.component';

describe('JbPromoBlockComponent', () => {
  let mockPromoBlockComponent;

  beforeEach(() => {
    mockPromoBlockComponent = new JbPromoBlockComponent();
  });

  describe('isDarkTheme', () => {
    it('should return true if theme is "dark"', () => {
      mockPromoBlockComponent.theme = 'dark';

      expect(mockPromoBlockComponent.isDarkTheme).toBe(true);
    });

    it('should return true if theme is "light"', () => {
      mockPromoBlockComponent.theme = 'light';

      expect(mockPromoBlockComponent.isDarkTheme).toBe(false);
    });
  });
});
