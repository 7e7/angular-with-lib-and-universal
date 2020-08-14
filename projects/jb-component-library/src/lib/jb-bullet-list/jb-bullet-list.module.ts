import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbBulletListComponent } from './jb-bullet-list.component';
import { JbBulletListItemComponent } from './components/jb-bullet-list-item/jb-bullet-list-item.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbActionModule } from '../jb-action/jb-action.module';

@NgModule({
  imports: [CommonModule, JbIconModule, JbActionModule],
  declarations: [JbBulletListComponent, JbBulletListItemComponent],
  exports: [JbBulletListComponent, JbBulletListItemComponent],
})
export class JbBulletListModule {}
