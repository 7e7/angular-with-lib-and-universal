import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { KeyboardKey } from '../jb-utils/keyboard-key.enum';
import { JbHorizontalScrollerItemDirective } from './jb-horizontal-scroller-item.directive';
import { Subscription } from 'rxjs';
import { JbHorizontalScrollerButtonComponent } from './jb-horizontal-scroller-button/jb-horizontal-scroller-button.component';

@Component({
  selector: 'jb-horizontal-scroller',
  styleUrls: ['./jb-horizontal-scroller.component.scss'],
  templateUrl: './jb-horizontal-scroller.component.html',
})
export class JbHorizontalScrollerComponent
  implements
    AfterViewInit,
    AfterContentInit,
    OnChanges,
    OnDestroy,
    AfterContentChecked {
  @ContentChildren(JbHorizontalScrollerItemDirective) scrollItems: QueryList<
    JbHorizontalScrollerItemDirective
  >;
  @ViewChild('scrollerContent', { static: true }) scrollerContent: ElementRef;
  @ViewChild('outerScroller') outerScroller: ElementRef;
  @ViewChild('leftScrollButton')
  leftScrollButton: JbHorizontalScrollerButtonComponent;
  @ViewChild('rightScrollButton')
  rightScrollButton: JbHorizontalScrollerButtonComponent;

  @Input() scrollToChildIndex = 0;

  activeChildIndex = 0;
  showScrollButtons = false;
  leftButtonDisabled = false;
  rightButtonDisabled = false;
  scrollButtonHeight: number;
  FOCUS_PADDING = 4;
  private subscriptions = new Subscription();

  constructor(public elementRef: ElementRef) {}

  @HostListener('window:resize')
  onResize(): void {
    this.updateScrollButtons();
  }

  ngAfterViewInit() {
    const numScrollWrappers = this.scrollItems.length;
    if (numScrollWrappers) {
      this.scrollToElement(this.scrollToChildIndex);
    }
    setTimeout(() => {
      this.updateScrollButtons();
    });
  }

  ngAfterContentInit() {
    this.scrollItems.forEach((scrollItem, index) => {
      // We need to handle the focus changing via mouse click
      this.subscriptions.add(
        scrollItem.onFocus.subscribe(() => {
          this.moveFocusToElement(index);
          this.scrollElementIntoView(index);
        })
      );
    });
    this.subscriptions.add(
      this.scrollerContent.nativeElement.addEventListener('scroll', () => {
        this.onScrollChanged();
      })
    );
  }

  ngAfterContentChecked() {
    // Check if the height of the scroller has changed
    if (
      this.scrollButtonHeight !==
      this.scrollerContent.nativeElement.clientHeight
    ) {
      setTimeout(() => {
        this.scrollButtonHeight = this.scrollerContent.nativeElement.clientHeight;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.scrollToChildIndex && this.scrollItems) {
      this.scrollElementIntoView(this.scrollToChildIndex);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  updateScrollButtons() {
    if (this.outerScroller) {
      this.showScrollButtons = !this.isAllContentVisible();
      setTimeout(() => {
        if (this.showScrollButtons) {
          this.leftButtonDisabled = this.isLeftButtonDisabled();
          this.rightButtonDisabled = this.isRightButtonDisabled();
        }
      });
    }
  }

  isAllContentVisible(): boolean {
    const numScrollItems = this.scrollItems.length;
    if (numScrollItems < 2) {
      return true;
    }
    const items = this.scrollItems.toArray();
    const firstElementRect: ClientRect = items[0].boundingClientRect();
    const lastElementRect: ClientRect = items[
      numScrollItems - 1
    ].boundingClientRect();
    const contentWidth = lastElementRect.right - firstElementRect.left;
    const scrollerRect: ClientRect = this.elementRef.nativeElement.getBoundingClientRect();
    return scrollerRect.width > contentWidth;
  }

  // Scroll the content so that the indexed element is the first visible element
  scrollToElement(index) {
    const numScrollItems = this.scrollItems.length;
    if (index < 0 || index >= numScrollItems) {
      return;
    }
    this.activeChildIndex = index;
    let newScrollOffset = 0;
    if (!this.isAllContentVisible()) {
      // if the index is 0 or we only have one component then we don't need to scroll
      if (index !== 0 && numScrollItems > 1) {
        const items = this.scrollItems.toArray();
        const firstElementRect: ClientRect = items[0].boundingClientRect();
        const scrollElementRect: ClientRect = items[index].boundingClientRect();
        newScrollOffset = scrollElementRect.left - firstElementRect.left;
      }
    }
    this.scrollerContent.nativeElement.scrollLeft = newScrollOffset;
  }

  onScrollChanged() {
    if (this.showScrollButtons) {
      this.leftButtonDisabled = this.isLeftButtonDisabled();
      this.rightButtonDisabled = this.isRightButtonDisabled();
    }
  }

  // Scrolls the element so it is fully visible if it is not already
  scrollElementIntoView(index) {
    const numScrollItems = this.scrollItems.length;
    if (index < 0 || index >= numScrollItems || this.isAllContentVisible()) {
      return;
    }
    if (index === 0) {
      this.scrollerContent.nativeElement.scrollLeft = 0;
    } else {
      // if the index is 0 or we only have one component then we don't need to scroll
      const items = this.scrollItems.toArray();
      const scrollElementRect: ClientRect = items[index].boundingClientRect();
      const scrollerRect: ClientRect = this.scrollerContent.nativeElement.getBoundingClientRect();
      if (scrollElementRect.left < scrollerRect.left) {
        const firstElementRect: ClientRect = items[0].boundingClientRect();
        this.scrollerContent.nativeElement.scrollLeft =
          scrollElementRect.left - firstElementRect.left;
      } else if (scrollElementRect.right > scrollerRect.right) {
        const addOffset =
          scrollElementRect.right - scrollerRect.right + this.FOCUS_PADDING;
        this.scrollerContent.nativeElement.scrollLeft =
          this.scrollerContent.nativeElement.scrollLeft + addOffset;
      }
    }
  }

  moveFocusToElement(index, force = false): void {
    if (!force && index === this.activeChildIndex) {
      return;
    }
    const numScrollItems = this.scrollItems.length;
    if (numScrollItems === 0) {
      return;
    }
    let updatedIndex = index;
    if (index < 0) {
      updatedIndex = 0;
    }
    if (updatedIndex >= numScrollItems) {
      updatedIndex = numScrollItems - 1;
    }
    const focusedElement = this.scrollItems.toArray()[updatedIndex];
    this.activeChildIndex = updatedIndex;
    this.scrollElementIntoView(updatedIndex);
    focusedElement.setFocus();
  }

  isLeftButtonDisabled(): boolean {
    let isDisabled = true;
    if (this.showScrollButtons) {
      if (this.scrollItems.length > 0) {
        const scrollerLeftPosition = this.scrollerContent.nativeElement.getBoundingClientRect()
          .left;
        const firstElementRect = this.scrollItems
          .toArray()[0]
          .boundingClientRect();
        isDisabled = firstElementRect.left > scrollerLeftPosition;
      }
    }
    return isDisabled;
  }

  isRightButtonDisabled(): boolean {
    let isDisabled = true;
    if (this.showScrollButtons) {
      const numScrollItems = this.scrollItems.length;
      if (numScrollItems > 0) {
        const scrollerPosition = this.scrollerContent.nativeElement.getBoundingClientRect();
        const lastElementRect = this.scrollItems
          .toArray()
          [numScrollItems - 1].boundingClientRect();
        isDisabled = scrollerPosition.right > lastElementRect.right;
      }
    }
    return isDisabled;
  }

  // Returns the left-most fully visible element
  firstVisibleChildIndex(): number {
    const leftPosition = this.scrollerContent.nativeElement.getBoundingClientRect()
      .left;
    const numScrollItems = this.scrollItems.length;
    const items = this.scrollItems.toArray();
    let leftMostVisible = 0;
    while (leftMostVisible < numScrollItems) {
      if (items[leftMostVisible].boundingClientRect().left > leftPosition) {
        break;
      }
      leftMostVisible++;
    }
    return leftMostVisible;
  }

  onLeftScroll() {
    const firstChildIndex = this.firstVisibleChildIndex();
    if (firstChildIndex > 0) {
      this.scrollToElement(firstChildIndex - 1);
    }
  }

  onRightScroll() {
    const firstChildIndex = this.firstVisibleChildIndex();
    if (firstChildIndex < this.scrollItems.length - 1) {
      this.scrollToElement(firstChildIndex + 1);
    }
  }

  moveFocusToNextElement() {
    if (this.activeChildIndex < this.scrollItems.length - 1) {
      this.moveFocusToElement(this.activeChildIndex + 1);
    }
  }

  moveFocusToPreviousElement() {
    if (this.activeChildIndex > 0) {
      this.moveFocusToElement(this.activeChildIndex - 1);
    }
  }

  moveFocusToFirstElement() {
    this.moveFocusToElement(0);
  }

  moveFocusToLastElement() {
    this.moveFocusToElement(this.scrollItems.length - 1);
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case KeyboardKey.ArrowLeft:
      case KeyboardKey.ArrowLeftIE:
        event.preventDefault();
        this.moveFocusToPreviousElement();
        break;
      case KeyboardKey.Tab:
        if (event.shiftKey) {
          if (this.activeChildIndex !== 0) {
            this.moveFocusToPreviousElement();
            event.preventDefault();
          }
        } else if (this.activeChildIndex !== this.scrollItems.length - 1) {
          this.moveFocusToNextElement();
          event.preventDefault();
        }
        break;
      case KeyboardKey.ArrowRight:
      case KeyboardKey.ArrowRightIE:
        event.preventDefault();
        this.moveFocusToNextElement();
        break;
      case KeyboardKey.Home:
        event.preventDefault();
        this.moveFocusToFirstElement();
        break;
      case KeyboardKey.End:
        event.preventDefault();
        this.moveFocusToLastElement();
        break;
      default:
        break;
    }
  }
}
