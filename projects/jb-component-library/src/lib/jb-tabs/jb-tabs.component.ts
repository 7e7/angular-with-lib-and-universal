import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  QueryList,
  OnChanges,
  SimpleChanges,
  ViewChildren,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
  AfterViewChecked,
} from '@angular/core';

import { JbTabPanelComponent } from './jb-tab-panel/jb-tab-panel.component';
import { JbTabNavigationScrollButtonComponent } from './jb-tab-navigation-scroll-button/jb-tab-navigation-scroll-button.component';
import { BREAKPOINTS } from '../jb-utils/breakpoints.constant';
import { JbTheme } from '../types/jb-theme.type';
import { JbThemeEnum } from '../types/jb-theme.enum';
import { IS_BROWSER } from '../jb-utils/injection-tokens';
import { JbViewPortService } from '../jb-utils/services/viewport.service';
import { Subscription } from 'rxjs';
import { KeyboardKey } from '../jb-utils/keyboard-key.enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'jb-tabs',
  templateUrl: './jb-tabs.component.html',
  styleUrls: ['./jb-tabs.component.scss'],
  host: {
    class: 'db w-100',
    '[class.tc-ns]': 'isDynamicBase',
    '[class.bg-core-blue]': '!isLightTheme',
    '[class.white]': '!isLightTheme',
  },
})
export class JbTabsComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnChanges, OnDestroy {
  // Marging between the tab buttons
  readonly BUTTON_MARGIN = 32;
  // Mobile screen size
  readonly MOBILE_SCREEN_WIDTH = BREAKPOINTS.mobile_max;

  @ContentChildren(JbTabPanelComponent) tabs: QueryList<JbTabPanelComponent>;

  @ViewChildren('tabButton') buttons: QueryList<ElementRef>;
  @ViewChild('tabContainer') tabContainer: ElementRef;
  @ViewChild('tabContent', { static: true }) tabContent: ElementRef;
  @ViewChild('leftScrollButton')
  leftScrollButton: JbTabNavigationScrollButtonComponent;
  @ViewChild('rightScrollButton')
  rightScrollButton: JbTabNavigationScrollButtonComponent;

  @Input() isDynamicBase = false;
  @Input() theme: JbTheme = JbThemeEnum.light;
  @Output() tabSelected: EventEmitter<number> = new EventEmitter<number>();

  indexOfFocusedTab: number;
  tabBtnListWidth = 0;

  showLeftScrollButton: boolean;
  showRightScrollButton: boolean;
  indexOfActiveTab: number;
  isLightTheme: boolean;
  isMobile: boolean;

  private isMobileSubscription: Subscription;
  // Determines whether the click event was triggered - handles an edge case
  private isClicked = false;

  constructor(
    private element: ElementRef,
    private view: ChangeDetectorRef,
    private viewportService: JbViewPortService,
    @Inject(IS_BROWSER) private isBrowser
  ) {}

  ngOnInit() {
    this.isMobileSubscription = this.viewportService
      .isMobile$()
      .subscribe((isMobileWidth) => (this.isMobile = isMobileWidth));
  }

  ngAfterViewInit(): void {
    this.initTabs();
  }

  ngAfterViewChecked(): void {
    if (this.tabBtnListWidth <= 0) {
      this.calculateButtonListWidth();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tabs) {
      this.resetActiveTab();
    }

    this.isLightTheme = this.theme === JbThemeEnum.light;
    this.updateIndexOfActiveTab();
    this.updateShowScrollBooleans();
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case KeyboardKey.ArrowLeft:
      case KeyboardKey.ArrowLeftIE:
        this.moveFocusToNextTab(-1);
        break;
      case KeyboardKey.ArrowRight:
      case KeyboardKey.ArrowRightIE:
        this.moveFocusToNextTab(1);
        break;
      case KeyboardKey.Enter:
        this.moveFocusToActiveTabContainer(this.indexOfFocusedTab);
        break;
      case KeyboardKey.Space:
      case KeyboardKey.SpaceIE:
        this.moveFocusToActiveTabContainer(this.indexOfFocusedTab);
        break;
      case KeyboardKey.Home:
        event.preventDefault();
        this.switchActiveTab(this.tabs.first);
        break;
      case KeyboardKey.End:
        event.preventDefault();
        this.switchActiveTab(this.tabs.last);
        break;
      default:
        break;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resetScroll();
    this.scrollLeft();
    this.updateShowScrollBooleans();
  }

  getTabPanelId(object: JbTabPanelComponent): string {
    return object.tabpanelId;
  }

  getIndexOfActiveTab(): number {
    let index;

    if (!this.tabs) {
      return 0;
    }

    index = this.tabs.toArray().findIndex((tab) => tab.isActive) || 0;
    return index === -1 ? 0 : index;
  }

  switchActiveTab(tab: JbTabPanelComponent): void {
    if (tab.isActive) {
      return;
    }

    this.setActiveTab(tab);
  }

  handleClick(tab: JbTabPanelComponent): void {
    this.isClicked = true;
    this.switchActiveTab(tab);
  }

  handleFocus(index: number): void {
    this.indexOfFocusedTab = index;
    this.updateFocusedTab();
    this.scrollToTabIfNotMouseClicked();
  }

