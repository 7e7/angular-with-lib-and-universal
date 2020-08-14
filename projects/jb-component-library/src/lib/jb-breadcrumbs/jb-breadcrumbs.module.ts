import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbUtilsModule } from '../jb-utils/utils.module';

import { JbBreadcrumbsComponent } from './jb-breadcrumbs.component';

@NgModule({
  imports: [CommonModule, JbIconModule, JbUtilsModule],
  declarations: [JbBreadcrumbsComponent],
  exports: [JbBreadcrumbsComponent],
})
export class JbBreadcrumbsModule {}

export * from './types/breadcrumbs-item.type';
export * from './types/breadcrumbs-parent-page.type';
