import { JbBreadcrumbsComponent } from './jb-breadcrumbs.component';
import { BreadcrumbsItem } from './types/breadcrumbs-item.type';
import { BreadcrumbsParentPage } from './types/breadcrumbs-parent-page.type';
import { JbThemeEnum } from '../types/jb-theme.enum';

describe('JbBreadcrumbsComponent', () => {
  let component: JbBreadcrumbsComponent;

  const createBreadcrumbsParentPage = (
    theName: string,
    theHref: string
  ): BreadcrumbsParentPage => ({
    name: theName,
    href: theHref,
  });

  beforeEach(() => {
    component = new JbBreadcrumbsComponent();
  });

  it('should default to light theme', () => {
    expect(component.isLightTheme).toBe(true);
  });

  describe('get item()', () => {
    it('should return a new, empty item if breadcrumb is undefined', () => {
      expect(component.breadcrumb).toBeUndefined();
      expect(component.item).toEqual({
        name: '',
        href: '',
        parentPages: [],
      });
    });

    it('should return breadcrumb if initialized', () => {
      const breadCrumb: BreadcrumbsItem = {
        name: 'My Breadcrumb',
        href: 'https://www.google.com',
        parentPages: [],
      };

      component.breadcrumb = breadCrumb;
      expect(component.item).toBe(breadCrumb);
    });
  });

  describe('setDirectParent and reverseParent', () => {
    let breadcrumbItem: BreadcrumbsItem;
    beforeEach(() => {
      breadcrumbItem = {
        name: 'Best Bread Crumb Item Ever',
        href: 'https://www.google.com',
        parentPages: [
          createBreadcrumbsParentPage('1', 'href1'),
          createBreadcrumbsParentPage('2', 'href2'),
        ],
      };
    });

    describe('setDirectParent', () => {
      it('should initialize directParent to the first parent of breadCrumbItem', () => {
        component.setDirectParent(breadcrumbItem);
        expect(component.directParent).toBe(breadcrumbItem.parentPages[0]);
      });
    });

    describe('reverseParent', () => {
      it('should return new breadcrumbItem with parentPages reversed', () => {
        const result = component.reverseParent(breadcrumbItem);
        expect(result.parentPages[0].name).toEqual('2');
      });
    });
  });

  describe('isDarkTheme', () => {
    it('should return true if the theme is dark', () => {
      component.theme = JbThemeEnum.dark;
      expect(component.isDarkTheme).toBe(true);
    });

    it('should return false if not dark theme', () => {
      component.theme = JbThemeEnum.light;
      expect(component.isDarkTheme).toBe(false);
    });
  });

  describe('isLightTheme', () => {
    it('should return true if theme is light', () => {
      component.theme = JbThemeEnum.light;
      expect(component.isLightTheme).toBe(true);
    });

    it('should return false if theme is not light', () => {
      component.theme = JbThemeEnum.dark;
      expect(component.isLightTheme).toBe(false);
    });
  });
});
