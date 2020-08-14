import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbExpandableButtonComponent } from './jb-expandable-button.component';
import { JbExpandableIndicatorComponent } from './jb-expandable-indicator.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';

@NgModule({
  imports: [CommonModule, JbIconModule],
  declarations: [JbExpandableButtonComponent, JbExpandableIndicatorComponent],
  exports: [JbExpandableButtonComponent, JbExpandableIndicatorComponent],
})
export class JbExpandableButtonModule {}
