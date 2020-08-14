import { NgModule } from '@angular/core';

import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbTravelAlertComponent } from './jb-travel-alert.component';
import { JbButtonCloseModule } from '../jb-button-close/jb-button-close.module';
import { JbLinkModule } from '../jb-link/jb-link.module';

@NgModule({
  imports: [JbIconModule, JbButtonCloseModule, JbLinkModule],
  declarations: [JbTravelAlertComponent],
  exports: [JbTravelAlertComponent],
})
export class JbTravelAlertModule {}
