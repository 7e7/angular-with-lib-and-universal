import { JbPopoverComponent } from './jb-popover.component';
import { Toggleable } from '../types/jb-toggleable.interface';

describe('JbPopoverComponent', () => {
  let component: JbPopoverComponent;
  let anchor: any;

  beforeEach(() => {
    component = new JbPopoverComponent();
    anchor = {
      isOpen: true,
      open: jest.fn(() => (anchor.isOpen = true)),
      close: jest.fn(() => (anchor.isOpen = false)),
      getIsOpen: () => anchor.isOpen,
    };

    component.currentAnchor = anchor as Toggleable;
  });

  describe('close', () => {
    it('should close on current anchor', () => {
      component.close();

      expect(anchor.close).toHaveBeenCalled();
    });
  });
});
