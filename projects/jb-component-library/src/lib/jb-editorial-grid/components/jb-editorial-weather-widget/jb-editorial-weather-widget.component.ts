import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherWidgetItem } from '../../types/weather-widget-item.type';
@Component({
  selector: 'jb-editorial-weather-widget',
  templateUrl: './jb-editorial-weather-widget.component.html',
  styleUrls: ['./jb-editorial-weather-widget.component.scss'],
  host: {
    class: 'relative db w-100 w-50-m w-third-l',
  },
})
export class JbEditorialWeatherWidgetComponent implements OnInit {
  @Input() destinationName = '';
  @Input() tagline = 'Monthly average temperature';
  @Input() weatherData: WeatherWidgetItem[];
  @Input() control: FormControl;

  internalFormControlValue: string;
  monthlyTemperature: number;
  month: string;

  get formControlValue(): string {
    return this.control.value;
  }

  set formControlValue(value: string) {
    this.control.setValue(value);
  }

  private readonly MONTHS = {
    jan: 'January',
    feb: 'February',
    mar: 'March',
    apr: 'April',
    may: 'May',
    jun: 'June',
    jul: 'July',
    aug: 'August',
    sep: 'September',
    oct: 'October',
    nov: 'November',
    dec: 'December',
  };

  ngOnInit(): void {
    this.internalFormControlValue = this.formControlValue;
  }

  updateMonth(): void {
    this.formControlValue = this.internalFormControlValue;
    this.monthlyTemperature = this.getWeatherWidgetItemByMonth(
      this.formControlValue
    ).average;
    this.month = this.getMonth(this.formControlValue);
  }

  getWeatherWidgetItemByMonth(month: string): WeatherWidgetItem {
    return this.weatherData.find((item) => item.month === month);
  }

  getMonth(shortName: string): string {
    return this.MONTHS[shortName];
  }
}
