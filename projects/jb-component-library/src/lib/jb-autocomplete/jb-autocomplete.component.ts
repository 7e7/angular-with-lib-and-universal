import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  OnInit,
  OnChanges,
  OnDestroy,
  Optional,
  ViewChild,
  Self,
  DoCheck,
  Inject,
  forwardRef,
  SimpleChanges,
} from '@angular/core';
import { JbTypeAheadOption } from './types/jb-typeahead-option.type';
import { BREAKPOINTS } from '../jb-utils/breakpoints.constant';
import { containsWordAndPunctuation } from '../jb-utils/string.functions';
import { getListItemId } from './types/list-item-id.functions';
import { JbTypeAheadInputComponent } from './components/jb-typeahead-input/jb-typeahead-input.component';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { JbCity } from './types/jb-city.interface';
import { ErrorStateMatcher } from '../forms/error-state-matcher';
import { JbViewPortService } from '../jb-utils/services/viewport.service';
import { KeyboardKey } from '../jb-utils/keyboard-key.enum';
import { JbFormFieldControlDirective } from '../forms/form-field-control.directive';
import { JbFormFieldContainerComponent } from '../jb-form-field-container/jb-form-field-container.component';
import { JbPopoverDirective } from '../jb-popover/jb-popover.directive';
import { JbScrollingCitiesTypeaheadListComponent } from './components/jb-scrolling-cities-typeahead-list/jb-scrolling-cities-typeahead-list.component';

let uniqueId = 0;

// Similar to Javascript's Math modulo n % m, but only returns positive numbers
// Useful for cycling through things
function mod(n, m) {
  return ((n % m) + m) % m;
}

