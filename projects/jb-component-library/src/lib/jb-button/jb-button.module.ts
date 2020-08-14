import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JbIconModule } from './../jb-icon/jb-icon.module';
import { JbButtonDirective } from './jb-button.directive';
import { JbButtonLoaderComponent } from './jb-button-loader/jb-button-loader.component';
import { JbDomService } from '../jb-utils/services/dom.service';
import { JbButtonComponent } from './jb-button.component';

@NgModule({
  imports: [CommonModule, JbIconModule],
  declarations: [JbButtonDirective, JbButtonLoaderComponent, JbButtonComponent],
  exports: [JbButtonDirective, JbButtonLoaderComponent, JbButtonComponent],
  providers: [JbDomService],
  entryComponents: [JbButtonLoaderComponent],
})
export class JbButtonModule {}
