import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { JbHorizontalScrollerItemDirective } from './jb-horizontal-scroller-item.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div scrollItem><div>Child</div></div>
  `,
})
class JbHorizontalScrollerItemTestComponent {
  @ViewChild(JbHorizontalScrollerItemDirective, { static: true }) scrollItem;
}

describe('JbHorizontalScrollerItemDirective', () => {
  let component: JbHorizontalScrollerItemTestComponent;
  let fixture: ComponentFixture<JbHorizontalScrollerItemTestComponent>;
  let scrollerItem: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        JbHorizontalScrollerItemTestComponent,
        JbHorizontalScrollerItemDirective,
      ],
    });
    fixture = TestBed.createComponent(JbHorizontalScrollerItemTestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    scrollerItem = fixture.debugElement.query(By.css('div'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when the element gets focus', () => {
    spyOn(component.scrollItem.onFocus, 'emit');
    const event = new Event('focus', { bubbles: true });
    scrollerItem.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.scrollItem.onFocus.emit).toHaveBeenCalled();
  });

  describe('setFocus', () => {
    it('should set the focus on the first child element', fakeAsync(() => {
      const focus = spyOn(
        scrollerItem.nativeElement.firstElementChild,
        'focus'
      );
      component.scrollItem.setFocus();
      tick(1);
      fixture.detectChanges();
      expect(focus).toHaveBeenCalled();
    }));
  });

  describe('boundingClientRect', () => {
    it('should return the nativeElement client rect', fakeAsync(() => {
      const rect: ClientRect = {
        top: 15,
        bottom: 10,
        height: 5,
        left: 30,
        right: 50,
        width: 20,
      };
      scrollerItem.nativeElement.getBoundingClientRect = jest.fn(() => {
        return rect;
      });
      expect(component.scrollItem.boundingClientRect()).toEqual(rect);
    }));
  });
});
