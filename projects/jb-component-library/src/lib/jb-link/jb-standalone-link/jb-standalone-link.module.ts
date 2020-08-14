import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbIconModule } from '../../jb-icon/jb-icon.module';
import { JbCopyModule } from '../../jb-copy/jb-copy.module';
import { JbLinkWithRouterModule } from '../jb-link/jb-link-with-router.module';
import { StandaloneLinkDirective } from './jb-standalone-link.directive';

@NgModule({
  imports: [CommonModule, JbIconModule, JbCopyModule, JbLinkWithRouterModule],
  declarations: [StandaloneLinkDirective],
  exports: [StandaloneLinkDirective],
})
export class JbStandAloneLinkModule {}
