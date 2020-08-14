import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbActionComponent } from './jb-action.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';

@NgModule({
  imports: [CommonModule, JbIconModule],
  declarations: [JbActionComponent],
  exports: [JbActionComponent],
})
export class JbActionModule {}
