import { JbAvatarModule } from './../jb-avatar/jb-avatar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbAvatarCardComponent } from './jb-avatar-card.component';
import { JbAvatarCardSeatComponent } from './components/jb-avatar-card-seat/jb-avatar-card-seat.component';
import { JbAvatarCardNameComponent } from './components/jb-avatar-card-name/jb-avatar-card-name.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbSrOnlyModule } from '../jb-sr-only/jb-sr-only.module';

@NgModule({
  imports: [CommonModule, JbAvatarModule, JbIconModule, JbSrOnlyModule],
  declarations: [
    JbAvatarCardComponent,
    JbAvatarCardSeatComponent,
    JbAvatarCardNameComponent,
  ],
  exports: [
    JbAvatarCardComponent,
    JbAvatarCardSeatComponent,
    JbAvatarCardNameComponent,
  ],
})
export class JbAvatarCardModule {}
