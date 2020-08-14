import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  SimpleChanges,
  OnChanges,
  QueryList,
  ViewChild,
  Optional,
  Self,
  OnDestroy,
  Output,
  EventEmitter,
  Inject,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NgForm,
  FormGroupDirective,
} from '@angular/forms';
import { Subscription, merge } from 'rxjs';
import { delay, startWith, switchMap } from 'rxjs/operators';

import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  ENTER,
  UP_ARROW,
  DOWN_ARROW,
  HOME,
  END,
  TAB,
  SPACE,
  ESCAPE,
} from '@angular/cdk/keycodes';
import { JbViewPortService } from '../jb-utils/utils.module';

import { JbSelectOptionComponent } from './jb-select-option/jb-select-option.component';
import { JbDomService } from '../jb-utils/services/dom.service';
import { CHEVRON_ANIMATIONS } from '../types/jb-chevron-animation.constant';
import { debounce } from './../jb-utils/utilities.functions';
import { JbChevronTypeEnum } from '../types/jb-chevron-type.enum';
import { JbChevronIconSizeEnum } from '../types/jb-chevron-icon-size.enum';
import { JbSelectPlaceholderPositionEnum } from '../types/jb-select-placeholder-position.enum';
import { JbFormFieldControlDirective } from '../forms/form-field-control.directive';
import { ErrorStateMatcher } from '../forms/error-state-matcher';
import { JbFormFieldContainerComponent } from '../jb-form-field-container/jb-form-field-container.component';
import { JbPopoverDirective } from '../jb-popover/jb-popover.directive';

let uniqueId = 0;

