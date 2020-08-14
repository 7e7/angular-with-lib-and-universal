import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbUtilsModule } from '../jb-utils/utils.module';
import { JbSrOnlyModule } from '../jb-sr-only/jb-sr-only.module';
import { JbSeatComponent } from './jb-seat.component';
import { JbSeatAvailableTextComponent } from './components/jb-seat-available-text/jb-seat-available-text.component';
import { JbSeatSelectedTextComponent } from './components/jb-seat-selected-text/jb-seat-selected-text.component';
import { JbMintSeatComponent } from './components/mint-seat/mint-seat.component';
import { JbEMSSeatComponent } from './components/ems-seat/ems-seat.component';
import { JbCoreSeatComponent } from './components/core-seat/core-seat.component';
import { JbMintStudioSeatComponent } from './components/mint-studio-seat/mint-studio-seat.component';
import { JbMintSuiteSeatComponent } from './components/mint-suite-seat/mint-suite-seat.component';

@NgModule({
  // Using JbUtilsModule#jbButtonResetStyles
  imports: [CommonModule, JbSrOnlyModule, JbUtilsModule],
  declarations: [
    JbSeatComponent,
    JbSeatAvailableTextComponent,
    JbSeatSelectedTextComponent,
    JbMintSeatComponent,
    JbMintStudioSeatComponent,
    JbMintSuiteSeatComponent,
    JbCoreSeatComponent,
    JbEMSSeatComponent,
  ],
  exports: [
    JbSeatComponent,
    JbSeatAvailableTextComponent,
    JbSeatSelectedTextComponent,
    JbMintSeatComponent,
    JbMintStudioSeatComponent,
    JbMintSuiteSeatComponent,
    JbCoreSeatComponent,
    JbEMSSeatComponent,
  ],
})
export class JbSeatModule {}
