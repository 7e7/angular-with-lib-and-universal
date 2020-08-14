import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbTooltipComponent } from './jb-tooltip.component';
import { JbInfoTooltipComponent } from '../jb-info-tooltip/jb-info-tooltip.component';
import { JbIconModule } from '../../jb-icon/jb-icon.module';
import { JbCopyModule } from '../../jb-copy/jb-copy.module';
import { JbPopoverModule } from '../jb-popover.module';

@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    JbIconModule,
    JbCopyModule,
    JbPopoverModule,
  ],
  declarations: [JbTooltipComponent, JbInfoTooltipComponent],
  exports: [JbTooltipComponent, JbInfoTooltipComponent],
})
export class JbTooltipModule {}