@Component({
  selector: 'jb-select',
  templateUrl: './jb-select.component.html',
  animations: [CHEVRON_ANIMATIONS.transformIcon],
  styleUrls: ['./jb-select.component.scss'],
  host: {
    class: 'flex flex-column',
  },
})
export class JbSelectComponent extends JbFormFieldControlDirective
  implements AfterContentInit, ControlValueAccessor, OnChanges, OnDestroy {
  get activeOptionIndex(): number {
    const activeOptionIndex = this.options
      .toArray()
      .findIndex((option) => option.getIsActive());
    return activeOptionIndex === -1 ? 0 : activeOptionIndex;
  }

  get value(): any {
    return this.data;
  }

  set value(value: any) {
    if (value && value !== this.data) {
      this.data = value;
      this.resetAllActiveOptions();
      this.updateActiveOption();
      this.onChange(value);
    }
  }

  // getting the maxWidth for standard select
  get standardMaxWidth(): number {
    return this.maxWidth ? this.maxWidth : 336;
  }

  // getting the maxWidth for simple select
  get simpleMaxWidth(): number {
    return this.maxWidth;
  }

  @ContentChildren(JbSelectOptionComponent)
  options: QueryList<JbSelectOptionComponent>;
  @ViewChild('selectElement') selectElement: ElementRef;
  @ViewChild('listbox') listbox: ElementRef;
  @ViewChild('anchor') popoverAnchor: JbPopoverDirective;

  @Input() type: JbChevronTypeEnum = JbChevronTypeEnum.standard;
  @Input() placeholder = '';
  @Input() isDisabled = false;
  @Input() visibleItemsBeforeScrolling: number;
  @Input() ariaDescribedBy: string;
  // @deprecated the placeholderPosition. It is no longer used and should be removed in a future release.
  @Input()
  placeholderPosition: JbSelectPlaceholderPositionEnum =
    JbSelectPlaceholderPositionEnum.default;

  // Inputs to control flyout
  @Input() fitToAnchor = false;
  @Input() horizontalFlipping = true;
  @Input() placement: 'bottom-start' | 'bottom-end' = 'bottom-start';
  @Input() maxWidth: number;
  @Input() autocomplete: string = null;

  @Output() selectChange = new EventEmitter<any>();

  isOpen = false;
  selectedOption = '';
  hasSelectedOption = false;
  isAriaHidden: boolean;
  isStandardType: boolean;
  isFocused = false;
  iconSize: string;
  listHeightPx = '0px';
  standardSelectItemMargin = 10; // adds 10px margin for each listItem
  focusedOptionIndex = 0;
  hoveredOptionIndex = -1;
  visibility = 'hidden';
  isMobileSubscription: Subscription;
  isMobile: boolean;
  autoCompleteValue = '';

  subscriptions = new Subscription();
  keyManager: ActiveDescendantKeyManager<JbSelectOptionComponent>;

  private data: any;
  private listId: string;

  constructor(
    private domService: JbDomService,

    @Optional()
    @Inject(forwardRef(() => JbFormFieldContainerComponent))
    container: JbFormFieldContainerComponent,
    @Optional()
    @Self()
    public ngControl: NgControl,
    @Optional() ngForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    defaultErrorStateMatcher: ErrorStateMatcher,
    private viewportService: JbViewPortService
  ) {
    super(
      container,
      ngControl,
      ngForm,
      parentFormGroup,
      defaultErrorStateMatcher
    );
  }

  ngAfterContentInit(): void {
    this.isStandardType = this.type === JbChevronTypeEnum.standard;
    this.setSelectValues();

    this.isMobileSubscription = this.viewportService
      .isMobile$()
      .subscribe((isMobileWidth) => {
        this.isMobile = isMobileWidth;
      });

    this.keyManager = new ActiveDescendantKeyManager(
      this.options
    ).withTypeAhead();

    const options$ = this.options.changes.pipe(startWith(this.options));

    setTimeout(() => {
      if (this.value) {
        this.updateActiveOption();
      } else {
        this.setFocusOptionIndex(0);
        this.setHoverOptionIndex(0);
      }
    });

    // styling relies on option type
    const listTypeSubscription = options$
      .pipe(delay(0))
      .subscribe((queryListInstance) => {
        queryListInstance.forEach((option) => option.setType(this.type));
      });

    // listen to value changes and writeValue
    const valueChangeSubscription = options$
      .pipe(
        switchMap((queryListInstance) =>
          merge(...queryListInstance.map((option) => option.valueChanged))
        )
      )
      .subscribe(this.setActive);

    // listen to blur and then trigger onTouched
    const onTouchedSubscription = options$
      .pipe(
        switchMap((queryListInstance) =>
          merge(...queryListInstance.map((option) => option.blur))
        )
      )
      .subscribe(() => this.onTouched());

    const mouseOverSubscription = options$
      .pipe(
        switchMap((queryListInstance) =>
          merge(...queryListInstance.map((option) => option.mouseOver))
        )
      )
      .subscribe(debounce(this.handleMouseMove, 10));

    const searchSubscription = options$
      .pipe(
        switchMap((queryListInstance) =>
          merge(...queryListInstance.map((option) => option.search))
        )
      )
      .subscribe(this.handleSearch);

    this.subscriptions.add(listTypeSubscription);
    this.subscriptions.add(valueChangeSubscription);
    this.subscriptions.add(onTouchedSubscription);
    this.subscriptions.add(mouseOverSubscription);
    this.subscriptions.add(searchSubscription);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.isStandardType = this.type === JbChevronTypeEnum.standard;
      this.setSelectValues();
    }
    if (changes.type || changes.visibleItemsBeforeScrolling) {
      // Clear the list height to force it to be recalculated
      this.setListHeightPx(0);
    }
    if (
      (changes.placement || changes.horizontalFlipping) &&
      this.popoverAnchor
    ) {
      this.popoverAnchor.scheduleUpdate();
    }
    if (changes.isDisabled && this.isDisabled && this.isOpen) {
      this.closeDropdownMenu();
    }
    this.listId = `jb-select-${uniqueId++}`;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.isMobileSubscription.unsubscribe();
  }

  handleAnchorKeydown(event: KeyboardEvent) {
    if (!this.isOpen) {
      switch (event.keyCode) {
        case DOWN_ARROW:
        case UP_ARROW:
          setTimeout(() => {
            this.popoverAnchor.toggle();
          });
          event.preventDefault();
          break;
        default:
          break;
      }
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (this.isOpen) {
      switch (event.keyCode) {
        case DOWN_ARROW:
          this.setFocusOptionIndex(this.getFocusIndexInBound(1));
          this.updateActiveDescendant(this.focusedOptionIndex);
          event.preventDefault();
          break;
        case UP_ARROW:
          this.setFocusOptionIndex(this.getFocusIndexInBound(-1));
          this.updateActiveDescendant(this.focusedOptionIndex);
          event.preventDefault();
          break;
        case ENTER:
          this.setActiveOption(this.options.toArray()[this.focusedOptionIndex]);
          this.focusOnOpenButton();
          event.preventDefault();
          break;
        case HOME:
          this.setFocusOptionIndex(0);
          this.updateActiveDescendant(this.focusedOptionIndex);
          event.preventDefault();
          break;
        case END:
          this.setFocusOptionIndex(this.options.length - 1);
          this.updateActiveDescendant(this.focusedOptionIndex);
          event.preventDefault();
          break;
        case TAB:
          this.closeDropdownMenu();
          this.resetActiveDescendant();
          break;
        case ESCAPE:
          this.closeDropdownMenu();
          this.resetActiveDescendant();
          this.focusOnOpenButton();
          break;
        case SPACE:
          event.preventDefault();
          break;
        default:
          break;
      }
      this.keyManager.onKeydown(event);
    }
  }

  handleKeyup(event: KeyboardEvent) {
    if (this.isOpen) {
      switch (event.keyCode) {
        case UP_ARROW:
        case DOWN_ARROW:
          this.scrollToFocusedOption();
          break;
        default:
          break;
      }
    }
  }

  handleButtonClick() {
    if (!this.isDisabled) {
      this.focusOnOpenButton();
      this.popoverAnchor.toggle();
    }
  }

  calculateListItemsHeight(): void {
    if (this.listbox.nativeElement.style.height !== '0px') {
      return;
    }

    const itemMargin = this.isStandardType ? this.standardSelectItemMargin : 0;
    const borderOffset = this.isStandardType ? 0 : 2;

    // listItems must be created from slice for IE11
    const listItems = Array.prototype.slice.call(
      this.listbox.nativeElement.children
    );

    const height = listItems
      .slice(0, this.visibleItemsBeforeScrolling)
      .reduce(
        (accum, curr) => accum + curr.scrollHeight + itemMargin,
        borderOffset
      );

    // To avoid flyout appear at a size or position that is not its final appearance, visibility is set to
    // "hidden" when select first opens. Here visibility hidden is cleared, so flyout will appear.
    this.setListHeightPx(height);
    this.visibility = null;
  }

  setListHeightPx(heightVal: number): void {
    this.listHeightPx = `${heightVal}px`;
  }

  // Setting the chevron icon size
  setSelectValues(): void {
    this.isStandardType
      ? (this.iconSize = JbChevronIconSizeEnum.medium)
      : (this.iconSize = JbChevronIconSizeEnum.small);
  }

  updateActiveOption(): void {
    if (this.options) {
      const option = this.findOptionByCurrentValue();
      this.setOptionItemToActive(option);
      this.setSelectedOptionName(option);
      this.hasSelectedOption = true;
    }
  }

  setSelectedOptionName(option: JbSelectOptionComponent): void {
    this.selectedOption = option.name;
    this.selectChange.emit(this.selectedOption);
  }

  findOptionByCurrentValue(): JbSelectOptionComponent {
    return this.options.find((option) => option.value === this.value);
  }

  setOptionItemToActive(option: JbSelectOptionComponent): void {
    option.setIsActive(true);
    option.setIsFocused(true);
    option.setIsHovered(true);
  }

  getOffsetDifference = (element) => element.offsetTop + element.offsetHeight;

  setHoverOptionIndex(index: number): void {
    this.hoveredOptionIndex = index;
    this.options.forEach((option, i) => {
      option.setIsHovered(this.hoveredOptionIndex === i);
    });
  }

  setFocusOptionIndex(index: number): void {
    this.focusedOptionIndex = index;
    this.setHoverOptionIndex(-1);
    this.options.forEach((option, i) => {
      option.setIsFocused(this.focusedOptionIndex === i);
    });
  }

  getFocusIndexInBound(modifier: number): number {
    const modifiedFocus = this.focusedOptionIndex + modifier;
    const focusBoundaries = (focus: number): number =>
      focus < 0 ? 0 : this.options.length - 1;
    return modifiedFocus < this.options.length && modifiedFocus >= 0
      ? modifiedFocus
      : focusBoundaries(modifiedFocus);
  }

  resetFocusedOptionIndex(): void {
    this.focusedOptionIndex = this.activeOptionIndex;
  }

  afterOpenedDropdownMenu(): void {
    if (this.isDisabled) {
      return;
    }

    this.resetFocusedOptionIndex();
    this.isAriaHidden = false;
    this.onTouched();

    setTimeout(() => {
      this.calculateListItemsHeight();
      this.listbox.nativeElement.focus({ preventScroll: true });
      this.updateActiveDescendant(this.focusedOptionIndex);
    });

    this.options.forEach((option, index) => {
      option.setOptionId(this.createOptionId(index));
    });

    this.isOpen = !this.isOpen;
  }

  afterClosedDropdownMenu(): void {
    this.isOpen = false;
    this.isAriaHidden = true;
  }

  closeDropdownMenu(): void {
    if (this.popoverAnchor) {
      // Typically the previous focused element would be the Select button,
      // which would clicked/focused to open the dropdown, so we pass false
      // to popover close, otherwise it will call focus() on popoveranchor again causing
      // it to open again since Select.focus() would open the Select dropdown again
      this.popoverAnchor.close(null, { focusOnPreviousElement: false });
    }
  }

  setActiveOption(option: JbSelectOptionComponent): void {
    this.resetAllActiveOptions();
    this.closeDropdownMenu();
    this.writeValue(option.value);
    option.setIsActive(true);
  }

  setActive = (newValue: any) => {
    this.options.forEach((option) => {
      if (option.name === newValue.name && option.value === newValue.value) {
        this.setActiveOption(option);
      }
    });

    this.focusOnOpenButton();
  };

  resetAllActiveOptions(): void {
    if (!this.options) {
      return;
    }
    this.options.forEach((option) => {
      option.setIsActive(false);
    });
  }

  createOptionId(index: number): string {
    return `${this.listId}-option-${index}`;
  }

  updateActiveDescendant(index: number): void {
    this.domService.callNativeMethod(
      this.listbox,
      'setAttribute',
      'aria-activedescendant',
      this.createOptionId(index)
    );
  }

  resetActiveDescendant(): void {
    this.domService.callNativeMethod(
      this.listbox,
      'setAttribute',
      'aria-activedescendant',
      ''
    );
  }

  handleMouseMove = (newValue: any) => {
    this.setFocusAndHoverToOption(newValue, false);
  };

  handleSearch = (newValue: any) => {
    this.setFocusAndHoverToOption(newValue, true);
  };

  handleBlur() {
    this.isFocused = false;
    if (!this.isOpen) {
      this.allowValidate();
    }
  }

  /** Form Control Overrides */

  // Called when the component changes. For this component, it'll be empty.
  // tslint:disable-next-line
  onChange = (value: any) => {};

  // Called when the component is touched/clicked. For this component, it'll be empty.
  // tslint:disable-next-line
  onTouched = () => {};

  // Permits Ng to update the model associated to the component.
  writeValue(value: any): void {
    if (this.data !== value) {
      this.value = value;
    }
  }

  // Registers a function to call when the corresponding model changes.
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  // Register a function to call when the component has been touched/clicked.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Disables the input
  setDisabledState(disabled: boolean): void {
    this.isDisabled = disabled;
    if (this.isDisabled && this.isOpen) {
      this.closeDropdownMenu();
    }
  }

  onAutoCompleteChange(event: Event) {
    // The autocomplete input is a hidden input that receives the autocomplete
    // from the browser, so that it can be passed to the select.
    const autoCompleteValue = (event.target as HTMLInputElement).value;
    if (!this.value && autoCompleteValue) {
      const selectOption = this.options.find(
        (option) => option.value === autoCompleteValue
      );
      if (selectOption) {
        this.setActive(selectOption);
        this.autoCompleteValue = autoCompleteValue;
      }
    }
  }

  private scrollToFocusedOption(): void {
    const element = this.listbox.nativeElement.children[
      this.focusedOptionIndex
    ];
    if (!element) {
      return;
    }
    if (
      this.listbox.nativeElement.offsetHeight <
      this.getOffsetDifference(element)
    ) {
      element.parentNode.scrollTop = element.offsetTop;
      return;
    }
    element.parentNode.scrollTop = element.scrollTop - element.offsetTop;
  }

  private focusOnOpenButton(): void {
    setTimeout(() => {
      this.selectElement.nativeElement.focus();
    });
  }

  private setFocusAndHoverToOption(newValue: any, scrollToFocus: boolean) {
    this.options.forEach((option, index) => {
      if (option.name === newValue.name && option.value === newValue.value) {
        this.setFocusOptionIndex(index);
        this.setHoverOptionIndex(index);
      }
    });
    if (scrollToFocus) {
      this.scrollToFocusedOption();
    }
  }
}
