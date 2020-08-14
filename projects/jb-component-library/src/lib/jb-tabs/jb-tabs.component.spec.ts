import { JbTabsComponent } from './jb-tabs.component';
import { createStub } from '../test-helpers';
import { QueryList } from '@angular/core';
import { JbTabPanelComponent } from './jb-tab-panel/jb-tab-panel.component';

describe('JbTabsComponent', () => {
  let component;
  let windowMock;
  let elementRefMock;

  beforeEach(() => {
    windowMock = {};
    elementRefMock = { nativeElement: {} };
    component = new JbTabsComponent(
      elementRefMock,
      createStub(),
      windowMock,
      {}
    );

    component.tabContent = {
      nativeElement: {
        style: {},
      },
    };

    component.tabContainer = {
      nativeElement: {},
    };

    component.tabs = new QueryList<JbTabPanelComponent>();
    component.buttonList = new QueryList();
  });

  describe('getTabPanelId', () => {
    it('should return tab.tabpanelId', () => {
      const expected = 'jb-tabpanel-90';
      const tab = { tabpanelId: expected };
      expect(component.getTabPanelId(tab)).toBe(expected);
    });
  });

  describe('getIndexOfActiveTab', () => {
    it('should return index of active tab', () => {
      const tab1 = { isActive: false };
      const tab2 = { isActive: true };
      const tab3 = { isActive: false };

      component.tabs.reset([tab1, tab2, tab3]);
      expect(component.getIndexOfActiveTab()).toBe(1);
    });

    it('should return 0 if no tab is active', () => {
      const tab1 = { isActive: false };
      const tab2 = { isActive: false };
      const tab3 = { isActive: false };

      component.tabs.reset([tab1, tab2, tab3]);
      expect(component.getIndexOfActiveTab()).toBe(0);
    });
  });

  describe('resetindexOfFocusedTab', () => {
    it('should set indexOfFocusedTab to indexOfActiveTab', () => {
      component.indexOfActiveTab = 3;
      component.resetindexOfFocusedTab();
      expect(component.indexOfFocusedTab).toBe(component.indexOfActiveTab);
    });
  });

  describe('resetAllActiveTabsToHidden', () => {
    it('should set all active tabs to not active', () => {
      const tab1 = new JbTabPanelComponent({ nativeElement: jest.fn() });
      const tab2 = new JbTabPanelComponent({ nativeElement: jest.fn() });
      const tab3 = new JbTabPanelComponent({ nativeElement: jest.fn() });

      tab1.isActive = true;
      tab2.isActive = true;
      tab3.isActive = true;

      component.tabs.reset([tab1, tab2, tab3]);
      component.resetAllActiveTabsToHidden();
      expect(tab1.isActive).toBe(false);
      expect(tab2.isActive).toBe(false);
      expect(tab3.isActive).toBe(false);
    });
  });

  describe('calculateButtonListWidth', () => {
    const createButtonMock = (width: number) => ({
      nativeElement: { offsetWidth: width },
    });

    it('should sum all button widths and account for margins', () => {
      const expected = 84;

      const button1 = createButtonMock(5);
      const button2 = createButtonMock(10);
      const button3 = createButtonMock(5);

      component.buttons = new QueryList();
      component.buttons.reset([button1, button2, button3]);
      component.calculateButtonListWidth();

      expect(component.tabBtnListWidth).toBe(expected);
    });
  });

  describe('scrollLeft', () => {
    it('should set margin left on tabContent to 0px', () => {
      component.scrollLeft();
      expect(component.tabContent.nativeElement.style.marginLeft).toBe('0px');
    });
  });

  describe('scrollRight', () => {
    it('should set marginLeft on tabContent to tabBtnListWidth - native element offset width', () => {
      component.tabBtnListWidth = 2;
      elementRefMock.nativeElement.offsetWidth = 1;
      component.scrollRight();
      expect((component.tabContent.nativeElement.style.marginLeft = '-1px'));
    });
  });

  describe('resetScroll', () => {
    it('should set tabContainer.scrollLeft to 0 if not 0', () => {
      component.tabContainer.nativeElement.scrollLeft = 1;
      component.resetScroll();
      expect(component.tabContainer.nativeElement.scrollLeft).toBe(0);
    });
  });

  describe('getLeftScroll', () => {
    it('should return true if tabContent.offsetLeft is less than 0', () => {
      component.tabContent.nativeElement.offsetLeft = -2;
      expect(component.getShouldShowLeftScroll()).toBe(true);
    });

    it('should return false if tabContent.offsetLeft is not less than 0', () => {
      component.tabContent.nativeElement.offsetLeft = 0;
      expect(component.getShouldShowLeftScroll()).toBe(false);
    });
  });

  describe('getRightScroll', () => {
    beforeEach(() => {
      component.tabBtnListWidth = 2;
      elementRefMock.nativeElement.offsetWidth = 0;
      component.tabContent.nativeElement.offsetLeft = 0;
    });

    it('should return true if buttons width is greater than offset width and tab content offsetLeft is 0', () => {
      expect(component.getShouldShowRightScroll()).toBe(true);
    });

    it('should return false if buttons width is not greater than offset width', () => {
      elementRefMock.nativeElement.offsetWidth = 5;
      expect(component.getShouldShowRightScroll()).toBe(false);
    });

    it('should return false if tabContent offsetLeft is not 0', () => {
      component.tabContent.nativeElement.offsetLeft = 1;
      expect(component.getShouldShowRightScroll()).toBe(false);
    });
  });
});
