import { JbExpansionPanelComponent } from './jb-expansion-panel.component';
import { createStub } from '../test-helpers';
import { KeyboardKey } from '../jb-utils/keyboard-key.enum';

/*
 * Test Helpers
 */

const createKeyboardEventMock = (theKey: string, props?: object) => {
  return createStub({
    ...props,
    key: theKey,
    stopPropagation: jest.fn(),
    preventDefault: jest.fn(),
  });
};

/*
 * Test Suite
 */

describe('JbExpansionPanelComponent', () => {
  let component: JbExpansionPanelComponent;

  beforeEach(() => {
    component = new JbExpansionPanelComponent();

    component.header = createStub({
      setIsExpanded: jest.fn(),
      isFocused: false,
    });
  });

  it('should have a unique id', () => {
    const component2 = new JbExpansionPanelComponent();
    expect(component.id).not.toEqual(component2.id);
  });

  describe('handleEndKey', () => {
    it('should emit keypress event', (done) => {
      component.keypress.subscribe((event: KeyboardEvent) => {
        expect(event.key).toEqual(KeyboardKey.End);
        done();
      });

      component.handleEndKey(createKeyboardEventMock(KeyboardKey.End));
    });
  });

  describe('handleHomeKey', () => {
    it('should emit keypress event if isAlone is false', (done) => {
      component.isAlone = false;
      component.keypress.subscribe((event: KeyboardEvent) => {
        expect(event.key).toEqual(KeyboardKey.Home);
        done();
      });
      component.handleHomeKey(createKeyboardEventMock(KeyboardKey.Home));
    });

    it('should not emit keypress event if isAlone is true', () => {
      component.isAlone = true;
      spyOn(component.keypress, 'emit');
      component.handleHomeKey(createKeyboardEventMock(KeyboardKey.Home));
      expect(component.keypress.emit).not.toHaveBeenCalled();
    });
  });

  describe('handleTabKey', () => {
    it('should emit keypress event if header is focused, component is not alone and not expanded', (done) => {
      component.header.isFocused = true;
      component.isAlone = false;
      component.isExpanded = false;

      component.keypress.subscribe((event: KeyboardEvent) => {
        expect(event.key).toEqual(KeyboardKey.Tab);
        done();
      });

      component.handleTabKey(createKeyboardEventMock(KeyboardKey.Tab));
    });

    it('should not emit keypress event if header is not focus', () => {
      component.header.isFocused = false;
      component.isAlone = false;
      component.isExpanded = false;

      spyOn(component.keypress, 'emit');
      component.handleTabKey(createKeyboardEventMock(KeyboardKey.Tab));
      expect(component.keypress.emit).not.toHaveBeenCalled();
    });

    it('should not emit keypress event if isAlone is true', () => {
      component.header.isFocused = true;
      component.isAlone = true;
      component.isExpanded = true;

      spyOn(component.keypress, 'emit');
      component.handleTabKey(createKeyboardEventMock(KeyboardKey.Tab));
      expect(component.keypress.emit).not.toHaveBeenCalled();
    });

    it('should not emit keypress event if isExpanded is true', () => {
      component.header.isFocused = true;
      component.isAlone = false;
      component.isExpanded = true;

      spyOn(component.keypress, 'emit');
      component.handleTabKey(createKeyboardEventMock(KeyboardKey.Tab));
      expect(component.keypress.emit).not.toHaveBeenCalled();
    });
  });

  describe('openPanel', () => {
    it('should set isExpanded to true', () => {
      component.isExpanded = false;

      component.openPanel();
      expect(component.isExpanded).toBe(true);
    });

    it('should emit opened event', (done) => {
      component.opened.subscribe(done);
      component.openPanel();
    });
  });

  describe('closePanel', () => {
    it('should set isExpanded to false', () => {
      component.isExpanded = true;
      component.closePanel();
      expect(component.isExpanded).toBe(false);
    });

    it('should emit closed event', (done) => {
      component.closed.subscribe(done);
      component.closePanel();
    });
  });

  describe('toggleExpansion', () => {
    it('should open panel if not expanded', () => {
      component.isExpanded = false;
      component.toggleExpansion();
      expect(component.isExpanded).toBe(true);
    });

    it('should close panel if expanded', () => {
      component.isExpanded = true;
      component.toggleExpansion();
      expect(component.isExpanded).toBe(false);
    });
  });
});
