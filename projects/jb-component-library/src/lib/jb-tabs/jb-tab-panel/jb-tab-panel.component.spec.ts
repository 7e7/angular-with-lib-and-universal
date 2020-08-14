import { JbTabPanelComponent } from './jb-tab-panel.component';
import { createStub } from '../../test-helpers';
import { JbTabAriaSelected } from '../types/jb-tab-aria-selected.enum';

describe('JbTabPanelComponent', () => {
  let panel: JbTabPanelComponent;

  beforeEach(() => {
    panel = new JbTabPanelComponent({ nativeElement: jest.fn() }, createStub());
  });

  describe('updateComputedValues', () => {
    it('should set ariaHidden to inverse of isActive', () => {
      panel.isActive = false;
      panel.setAriaValues();
      expect(panel.ariaHidden).toBe(true);

      panel.isActive = true;
      panel.setAriaValues();
      expect(panel.ariaHidden).toBe(false);
    });

    it("should set ariaSelected to 'true' if active", () => {
      panel.isActive = true;
      panel.setAriaValues();
      expect(panel.ariaSelected).toBe(JbTabAriaSelected.true);
    });

    it("should set ariaSelected to 'false' if inactive", () => {
      panel.isActive = false;
      panel.setAriaValues();
      expect(panel.ariaSelected).toBe(JbTabAriaSelected.false);
    });
  });
});
