import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbPopoverComponent } from './jb-popover.component';
import { JbPopoverInnerComponent } from './jb-popover-inner.component';
import { JbPopoverDirective } from './jb-popover.directive';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbCopyModule } from '../jb-copy/jb-copy.module';

@NgModule({
  imports: [A11yModule, CommonModule, JbIconModule, JbCopyModule],
  declarations: [
    JbPopoverComponent,
    JbPopoverInnerComponent,
    JbPopoverDirective,
  ],
  exports: [JbPopoverInnerComponent, JbPopoverComponent, JbPopoverDirective],
})
export class JbPopoverModule {}
