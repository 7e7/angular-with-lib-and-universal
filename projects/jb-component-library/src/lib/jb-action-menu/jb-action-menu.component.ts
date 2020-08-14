import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { JbActionMenuItemComponent } from './jb-action-menu-item/jb-action-menu-item.component';
import { JbViewPortService } from './../jb-utils/services/viewport.service';
import { JbPopoverDirective } from './../jb-popover/jb-popover.directive';
@Component({
  selector: 'jb-action-menu',
  templateUrl: './jb-action-menu.component.html',
  styleUrls: ['./jb-action-menu.component.scss'],
  host: {
    class: 'flex items-center',
  },
})
export class JbActionMenuComponent
  implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  @ContentChildren(JbActionMenuItemComponent, { read: ElementRef })
  actionMenuItems: QueryList<ElementRef>;

  @ViewChild('outsideContainer', { read: ElementRef })
  outsideContainer: ElementRef;
  @ViewChild('insideContainer', { read: ElementRef })
  insideContainer: ElementRef;
  @ViewChild('anchor') anchor: JbPopoverDirective;
  @Input()
  outsideItemsCount = 2;
  @Input() menuToggleLabel: string;
  @Input() menuPlacement: 'bottom-start' | 'bottom-end' = 'bottom-end';
  hasInsideItems: boolean;
  isMobile: boolean;
  isMobileSubscription: Subscription;
  isOpen = false;
  menuShouldShow: boolean;

  @Output() afterOpened = new EventEmitter<void>();
  @Output() afterClosed = new EventEmitter<void>();

  constructor(
    private renderer: Renderer2,
    private viewportService: JbViewPortService
  ) {}

  ngOnInit() {
    this.menuShouldShow = false;
    this.hasInsideItems = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.outsideItemsCount && !changes.outsideItemsCount.firstChange) {
      this.sortActionItems(this.actionMenuItems);
    }
  }

  ngAfterViewInit() {
    this.isMobileSubscription = this.viewportService
      .isMobile$()
      .subscribe((isMobileWidth) => {
        if (this.isMobile !== isMobileWidth) {
          this.isMobile = isMobileWidth;
          this.sortActionItems(this.actionMenuItems);
        }
      });
  }

  getInsideItems(items) {
    if (!this.isMobile) {
      return items.filter((item, i) => i >= this.outsideItemsCount);
    } else {
      return items;
    }
  }

  getOutsideItems(items) {
    if (this.isMobile) {
      return [];
    }
    return items.filter((item, i) => i < this.outsideItemsCount);
  }

  sortActionItems(items) {
    const insideItems = this.getInsideItems(items);
    const outsideItems = this.getOutsideItems(items);
    setTimeout(
      () => (this.hasInsideItems = insideItems.length > 0 ? true : false)
    );

    insideItems.map((item) => {
      this.createListItem(item);
      this.appendToParent(
        this.insideContainer.nativeElement,
        item.nativeElement
      );
    });
    outsideItems.map((item) => {
      this.appendToParent(
        this.outsideContainer.nativeElement,
        item.nativeElement
      );
    });
  }

  appendToParent(dest, item) {
    this.renderer.appendChild(dest, item);
  }

  createListItem(item) {
    this.renderer.setAttribute(item.nativeElement, 'role', 'listitem');
  }

  ngOnDestroy(): void {
    this.isMobileSubscription.unsubscribe();
  }

  afterMenuOpened() {
    this.isOpen = true;
    this.afterOpened.emit();
  }

  afterMenuClosed() {
    this.isOpen = false;
    this.afterClosed.emit();
  }

  closeMenu(): void {
    if (this.anchor) {
      this.anchor.close(null, { focusOnPreviousElement: false });
    }
  }
}
