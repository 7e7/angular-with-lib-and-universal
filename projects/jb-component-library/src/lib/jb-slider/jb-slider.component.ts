import {
  Component,
  Input,
  OnChanges,
  ContentChild,
  Inject,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterContentInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { COLORS } from '../jb-utils/colors.constant';
import { JbSliderInputDirective } from './jb-slider-input.directive';

@Component({
  selector: 'jb-slider',
  templateUrl: './jb-slider.component.html',
  styleUrls: ['./jb-slider.component.scss'],
  host: { class: 'flex relative pv3' },
})
export class JbSliderComponent implements OnChanges, AfterContentInit {
  @Input() inputId: String;
  @Input() minValue: number;
  @Input() maxValue: number;
  @Input() minVisible: number;
  @Input() maxVisible: number;
  @Input() stepSize = 1;
  @Input() isDisabled = false;
  @Input() isRange = false;

  @ContentChild(NgControl) ngControl: any;

  @ContentChild(JbSliderInputDirective) inputTextField: any;
  @ViewChild('JbSlider', { static: true }) el: ElementRef;

  /** Variable to keep track of the value */
  value: number;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: any) {
    // set initial value to minvalue
    if (changes.minValue.firstChange && !this.value) {
      this.value = this.minValue;
      this.updateLowerFillColor();
    }

    if (this.minValue > this.maxValue) {
      console.warn('The Minimum value is greater than the Maximum value');
      this.isDisabled = true;
    }
  }

  ngAfterContentInit(): void {
    this.setVisibilityBounds();

    // handle reactive and template forms
    if (this.ngControl) {
      const inputValue =
        this.ngControl.value || this.ngControl.viewModel || this.minValue;

      this.updateSliderValue(inputValue);
    }
  }

  updateSliderValue(value: any): void {
    if (!this.isRange) {
      this.isValueInSelectionRange(value)
        ? this.changeValue(value)
        : this.changeValue(this.minValue);
    }
  }

  handleChange(event) {
    this.changeValue(event.target.value, event.target);
  }

  // Method that updates on input
  changeValue(value: any, componentEl?): void {
    // ignore changes not in selection range
    if (!this.isValueInSelectionRange(value)) {
      value = this.getInputResetValue(value);
    }

    this.value = value;
    this.updateLowerFillColor();
    this.setInputValue(this.value, componentEl);
  }

  /** This function updates the color of the slider-track */
  updateLowerFillColor(): void {
    const toPercent = (fraction) => fraction * 100;
    const minVisible = this.minVisible ? this.minVisible : this.minValue;
    const maxVisible = this.maxVisible ? this.maxVisible : this.maxValue;
    const visibleRange = maxVisible - minVisible;
    const belowSelectionRange = this.minValue - minVisible;
    const aboveSelectionRange = maxVisible - this.maxValue;

    // position of where blue and grey can begin in clider background
    const startPercent = toPercent(belowSelectionRange / visibleRange);
    const endPercent = 100 - toPercent(aboveSelectionRange / visibleRange);

    // position of the thumb on the slider, in percent
    const thumbPercent = toPercent(
      (this.value - (this.minValue - belowSelectionRange)) / visibleRange
    );

    if (this.renderer.setStyle) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background',
        `linear-gradient(to right,
          ${COLORS.royalBlue} 0%,
          ${COLORS.royalBlue} ${startPercent}%,
          ${COLORS.royalBlue} ${thumbPercent}%,
          ${COLORS.mediumGray} ${thumbPercent}%,
          ${COLORS.mediumGray} ${endPercent}%,
          ${COLORS.mediumGray} 100%)`
      );
    }
  }

  setVisibilityBounds(): void {
    if (!this.minVisible) {
      this.minVisible = this.minValue;
    } else if (Number(this.minValue) < Number(this.minVisible)) {
      console.warn('Visible range must be greater or equal to valid values');
      this.minVisible = this.minValue;
    }

    if (!this.maxVisible) {
      this.maxVisible = this.maxValue;
    } else if (Number(this.maxVisible) < Number(this.maxValue)) {
      console.warn('Visible range must be greater or equal to valid values');
      this.maxVisible = this.maxValue;
    }
  }

  private getInputResetValue(input: number): number {
    if (Number(input) < this.minValue) {
      return this.minValue;
    }
    if (Number(input) > this.maxValue) {
      return this.maxValue;
    }
    return input;
  }

  private setInputValue(value: number, componentEl?): void {
    // update the component value when passed in events to keep thumb in valid values range
    if (componentEl && componentEl.value) {
      componentEl.value = value;
    }

    if (this.inputTextField) {
      const inputDirective = this.inputTextField.el.nativeElement;
      inputDirective.value = value;

      const inputEvent = this.document.createEvent('Event');
      inputEvent.initEvent('input', true, true);

      inputDirective.dispatchEvent(inputEvent);
    }

    if (this.ngControl) {
      this.ngControl.valueAccessor.writeValue(value);
      this.ngControl.valueAccessor.onChange(value);
    }
  }

  private isValueInSelectionRange(value): boolean {
    return (
      Number(value) >= Number(this.minValue) &&
      Number(value) <= Number(this.maxValue)
    );
  }
}
