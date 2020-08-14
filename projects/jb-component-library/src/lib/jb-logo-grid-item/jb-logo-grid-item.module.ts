import { NgModule } from '@angular/core';
import { JbLogoGridItemComponent } from './jb-logo-grid-item.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';

@NgModule({
  imports: [JbIconModule],
  declarations: [JbLogoGridItemComponent],
  exports: [JbLogoGridItemComponent],
})
export class JbLogoGridItemModule {}
