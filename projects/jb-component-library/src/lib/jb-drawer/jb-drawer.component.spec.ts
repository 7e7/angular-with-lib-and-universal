import { JbDrawerComponent } from './jb-drawer.component';
import { JbDrawerHeaderComponent } from './jb-drawer-header/jb-drawer-header.component';
import { ClickOutsideService } from 'src/jb-utils/services/click-outside.service';
import { NEVER } from 'rxjs';

describe('JbDrawerComponent', () => {
  let component: JbDrawerComponent;
  let drawerHeader: JbDrawerHeaderComponent;
  let outsideClickService: ClickOutsideService;

  beforeEach(() => {
    outsideClickService = {
      onOutsideClick: () => NEVER,
    } as any;
    component = new JbDrawerComponent(outsideClickService, null);
    drawerHeader = new JbDrawerHeaderComponent();
    component.header = drawerHeader;
  });

  describe('close button', () => {
    it('should close on click', () => {
      component.open();
      component.ngAfterContentInit();
      drawerHeader.drawerClose();
      expect(component.isOpen).toBe(false);
    });

    it('should not close on click if canClose is false', () => {
      component.canClose = false;
      component.open();
      component.ngAfterContentInit();
      drawerHeader.drawerClose();
      expect(component.isOpen).toBe(true);
    });
  });

  describe('toggle', () => {
    it('should toggle open if closed', () => {
      component.close();

      component.toggle();

      expect(component.getIsOpen()).toBe(true);
    });

    it('should toggle closed if open', () => {
      component.open();

      component.toggle();

      expect(component.getIsOpen()).toBe(false);
    });
  });

  describe('getIsOpen()', () => {
    it('should return true if drawer is open', () => {
      component.open();

      expect(component.getIsOpen()).toBe(true);
    });

    it('should return false if drawer is closed', () => {
      component.close();

      expect(component.getIsOpen()).toBe(false);
    });
  });

  describe('eventEmitters', () => {
    it('should emit an event after opening the drawer', (done) => {
      component.afterOpened.subscribe((value) => {
        expect(value).toEqual('hello');
        done();
      });
      component.open('hello');
    });

    it('should emit an event after drawer is closed', (done) => {
      component.open();
      component.afterClosed.subscribe((value: any) => {
        expect(value).toEqual('goodbye');
        done();
      });
      component.close('goodbye');
    });

    it('should emit an event before drawer is closed', (done) => {
      component.open();
      component.beforeClose.subscribe((value: any) => {
        expect(value).toEqual('goodbye');
        done();
      });
      component.close('goodbye');
    });
  });
});
