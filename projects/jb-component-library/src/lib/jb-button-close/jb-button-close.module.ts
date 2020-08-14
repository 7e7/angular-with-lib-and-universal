import { NgModule } from '@angular/core';
import { JbButtonCloseComponent } from './jb-button-close.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';

@NgModule({
  declarations: [JbButtonCloseComponent],
  imports: [JbIconModule],
  exports: [JbButtonCloseComponent],
})
export class JbButtonCloseModule {}
