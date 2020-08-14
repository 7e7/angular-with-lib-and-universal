import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbLinkWithRouterComponent } from './jb-link-with-router.component';
import { RouterModule } from '@angular/router';
import { JbSrOnlyModule } from '../../jb-sr-only/jb-sr-only.module';

@NgModule({
  imports: [CommonModule, RouterModule, JbSrOnlyModule],
  declarations: [JbLinkWithRouterComponent],
  exports: [JbLinkWithRouterComponent],
})
export class JbLinkWithRouterModule {}
