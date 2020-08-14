import { JbSelectOptionComponent } from './jb-select-option.component';
import { createStub } from '../../test-helpers';
import { JbChevronTypeEnum } from '../../types/jb-chevron-type.enum';

describe('JbSelectOptionComponent', () => {
  let component: JbSelectOptionComponent;

  beforeEach(() => {
    component = new JbSelectOptionComponent(
      createStub({ markForCheck: () => false })
    );
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('setters for variables', () => {
    it('should set isActive to truthy', () => {
      component.setIsActive(true);
      expect(component.isActive).toBe(true);
      expect(component.getIsActive()).toBe(true);
    });

    it('should set isHovered to truthy', () => {
      component.setIsHovered(true);
      expect(component.isHovered).toBe(true);
    });

    it('should set isFocused to truthy', () => {
      component.setIsFocused(true);
      expect(component.isFocused).toBe(true);
    });

    it('should set type to standard', () => {
      component.setType(JbChevronTypeEnum.standard);
      expect(component.type).toBe(JbChevronTypeEnum.standard);
    });

    it('should set type to simple', () => {
      component.setType(JbChevronTypeEnum.simple);
      expect(component.type).toBe(JbChevronTypeEnum.simple);
    });
  });

  describe('Event Emitters', () => {
    it('should emit valueChanged', () => {
      component.name = 'bob';
      component.value = 'item 1';

      component.valueChanged.subscribe((foo: { name: any; value: any }) => {
        expect(foo.name).toEqual('bob');
        expect(foo.value).toEqual('item 1');
      });
      component.onClick();
    });

    it('should emit mouseOver', () => {
      component.name = 'bob';
      component.value = 'item 1';

      component.mouseOver.subscribe((foo: { name: any; value: any }) => {
        expect(foo.name).toEqual('bob');
        expect(foo.value).toEqual('item 1');
      });
      component.onMouse();
    });

    it('should emit search', () => {
      component.name = 'bob';
      component.value = 'item 1';

      component.search.subscribe((foo: { name: any; value: any }) => {
        expect(foo.name).toEqual('bob');
        expect(foo.value).toEqual('item 1');
      });
      component.setActiveStyles();
    });
  });
});
