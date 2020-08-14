import {
  NgZone,
  ViewContainerRef,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { JbPopoverDirective } from './jb-popover.directive';
import { PopperService } from './popper.service';
import { ClickOutsideService } from '../jb-utils/services/click-outside.service';
import { JbViewPortService } from '../jb-utils/utils.module';
import { NEVER, Subject } from 'rxjs';

describe('Popover Anchor', () => {
  let anchor: JbPopoverDirective;
  let elementRef: ElementRef;
  let ngZone: NgZone;
  let popperService: PopperService;
  let popper: any;
  let viewContainerRef: ViewContainerRef;
  let outsideClickService: ClickOutsideService;
  let viewportService: JbViewPortService;
  const isMobileSubject$ = new Subject<boolean>();

  beforeEach(() => {
    elementRef = {} as any;
    viewContainerRef = {
      createEmbeddedView: () => ({
        rootNodes: [],
        destroy: () => undefined,
      }),
      detach: () => undefined,
    } as any;
    ngZone = {
      runOutsideAngular: (fn) => fn(),
      run: (fn) => fn(),
      onStable: NEVER,
    } as any;
    outsideClickService = {
      onOutsideClick: () => NEVER,
    } as any;
    popper = { destroy: jest.fn() };
    popperService = {
      create: () => popper,
    } as any;
    document = { activeElement: '' } as any;
    viewportService = {
      isMobile$: () => isMobileSubject$,
    } as any;

    anchor = new JbPopoverDirective(
      elementRef,
      viewContainerRef,
      ngZone,
      outsideClickService,
      popperService,
      document,
      viewportService
    );

    anchor.popover = {
      afterOpened: new EventEmitter(),
      afterClosed: new EventEmitter(),
    } as any;
  });

  describe('toggle', () => {
    it('should toggle open if closed', () => {
      anchor.close();
      anchor.toggle();

      expect(anchor.getIsOpen()).toBe(true);
    });

    it('should toggle closed if open', () => {
      anchor.open();

      anchor.toggle();

      expect(anchor.getIsOpen()).toBe(false);
    });
  });

  describe('getIsOpen()', () => {
    it('should return true if popover is open', () => {
      anchor.open();

      expect(anchor.getIsOpen()).toBe(true);
    });

    it('should return false if popover is closed', () => {
      anchor.close();

      expect(anchor.getIsOpen()).toBe(false);
    });
  });
});
