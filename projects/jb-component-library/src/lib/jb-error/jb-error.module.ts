import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbErrorComponent } from './jb-error.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';

@NgModule({
  imports: [CommonModule, JbIconModule],
  declarations: [JbErrorComponent],
  exports: [JbErrorComponent],
})
export class JbErrorModule {}
