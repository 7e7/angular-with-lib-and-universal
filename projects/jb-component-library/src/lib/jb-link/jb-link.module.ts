import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbActionLinkModule } from './jb-action-link/jb-action-link.module';
import { JbInlineLinkModule } from './jb-inline-link/jb-inline-link.module';
import { JbStandAloneLinkModule } from './jb-standalone-link/jb-standalone-link.module';
import { JbLinkWithRouterModule } from './jb-link/jb-link-with-router.module';

@NgModule({
  imports: [
    CommonModule,
    JbActionLinkModule,
    JbInlineLinkModule,
    JbStandAloneLinkModule,
    JbLinkWithRouterModule,
  ],
  exports: [
    JbActionLinkModule,
    JbInlineLinkModule,
    JbStandAloneLinkModule,
    JbLinkWithRouterModule,
  ],
})
export class JbLinkModule {}
