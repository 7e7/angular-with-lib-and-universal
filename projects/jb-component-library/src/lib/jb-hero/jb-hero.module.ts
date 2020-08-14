import { NgModule } from '@angular/core';

import { JbHeroComponent } from './jb-hero.component';
import { JbHeroSecondaryComponent } from './jb-hero-secondary/jb-hero-secondary.component';
import { JbBreadcrumbsModule } from '../jb-breadcrumbs/jb-breadcrumbs.module';
import { JbImageModule } from '../jb-image/jb-image.module';
import { JbIconModule } from '../jb-icon/jb-icon.module';

@NgModule({
  declarations: [JbHeroComponent, JbHeroSecondaryComponent],
  exports: [JbHeroComponent, JbHeroSecondaryComponent],
  imports: [JbBreadcrumbsModule, JbImageModule, JbIconModule],
})
export class JbHeroModule {}