  getIndexOfFocusedTab(modifier: number): number {
    let updatedFocus = this.indexOfFocusedTab + modifier;

    if (updatedFocus < 0) {
      updatedFocus = this.tabs.length - 1;
    }

    if (updatedFocus > this.tabs.length - 1) {
      updatedFocus = 0;
    }

    return updatedFocus;
  }

  resetActiveTab(): void {
    this.switchActiveTab(this.findActiveOrFirstTab());
  }

  resetindexOfFocusedTab(): void {
    this.indexOfFocusedTab = this.indexOfActiveTab;
  }

  resetAllActiveTabsToHidden(): void {
    this.tabs.forEach((tab) => {
      if (tab.isActive) {
        tab.hide();
      }
    });
  }

  calculateButtonListWidth(): void {
    if (this.buttons.first.nativeElement.offsetWidth <= 0) {
      return;
    }
    this.buttons.forEach((button) => {
      this.tabBtnListWidth +=
        button.nativeElement.offsetWidth + this.BUTTON_MARGIN;
    });
    // Removes the last margin
    this.tabBtnListWidth -= this.BUTTON_MARGIN;
    if (!this.isBrowser) {
      return;
    }

    setTimeout(() => {
      this.updateShowScrollBooleans();
      this.view.markForCheck();
    });
  }

  getShouldShowRightScroll(): boolean {
    return (
      this.tabBtnListWidth > this.element.nativeElement.offsetWidth &&
      this.tabContent.nativeElement.offsetLeft === 0
    );
  }

  getShouldShowLeftScroll(): boolean {
    return this.tabContent.nativeElement.offsetLeft < 0;
  }

  updateShowScrollBooleans(): void {
    this.showLeftScrollButton = this.getShouldShowLeftScroll();
    this.showRightScrollButton = this.getShouldShowRightScroll();
  }

  scrollLeft(): void {
    this.tabContent.nativeElement.style.marginLeft = '0px';
    this.updateShowScrollBooleans();
  }

  scrollRight(): void {
    const diff = this.tabBtnListWidth - this.element.nativeElement.offsetWidth;
    this.tabContent.nativeElement.style.marginLeft = `-${diff}px`;
    this.updateShowScrollBooleans();
  }

  resetScroll(): void {
    if (this.tabContainer.nativeElement.scrollLeft !== 0) {
      this.tabContainer.nativeElement.scrollLeft = 0;
    }
  }

  scrollToTabIfNotMobile(): void {
    if (this.isMobile) {
      return;
    }

    if (this.isRightTabbedItemOutOfBound()) {
      return this.scrollRight();
    }

    if (this.isLeftTabbedItemOutOfBound()) {
      return this.scrollLeft();
    }
  }

  moveFocusToActiveTabContainer(index: number): void {
    const tab = this.tabs.toArray()[index];

    this.resetAllActiveTabsToHidden();
    tab.show();
    tab.setContainerFocus();

    this.updateIndexOfActiveTab(); //  sets indexOfActiveTab
    this.resetindexOfFocusedTab(); //  sets indexOfFocusedTab to indexOfActiveTab;

    this.tabSelected.emit(this.indexOfActiveTab);
  }

  scrollToTabIfNotMouseClicked(): void {
    if (!this.isClicked) {
      this.scrollToTabIfNotMobile();
    }
    this.isClicked = false;
  }

  ngOnDestroy(): void {
    this.isMobileSubscription.unsubscribe();
  }

  /* Helpers */

  private moveFocusToNextTab(direction: number): void {
    this.indexOfFocusedTab = this.getIndexOfFocusedTab(direction);
    this.updateFocusedTab();
    this.scrollToTabIfNotMobile();
  }

  private updateFocusedTab(): void {
    const button = this.buttons.toArray()[this.indexOfFocusedTab];
    const tabs = this.tabs.toArray();

    tabs[this.indexOfFocusedTab].isFocused = true;
    button.nativeElement.focus();
  }

  private updateIndexOfActiveTab(): void {
    this.indexOfActiveTab = this.getIndexOfActiveTab();
  }

  private findActiveOrFirstTab = (): JbTabPanelComponent =>
    this.tabs.find((tab) => tab.isActive) || this.tabs.first;

  private initTabs(): void {
    this.setActiveTab(this.findActiveOrFirstTab());
  }

  private setActiveTab(tab: JbTabPanelComponent): void {
    this.resetAllActiveTabsToHidden();
    tab.show();

    this.updateIndexOfActiveTab();
    this.resetindexOfFocusedTab();
    this.scrollToTabIfNotMobile();
    this.tabSelected.emit(this.indexOfActiveTab);
  }

  private isRightTabbedItemOutOfBound(): boolean {
    if (!this.rightScrollButton) {
      return false;
    }

    return this.getFocusedButtonRight() >= this.rightScrollButton.getLeft();
  }

  private isLeftTabbedItemOutOfBound(): boolean {
    if (!this.leftScrollButton) {
      return false;
    }

    return this.getFocusedButtonLeft() <= this.leftScrollButton.getLeft();
  }

  private getFocusedButton(): HTMLElement {
    return this.buttons.toArray()[this.indexOfFocusedTab].nativeElement;
  }

  private getFocusedButtonLeft(): number {
    return this.getFocusedButton().getBoundingClientRect().left;
  }

  private getFocusedButtonRight(): number {
    return this.getFocusedButtonLeft() + this.getFocusedButton().offsetWidth;
  }
}
