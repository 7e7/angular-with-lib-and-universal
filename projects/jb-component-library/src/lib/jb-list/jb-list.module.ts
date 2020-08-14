import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbListComponent } from './jb-list.component';
import { JbListItemsGroupComponent } from './jb-list-items-group/jb-list-items-group.component';
import { JbListItemComponent } from './jb-list-item/jb-list-item.component';
import { JbDividerModule } from '../jb-divider/jb-divider.module';

import { JbStandAloneLinkModule } from '../jb-link/jb-standalone-link/jb-standalone-link.module';
import { JbCopyModule } from '../jb-copy/jb-copy.module';

@NgModule({
  imports: [
    CommonModule,
    JbStandAloneLinkModule,
    JbDividerModule,
    JbCopyModule,
  ],
  declarations: [
    JbListComponent,
    JbListItemsGroupComponent,
    JbListItemComponent,
  ],
  exports: [JbListComponent, JbListItemsGroupComponent, JbListItemComponent],
})
export class JbListModule {}

export * from './types/list.type';
