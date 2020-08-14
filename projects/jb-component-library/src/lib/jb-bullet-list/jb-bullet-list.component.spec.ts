import { JbBulletListComponent } from './jb-bullet-list.component';
import { createStub } from '../test-helpers';
import { QueryList, ElementRef } from '@angular/core';
import { JbBulletListItemComponent } from './components/jb-bullet-list-item/jb-bullet-list-item.component';

describe('Component: JbErrorComponent', () => {
  let component: JbBulletListComponent;
  const rendererMock = createStub();
  const listItemElements = new QueryList<ElementRef>();
  const listItems = new QueryList<JbBulletListItemComponent>();
  beforeEach(() => {
    component = new JbBulletListComponent(rendererMock);
  });

  describe('displayAllItems', () => {
    it('should display all items when previewCount is not provided', () => {
      component.listItemElements = listItemElements;
      component.listItems = listItems;

      component.ngAfterContentInit();
      expect(component.displayAllItems).toBe(true);
    });

    it('should be collapsible when previewCount is provided', () => {
      component.previewCount = 3;
      expect(component.displayAllItems).toBe(false);
    });
  });

  describe('isExpanded', () => {
    it('should be false initially', () => {
      expect(component.isExpanded).toBe(false);
    });

    it('should be able to toggle', () => {
      component.listItemElements = listItemElements;
      component.toggle();
      expect(component.isExpanded).toBe(true);
    });
  });
});
