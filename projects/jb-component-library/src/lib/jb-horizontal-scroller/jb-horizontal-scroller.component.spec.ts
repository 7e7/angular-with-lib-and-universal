import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { JbHorizontalScrollerComponent } from './jb-horizontal-scroller.component';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { JbHorizontalScrollerItemDirective } from './jb-horizontal-scroller-item.directive';
import { JbHorizontalScrollerButtonComponent } from './jb-horizontal-scroller-button/jb-horizontal-scroller-button.component';
import { JbIconComponent } from '../jb-icon/jb-icon.component';
import { JB_ICONS } from '../jb-icon/jb-icons.token';
import { KeyboardKey } from '../jb-utils/keyboard-key.enum';

@Component({
  template: `
    <jb-horizontal-scroller [scrollToChildIndex]="scrollToChildIndex">
      <div scrollItem>
        <div id="content-0">Content</div>
      </div>
      <div scrollItem>
        <div id="content-1">Content</div>
      </div>
      <div scrollItem>
        <div id="content-2">Content</div>
      </div>
      <div scrollItem>
        <div id="content-3">Content</div>
      </div>
      <div scrollItem>
        <div id="content-4">Content</div>
      </div>
    </jb-horizontal-scroller>
  `,
})
class JbHorizontalScrollerTestComponent {
  @ViewChild(JbHorizontalScrollerComponent, { static: true })
  scroller: JbHorizontalScrollerComponent;
  scrollToChildIndex = 0;
}

