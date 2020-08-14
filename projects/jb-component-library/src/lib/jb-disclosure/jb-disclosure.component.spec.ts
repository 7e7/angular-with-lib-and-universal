import { JbDisclosureComponent } from './jb-disclosure.component';

describe('JbDisclosureComponent', () => {
  let component: JbDisclosureComponent;

  beforeEach(() => {
    component = new JbDisclosureComponent();
  });

  describe('toggle', () => {
    it('should emit close when disclosure closes', () => {
      const onClose = jest.fn();
      component.close.subscribe(onClose);
      // disclosure starts closed
      component.toggle(); // toggle to open
      component.toggle(); // toggle again to close
      expect(onClose).toHaveBeenCalled();
    });

    it('should emit open when disclosure opens', () => {
      const onOpen = jest.fn();
      component.open.subscribe(onOpen);
      // disclosure starts closed
      component.toggle(); // toggle to open
      expect(onOpen).toHaveBeenCalled();
    });
  });
});
