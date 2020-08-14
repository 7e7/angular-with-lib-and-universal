import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbHintComponent } from './jb-hint.component';
import { JbCopyModule } from '../jb-copy/jb-copy.module';

@NgModule({
  imports: [CommonModule, JbCopyModule],
  declarations: [JbHintComponent],
  exports: [JbHintComponent],
})
export class JbHintModule {}