describe('JbHorizontalScrollerComponent', () => {
  let component: JbHorizontalScrollerTestComponent;
  let fixture: ComponentFixture<JbHorizontalScrollerTestComponent>;
  let scroller: JbHorizontalScrollerComponent;
  let scrollItems: JbHorizontalScrollerItemDirective[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JbIconComponent,
        JbHorizontalScrollerButtonComponent,
        JbHorizontalScrollerTestComponent,
        JbHorizontalScrollerComponent,
        JbHorizontalScrollerItemDirective,
      ],
      providers: [{ provide: JB_ICONS, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbHorizontalScrollerTestComponent);
    component = fixture.componentInstance;
    scroller = component.scroller;
    fixture.detectChanges();
    scrollItems = component.scroller.scrollItems.toArray();
    scrollItems[0].boundingClientRect = jest.fn().mockReturnValue({
      bottom: 0,
      height: 0,
      left: 0,
      right: 200,
      top: 0,
      width: 200,
    });
    scrollItems[1].boundingClientRect = jest.fn().mockReturnValue({
      bottom: 0,
      height: 0,
      left: 210,
      right: 410,
      top: 0,
      width: 200,
    });
    scrollItems[2].boundingClientRect = jest.fn().mockReturnValue({
      bottom: 0,
      height: 0,
      left: 420,
      right: 620,
      top: 0,
      width: 200,
    });
    scrollItems[3].boundingClientRect = jest.fn().mockReturnValue({
      bottom: 0,
      height: 0,
      left: 630,
      right: 830,
      top: 0,
      width: 200,
    });
    scrollItems[4].boundingClientRect = jest.fn().mockReturnValue({
      bottom: 0,
      height: 0,
      left: 840,
      right: 1040,
      top: 0,
      width: 200,
    });
    scroller.elementRef.nativeElement.getBoundingClientRect = jest
      .fn()
      .mockReturnValue({
        bottom: 0,
        height: 0,
        left: 0,
        right: 800,
        top: 0,
        width: 800,
      });
    scroller.scrollerContent.nativeElement.getBoundingClientRect = jest
      .fn()
      .mockReturnValue({
        bottom: 0,
        height: 0,
        left: 0,
        right: 600,
        top: 0,
        width: 600,
      });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('scrollToChildIndex', () => {
    it('should scroll to the child if it is not already in view', () => {
      scroller.scrollerContent.nativeElement.scrollLeft = 0;
      component.scrollToChildIndex = 3;
      fixture.detectChanges();
      expect(scroller.scrollerContent.nativeElement.scrollLeft).toEqual(234);
    });
  });

  describe('moveFocusToElement', () => {
    it('should change the focused child', fakeAsync(() => {
      const childToFocus = fixture.debugElement.query(
        By.css('div:nth-child(4) div')
      ).nativeElement;
      spyOn(childToFocus, 'focus');
      scroller.moveFocusToElement(3);
      fixture.detectChanges();
      tick(1);
      expect(childToFocus.focus).toHaveBeenCalled();
    }));
    it('should not update the focus when already set', fakeAsync(() => {
      const childToFocus = fixture.debugElement.query(
        By.css('div:nth-child(4) div')
      ).nativeElement;
      spyOn(childToFocus, 'focus');
      scroller.moveFocusToElement(3);
      fixture.detectChanges();
      tick(1);
      scroller.moveFocusToElement(3);
      fixture.detectChanges();
      tick(1);
      expect(childToFocus.focus).toHaveBeenCalledTimes(1);
    }));
    it('should always set focus when force is set', fakeAsync(() => {
      const childToFocus = fixture.debugElement.query(
        By.css('div:nth-child(4) div')
      ).nativeElement;
      spyOn(childToFocus, 'focus');
      scroller.moveFocusToElement(3);
      fixture.detectChanges();
      tick(1);
      scroller.moveFocusToElement(3, true);
      fixture.detectChanges();
      tick(1);
      expect(childToFocus.focus).toHaveBeenCalledTimes(2);
    }));
  });

  describe('moveFocusToNextElement', () => {
    it('should change the focused index to the next child', fakeAsync(() => {
      const childToFocus = fixture.debugElement.query(By.css('#content-1'))
        .nativeElement;
      spyOn(childToFocus, 'focus');
      scroller.moveFocusToNextElement();
      fixture.detectChanges();
      tick(2);
      expect(childToFocus.focus).toHaveBeenCalled();
    }));
    it('should not change the focus when the last child has focus', fakeAsync(() => {
      component.scrollToChildIndex = 4;
      fixture.detectChanges();
      tick(1);
      const lastChild = fixture.debugElement.query(By.css('#content-4'))
        .nativeElement;
      spyOn(lastChild, 'focus');
      scroller.moveFocusToNextElement();
      fixture.detectChanges();
      tick(1);
      expect(lastChild.focus).not.toHaveBeenCalled();
    }));
  });

  describe('moveFocusToPreviousElement', () => {
    it('should change the focus to the previous child', fakeAsync(() => {
      scroller.activeChildIndex = 3;
      fixture.detectChanges();
      tick(1);
      const focusChild = fixture.debugElement.query(
        By.css('div:nth-child(3) div')
      ).nativeElement;
      spyOn(focusChild, 'focus');
      scroller.moveFocusToPreviousElement();
      fixture.detectChanges();
      tick(1);
      expect(focusChild.focus).toHaveBeenCalled();
    }));
    it('should not change the focus when the first child has the focus', fakeAsync(() => {
      const firstChild = fixture.debugElement.query(
        By.css('div:nth-child(1) div')
      ).nativeElement;
      spyOn(firstChild, 'focus');
      scroller.moveFocusToPreviousElement();
      fixture.detectChanges();
      tick(1);
      expect(firstChild.focus).not.toHaveBeenCalled();
    }));
  });

  describe('moveFocusToLastElement', () => {
    it('should change the focus to the first child', fakeAsync(() => {
      const lastChild = fixture.debugElement.query(
        By.css('div:nth-child(5) div')
      ).nativeElement;
      spyOn(lastChild, 'focus');
      component.scrollToChildIndex = 3;
      fixture.detectChanges();
      tick(1);
      scroller.moveFocusToLastElement();
      fixture.detectChanges();
      tick(1);
      expect(lastChild.focus).toHaveBeenCalled();
    }));
  });

  describe('moveFocusToFirstElement', () => {
    it('should change the focus to the first child', fakeAsync(() => {
      scroller.activeChildIndex = 3;
      fixture.detectChanges();
      tick(1);
      const firstChild = fixture.debugElement.query(By.css('#content-0'))
        .nativeElement;
      spyOn(firstChild, 'focus');
      scroller.moveFocusToFirstElement();
      fixture.detectChanges();
      tick(1);
      expect(firstChild.focus).toHaveBeenCalled();
    }));
  });

  describe('onLeftScroll', () => {
    it('should scroll to the previous child element', () => {
      scroller.firstVisibleChildIndex = jest.fn().mockReturnValue(3);
      spyOn(scroller, 'scrollToElement');
      scroller.onLeftScroll();
      fixture.detectChanges();
      expect(scroller.scrollToElement).toHaveBeenCalledWith(2);
    });
  });

  describe('onRightScroll', () => {
    it('should scroll to the next child element', () => {
      scroller.firstVisibleChildIndex = jest.fn().mockReturnValue(0);
      spyOn(scroller, 'scrollToElement');
      scroller.onRightScroll();
      fixture.detectChanges();
      expect(scroller.scrollToElement).toHaveBeenCalledWith(1);
    });
  });

  describe('onKeyDown', () => {
    it('should move focus to the previous element on arrow left', () => {
      scroller.activeChildIndex = 4;
      fixture.detectChanges();
      spyOn(scroller, 'moveFocusToElement');
      const event = { key: KeyboardKey.ArrowLeft, preventDefault: () => true };
      scroller.onKeyDown((event as unknown) as KeyboardEvent);
      fixture.detectChanges();
      expect(scroller.moveFocusToElement).toHaveBeenCalledWith(3);
    });
    it('should move focus to the first element on home left', () => {
      scroller.activeChildIndex = 4;
      fixture.detectChanges();
      spyOn(scroller, 'moveFocusToElement');
      const event = { key: KeyboardKey.Home, preventDefault: () => true };
      scroller.onKeyDown((event as unknown) as KeyboardEvent);
      fixture.detectChanges();
      expect(scroller.moveFocusToElement).toHaveBeenCalledWith(0);
    });
  });

  describe('firstVisibleChildIndex', () => {
    it('should returns the left-most fully visible element', () => {
      scroller.scrollerContent.nativeElement.getBoundingClientRect = jest
        .fn()
        .mockReturnValue({
          bottom: 0,
          height: 0,
          left: 300,
          right: 600,
          top: 0,
          width: 300,
        });
      fixture.detectChanges();
      const firstVisible = scroller.firstVisibleChildIndex();
      expect(firstVisible).toEqual(2);
    });
  });
});
