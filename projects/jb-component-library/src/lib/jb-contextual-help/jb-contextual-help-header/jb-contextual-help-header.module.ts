import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbIconModule } from '../../jb-icon/jb-icon.module';

import { JbContextualHelpHeaderComponent } from './jb-contextual-help-header.component';

@NgModule({
  imports: [CommonModule, JbIconModule],
  declarations: [JbContextualHelpHeaderComponent],
  exports: [JbContextualHelpHeaderComponent],
})
export class JbContextualHelpHeaderModule {}
