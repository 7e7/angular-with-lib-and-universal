import { JbCalloutStampComponent } from './jb-callout-stamp.component';
import { JbThemeEnum } from '../types/jb-theme.enum';
import { JbCalloutTypeEnum } from '../types/jb-callout-type.enum';

describe('JbCalloutStampComponent', () => {
  let component: JbCalloutStampComponent;

  beforeEach(() => {
    component = new JbCalloutStampComponent();
  });

  it('should default to dark theme', () => {
    expect(component.theme).toBe('dark');
  });

  describe('isDark', () => {
    it('should return true if theme is dark', () => {
      component.theme = JbThemeEnum.dark;
      expect(component.isDark).toBe(true);
    });

    it('should return false if theme is not dark', () => {
      component.theme = JbThemeEnum.light;
      expect(component.isDark).toBe(false);
    });
  });

  describe('isLight', () => {
    it('should return true if theme is light', () => {
      component.theme = JbThemeEnum.light;
      expect(component.isLight).toBe(true);
    });

    it('should return false if theme is not light', () => {
      component.theme = JbThemeEnum.dark;
      expect(component.isLight).toBe(false);
    });
  });

  describe('isPercentType', () => {
    it('should return true if type is percent', () => {
      component.type = JbCalloutTypeEnum.percent;
      expect(component.isPercentType).toBe(true);
    });

    it('should return fasle if type is not percent', () => {
      component.type = JbCalloutTypeEnum.promo;
      expect(component.isPercentType).toBe(false);
    });
  });

  describe('isPriceType', () => {
    it('should return true if type is price', () => {
      component.type = JbCalloutTypeEnum.price;
      expect(component.isPriceType).toBe(true);
    });

    it('should return false if type is not price', () => {
      component.type = JbCalloutTypeEnum.promo;
      expect(component.isPriceType).toBe(false);
    });
  });
});
