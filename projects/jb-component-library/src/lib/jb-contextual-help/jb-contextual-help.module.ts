import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JbIconModule } from './../jb-icon/jb-icon.module';

import { JbContextualHelpComponent } from './jb-contextual-help.component';
import { JbContextualHelpHeaderModule } from './jb-contextual-help-header/jb-contextual-help-header.module';
import { JbContextualHelpContentModule } from './jb-contextual-help-content/jb-contextual-help-content.module';
@NgModule({
  imports: [
    CommonModule,
    JbIconModule,
    JbContextualHelpHeaderModule,
    JbContextualHelpContentModule,
  ],
  declarations: [JbContextualHelpComponent],
  exports: [
    JbContextualHelpComponent,
    JbContextualHelpHeaderModule,
    JbContextualHelpContentModule,
  ],
  providers: [],
})
export class JbContextualHelpModule {}
