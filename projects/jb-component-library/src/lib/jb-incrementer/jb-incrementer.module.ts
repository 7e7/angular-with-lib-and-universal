import { NgModule } from '@angular/core';
import { JbIncrementerComponent } from './jb-incrementer.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbCopyModule } from '../jb-copy/jb-copy.module';

@NgModule({
  imports: [JbIconModule, JbCopyModule],
  declarations: [JbIncrementerComponent],
  exports: [JbIncrementerComponent],
})
export class JbIncrementerModule {}
