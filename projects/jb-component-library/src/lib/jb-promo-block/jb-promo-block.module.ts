import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbPromoBlockComponent } from './jb-promo-block.component';
import { JbImageModule } from '../jb-image/jb-image.module';
import { JbPromoCardComponent } from './jb-promo-card/jb-promo-card.component';
import { JbLinkWithRouterModule } from '../jb-link/jb-link/jb-link-with-router.module';
import { JbSrOnlyModule } from '../jb-sr-only/jb-sr-only.module';
import { JbCopyModule } from '../jb-copy/jb-copy.module';

@NgModule({
  imports: [
    CommonModule,
    JbImageModule,
    JbLinkWithRouterModule,
    JbSrOnlyModule,
    JbCopyModule,
  ],
  declarations: [JbPromoBlockComponent, JbPromoCardComponent],
  exports: [JbPromoBlockComponent, JbPromoCardComponent],
})
export class JbPromoBlockModule {}
