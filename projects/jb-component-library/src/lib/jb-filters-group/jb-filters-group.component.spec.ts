import { JbFiltersGroupComponent } from './jb-filters-group.component';
import { JbFilterWrapperComponent } from './components/jb-filters-wrapper/jb-filters-wrapper.component';

describe('JbFiltersGroupComponent', () => {
  let component: JbFiltersGroupComponent;
  let items: JbFilterWrapperComponent[];

  function createItem(): JbFilterWrapperComponent {
    return {
      hide: jest.fn(),
      toggle: jest.fn(),
    } as any;
  }

  beforeEach(() => {
    component = new JbFiltersGroupComponent();
    items = [createItem(), createItem(), createItem()];
    (component as any).items = items;
  });

  describe('toggle', () => {
    it('should toggle an item', () => {
      const toggleItem = items[1];
      component.toggle(toggleItem);

      expect(toggleItem.toggle).toHaveBeenCalled();
    });
  });

  describe('hideAll', () => {
    it('should hide all items', () => {
      component.hideAll();

      items.forEach((item) => {
        expect(item.hide).toHaveBeenCalled();
      });
    });
  });
});
