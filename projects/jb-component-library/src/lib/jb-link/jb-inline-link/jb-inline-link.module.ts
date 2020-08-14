import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbIconModule } from '../../jb-icon/jb-icon.module';
import { JbLinkWithRouterModule } from '../jb-link/jb-link-with-router.module';
import { InlineLinkDirective } from './jb-inline-link.directive';

@NgModule({
  imports: [CommonModule, JbIconModule, JbLinkWithRouterModule],
  declarations: [InlineLinkDirective],
  exports: [InlineLinkDirective],
})
export class JbInlineLinkModule {}
