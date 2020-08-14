import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbSliderComponent } from './jb-slider.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JbSliderInputDirective } from './jb-slider-input.directive';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  declarations: [JbSliderComponent, JbSliderInputDirective],
  exports: [JbSliderComponent, JbSliderInputDirective],
})
export class JbSliderModule {}
