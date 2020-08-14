import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
  Inject,
  forwardRef,
  Optional,
  Self,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NgForm,
  FormGroupDirective,
  FormControl,
} from '@angular/forms';
import {
  isValid,
  format,
  isSameDay,
  parse,
  getYear,
  isWithinInterval,
  parseISO,
} from 'date-fns';
import { of, merge, Observable, combineLatest, Subject } from 'rxjs';
import { map, mapTo, startWith } from 'rxjs/operators';

import { JbFormFieldControlDirective } from '../../../forms/form-field-control.directive';
import { JbFormFieldContainerComponent } from '../../../jb-form-field-container/jb-form-field-container.component';
import { ErrorStateMatcher } from '../../../forms/error-state-matcher';
import { JbViewPortService } from '../../../jb-utils/utils.module';

import { anyTruthy } from '../../helpers/utils';

let uniqueId = 0;

@Component({
  selector: 'jb-date-picker-input',
  templateUrl: './jb-date-picker-input.component.html',
  styleUrls: ['./jb-date-picker-input.component.scss'],
  host: {
    class: 'w-100 db',
  },
})
export class JbDatePickerInputComponent extends JbFormFieldControlDirective
  implements ControlValueAccessor, OnInit {
  id = `jb-date-picker-input-id-${uniqueId++}`;

  @Input() label: string;
  // do not declare default dateFormat to allow date picker to override this
  @Input('dateFormat')
  // this setter manually updates the input value when custom format is set
  set dateFormat(value: string) {
    if (this.dateFormat !== value) {
      this._dateFormat = value;
      this.formatInputField(this.value);
    }
  }

  get dateFormat() {
    return this._dateFormat;
  }
  @Input() ariaDescribedBy: string;
  @Input() dateInputFormats = [
    'MM/dd/yy', // 1/03/19, 1/31/19, 1/3/19
    'MM/dd/yyyy', // 1/03/2019, 1/31/2019, 1/3/2019
    'MMMM dd yyyyy', // Jan 4 2019, jan 4 2019, Jan. 4, 2019, Jan. 04, 2019, January 4 2019
    'dd MMMM yyyyy', // 1 Nov 2020, also accepts 1 nov 2020 and 5 jan., 2019
    'yy-MM-dd', // 19-01-11
    'yyyyy-MM-dd', // 2019-01-11
    'EEEE MMMM dd yyyyy', // thursday jan 3 2019, mon jan 7 2019, m jan 7 2019, mo jan 7 2019
    'EEEE dd MMMM yyyyy', // thursday 3 jan 2019, mon 7 jan 2019, m 7 jan 2019, mo 7 jan 2019
    'MMMM dd', // nov 2, Nov 2, Nov. 2, Nov 02, November 2 (year is provided based on context)
    'dd MMMM', // 2 nov, 2 Nov, 2 Nov., 02 Nov, 2 November (year is provided based on context)
    'MM/dd', // 11/02 (year is provided based on context)
    'EEEE dd MMMM', // monday 7 january, mon 7 jan, mo 7 jan, m 7 jan (year is provided based on context)
    'EEEE MMMM dd', // monday january 7, mon jan 7, mo jan 7, m jan 7 (year is provided based on context)
  ];
  @Input() minDate: Date;
  @Input() maxDate: Date;

  @Output() valueChange = new EventEmitter<Date>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();
  @Output() tabbed = new EventEmitter<{ forward: boolean }>();
  @Output() enterPressed = new EventEmitter<void>();
  @Output() arrowDown = new EventEmitter<void>();

  @ViewChild('input', { static: true }) input: ElementRef;

  value: Date;
  isDatePickerDisabled: boolean;
  // We only have both willFocus$ and isFocused$, because it was unclear how to merge
  // them together. (isFocused is based on both willFocus and blur.emit). This is a
  // refactoring opportunity (CL-1716).
  willFocus$ = new Subject<boolean>();
  isFocused$: Observable<boolean> = of(false);
  isLabelShrunk$: Observable<boolean> = of(false);

  get isValidDate() {
    return this.value ? isValid(this.value) : false;
  }

  // tslint:disable-next-line: variable-name
  private _dateFormat: string;

  constructor(
    public viewportService: JbViewPortService,

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

  ngOnInit() {
    super.ngOnInit();
    if (this.ngControl) {
      const validators = this.ngControl.control.validator
        ? [this.validate.bind(this), this.ngControl.control.validator]
        : [this.validate.bind(this)];

      this.ngControl.control.setValidators(validators);
      this.ngControl.control.updateValueAndValidity();
    }

    this.isFocused$ = merge(
      this.willFocus$.pipe(mapTo(true)),
      this.blur.pipe(mapTo(false))
    ).pipe(startWith(false));

    const hasValue$ = this.valueChange.pipe(startWith(this.value));

    this.isLabelShrunk$ = combineLatest([this.isFocused$, hasValue$]).pipe(
      map(anyTruthy)
    );
  }

  @HostListener('keydown.arrowdown', ['$event'])
  handleArrowDown(event: KeyboardEvent) {
    this.arrowDown.emit();
    event.preventDefault();
  }

  @HostListener('keydown.enter')
  handleEnter() {
    this.enterPressed.emit();
  }

  @HostListener('keydown.shift.tab', ['$event'])
  @HostListener('keydown.tab', ['$event'])
  handleTab(event: KeyboardEvent) {
    const forward = !event.shiftKey;
    this.tabbed.emit({ forward });
  }

  get dateDisplayFormat() {
    return this.dateFormat || 'MM/dd/yyyy';
  }

  blurElement(): void {
    this.input.nativeElement.blur();
  }
  setFocus(options = { emit: true }): void {
    this.input.nativeElement.focus();
    this.willFocus$.next(true);

    // focus.emit is used to open the flyout that wraps the calendar
    // closeCalendarAndFocusActiveInput() calls setFocus with {emit: false}
    if (options.emit) {
      this.focus.emit();
    }
  }

  /** Form Control Overrides */

  // Called when the component changes. For this component, it'll be empty.
  // tslint:disable-next-line
  onChange = (value: any) => {};

  // Called when the component is touched/clicked. For this component, it'll be empty.
  // tslint:disable-next-line
  onTouched = () => {};

  // remove extra whitespace and punctuation to make the date easier to parse
  transformDateString(value: string): string {
    const punctuationRegEx = /[,.]/g;
    let transformed = value.replace(punctuationRegEx, ' ');
    transformed = transformed.replace(/ +(?= )/g, '');
    return transformed;
  }

  getYearFromInput(inputDate, parsedDate, dateFormat): Date {
    if (this.minDate && this.maxDate) {
      // if the min and max dates have the same year, we use that
      const minYear = getYear(this.minDate);
      const maxYear = getYear(this.maxDate);
      if (minYear === maxYear) {
        return parse(inputDate, dateFormat, this.maxDate);
      }
      // We will never span more than two years since we only support 9 months
      const minDate = parse(inputDate, dateFormat, this.minDate);
      if (
        isValid(minDate) &&
        isWithinInterval(minDate, { start: this.minDate, end: this.maxDate })
      ) {
        return minDate;
      }
      const maxDate = parse(inputDate, dateFormat, this.maxDate);
      if (isValid(maxDate)) {
        return maxDate;
      }
    }
    return parsedDate;
  }

  // Runs when typing on input
  onValueChange(value: string): void {
    this.writeValue(this.dateFromValue(value));
  }

  validate({ value }: FormControl) {
    if (value) {
      return (
        !isValid(value) && {
          invalidFormat: true,
        }
      );
    }
    return null;
  }

  // Update value inside input (typing and selecting from calendar)
  // Permits Ng to update the model associated to the component.
  writeValue(value: any): void {
    const isDate = value instanceof Date;
    const date = value !== null ? new Date(value) : value;
    const dateValid = value !== null ? isValid(date) : false;

    const inputContent = dateValid ? date : value;
    this.formatInputField(inputContent);
    if (isDate && this.value && isSameDay(this.value, date)) {
      return;
    }
    this.value = date;
    this.valueChange.emit(this.value);
    this.onChange(this.value);
    this.onTouched();
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
    this.isDatePickerDisabled = disabled;
  }

  handleButtonClick(): void {
    this.focus.emit();
  }

  private dateFromValue(value?: string): Date | string {
    if (!value) {
      return '';
    }
    const inputDate = this.transformDateString(value);
    // parse each the input against the dateInputFormats and if we have a match
    // write the value.  If there is not match, ignore the input.
    for (const dateFormat of this.dateInputFormats) {
      try {
        const newDate = parse(inputDate, dateFormat, new Date());
        if (isValid(newDate)) {
          if (dateFormat.indexOf('y') === -1) {
            // If the year hasn't been provided it has defaulted to the current year,
            // so we need to provide some extra logic based on the available Months
            return this.getYearFromInput(inputDate, newDate, dateFormat);
          }
          return newDate;
        }
      } catch (err) {
        // date-fns returns a RangeError for invalid input, so we catch it here
        // to prevent it from locking up the input.
        console.error(err.message);
        continue;
      }
    }
    return value;
  }

  // Updates value on input with correct format
  private formatInputField(value?: Date | string): void {
    const normalizedValue = !value ? '' : value;
    const date =
      typeof normalizedValue === 'string'
        ? parseISO(normalizedValue)
        : normalizedValue;
    const formattedValue = isValid(date)
      ? format(date, this.dateDisplayFormat)
      : normalizedValue;
    this.input.nativeElement.value = formattedValue;
  }
}