@Component({
  selector: 'jb-autocomplete',
  styleUrls: ['./jb-autocomplete.component.scss'],
  templateUrl: './jb-autocomplete.component.html',
})
export class JbAutocompleteComponent extends JbFormFieldControlDirective
  implements OnInit, OnChanges, OnDestroy, DoCheck, ControlValueAccessor {
  get activeOption(): JbTypeAheadOption {
    return this.filteredOptions[this.activeOptionIndex];
  }

  get isPopUpOptionFocused(): boolean {
    return this.activeOptionIndex === this.filteredOptions.length;
  }
  readonly MOBILE_SCREEN_WIDTH = BREAKPOINTS.mobile_max;

  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('input') input: JbTypeAheadInputComponent;
  @ViewChild('anchor') popoverAnchor: JbPopoverDirective;
  @ViewChild('scrollingCitiesList')
  scrollingList: JbScrollingCitiesTypeaheadListComponent;

  @Input() allOptions: string[] | JbCity[];
  @Input() label: string;
  @Input() modalLinkText: string;
  @Input() isMaxWidth = false;
  @Input() ariaDescribedBy: string;
  @Input() hasDynamicData = false;
  @Input() disableFilter = false;

  @Output() modalLinkClicked = new EventEmitter();
  @Output()
  optionSelected: EventEmitter<JbTypeAheadOption> = new EventEmitter();
  @Output() queryChange: EventEmitter<string> = new EventEmitter();

  isScrollingCityVariant = false;

  viewControl = new FormControl();
  control = new FormControl();
  filteredOptions: JbTypeAheadOption[] = [];
  activeOptionIndex = -1;
  isOnlyOneMatchFound: boolean;

  listId: string;
  hideList = true;
  inputFocused = false;
  keyPressed = false;
  isMobile: boolean;

  private isMobileSubscription: Subscription;
  private valueChangesSubscription: Subscription;

  constructor(
    private viewportService: JbViewPortService,

    @Optional()
    @Inject(forwardRef(() => JbFormFieldContainerComponent))
    container: JbFormFieldContainerComponent,
    @Optional()
    @Self()
    public ngControl: NgControl,
    @Optional() ngForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    defaultErrorStateMatcher: ErrorStateMatcher
  ) {
    super(
      container,
      ngControl,
      ngForm,
      parentFormGroup,
      defaultErrorStateMatcher
    );
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onChange = (_: any) => undefined;
  onTouched = () => undefined;

  ngOnInit(): void {
    super.ngOnInit();

    this.isMobileSubscription = this.viewportService
      .isMobile$()
      .subscribe((isMobileWidth) => (this.isMobile = isMobileWidth));

    this.valueChangesSubscription = this.viewControl.valueChanges.subscribe(
      (query) => {
        this.onInputValueChanges(query);
        this.queryChange.emit(query);
      }
    );

    this.filteredOptions = this.allOptions;
    this.listId = `jb-autocomplete-${uniqueId++}`;
    this.isScrollingCityVariant = typeof this.allOptions[0] === 'object';

    // check if viewControl contains an initial value thats not reflected in filtered options
    if (this.viewControl.value && !this.control.value) {
      this.setValue(this.viewControl.value);
      this.activeOptionIndex = this.filteredOptions.indexOf(
        this.viewControl.value
      );
      this.updateFilteredAndActiveOptions(this.viewControl.value);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // setTimeout is required because onInputValueChanges has to be called after viewInit
    if (this.hasDynamicData && changes.allOptions) {
      setTimeout(() => this.onInputValueChanges(this.viewControl.value));
    }
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
    this.isMobileSubscription.unsubscribe();
  }

  showDropdown(): void {
    if (this.isScrollingCityVariant && this.isMobile) {
      this.modalLinkClicked.emit();

      return;
    }

    this.hideList = false;
    this.inputFocused = true;
    // Sets the active descendant for screen reader; applies for the first item when it opens
    if (!this.activeOption) {
      // Set timeout is required for the screen reader to start reading the input box
      setTimeout(() => {
        this.updateActiveDescendant(this.activeOptionIndex);
      }, 150);
    }
    this.setFirstFilteredOptionToActive();
  }

  hideDropdown(): void {
    this.hideList = true;
    this.inputFocused = false;

    // set activeOption to value if only one match is showing when user loses focus
    if (this.isOnlyOneMatchFound) {
      this.writeValue(this.activeOption);
    }

    // user typed something invalid; clear selection but preserve query
    if (
      this.isScrollingCityVariant &&
      this.viewControl.value !== this.getViewValue(this.activeOption)
    ) {
      this.setValue(null);
    }
    this.resetActiveDescendant();
  }

  @HostListener('keydown', ['$event'])
  keyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case KeyboardKey.ArrowDown:
      case KeyboardKey.ArrowDownIE:
        event.preventDefault();
        this.keyPressed = true;
        this.setActiveOptionByIndex(this.getNextActiveOptionIndex());
        break;
      case KeyboardKey.ArrowUp:
      case KeyboardKey.ArrowUpIE:
        event.preventDefault();
        this.keyPressed = true;
        this.setActiveOptionByIndex(this.getNextActiveOptionIndex(-1));
        break;
      case KeyboardKey.Backspace:
        return this.popoverAnchor.open();
      case KeyboardKey.Tab:
        this.selectOptionAndHideDropdown(this.activeOption);
        break;
      case KeyboardKey.Enter:
        if (!this.hideList) {
          // if list is shown, an option will be selected;
          // prevent form submit on enter press
          event.preventDefault();
        }
        break;
      default:
        break;
    }
  }

  // Use keyup event to avoid interference with keydown events of external components.
  // Eg, when a modal responds to Enter keydown event, it will automatically close the modal
  @HostListener('keyup', ['$event'])
  keyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case KeyboardKey.Enter:
        this.selectOptionAndHideDropdown(this.activeOption);
        break;
      default:
        this.keyPressed = false;
        break;
    }
  }

  selectOptionAndHideDropdown(selectedOption: JbTypeAheadOption): void {
    if (this.isPopUpOptionFocused) {
      this.modalLinkClicked.emit();
      return;
    }
    this.writeValue(selectedOption);
    this.popoverAnchor.close(null, { focusOnPreviousElement: false });
  }

  setActiveOptionByIndex(index: number): void {
    this.updateActiveDescendant(index);
    this.activeOptionIndex = index;
    if (this.keyPressed && this.scrollingList) {
      this.scrollingList.scrollToIndex(this.activeOptionIndex);
    }
  }

  writeValue(value: JbTypeAheadOption) {
    const viewValue = this.getViewValue(value);

    if (this.viewControl.value === viewValue) {
      return;
    }

    this.viewControl.setValue(viewValue);
    this.setValue(value);
  }

  /** Assigns a callback to onChange property that is fired on the change event */
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  /**  Assigns a callback to the onTouched property */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** Helpers */
  private checkForExactlyOneMatch = (match: any[]) => {
    this.isOnlyOneMatchFound = match.length === 1;
  };

  private getFilteredOptions = (query: string): JbTypeAheadOption[] =>
    this.isScrollingCityVariant
      ? this.filterCityValue((city: JbCity) =>
          containsWordAndPunctuation(query)(city.name)
        )
      : this.filterCityValue((text: string) =>
          containsWordAndPunctuation(query)(text)
        );

  private filterCityValue = (query: any): JbTypeAheadOption[] => {
    const filteredVals = (this.allOptions as JbTypeAheadOption[]).filter(query);
    this.checkForExactlyOneMatch(filteredVals);
    return filteredVals;
  };

  private getViewValue(option: JbTypeAheadOption) {
    return option ? (option as JbCity).name || option : option;
  }

  private onInputValueChanges = (query: string): void => {
    this.resetActiveDescendant();
    this.updateFilteredAndActiveOptions(query);

    if (!this.isScrollingCityVariant) {
      this.setValue(query);
    }
  };

  /** Cycles forward/backward the next active option index,
   *  returning to the beginning once the end is reached.
   */
  private getNextActiveOptionIndex(step: -1 | 1 = 1): number {
    const optionsLength = this.isScrollingCityVariant
      ? this.filteredOptions.length + 1
      : this.filteredOptions.length;

    const result = mod(this.activeOptionIndex + step, optionsLength);
    const isLastItem =
      result === 0 && this.activeOptionIndex + step === optionsLength;
    const isFirstItem =
      result === optionsLength - 1 && this.activeOptionIndex + step === -1;
    // Prevents cycling through the list of option items
    const newActiveOptionIndex = isLastItem
      ? optionsLength - 1
      : isFirstItem
      ? 0
      : result;

    return newActiveOptionIndex;
  }

  private resetActiveDescendant(): void {
    this.input.setActiveDescendant('');
  }

  private updateActiveDescendant(index: number): void {
    this.input.setActiveDescendant(getListItemId(this.listId)(index));
  }

  private updateFilteredAndActiveOptions(query: string) {
    const previousActiveOption = this.activeOption;

    this.filteredOptions = this.disableFilter
      ? this.allOptions
      : this.getFilteredOptions(query);

    if (this.filteredOptions.includes(previousActiveOption)) {
      // filteredOptions changed; find new index of active options
      this.activeOptionIndex = this.filteredOptions.findIndex(
        (option) => option === previousActiveOption
      );
    } else {
      this.setFirstFilteredOptionToActive();
    }
  }

  private setFirstFilteredOptionToActive(): void {
    this.activeOptionIndex = 0;
  }

  /** Sets value of control without setting view value.
   *  To set both view value and value, use writeValue instead.
   */
  private setValue(value: JbTypeAheadOption) {
    this.optionSelected.emit(value);
    this.onChange(value);
  }
}
