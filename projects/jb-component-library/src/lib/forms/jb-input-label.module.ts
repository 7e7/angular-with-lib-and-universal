import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbInputLabelDirective } from './jb-input-label.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [JbInputLabelDirective],
  exports: [JbInputLabelDirective],
})
export class JbInputLabelModule {}
