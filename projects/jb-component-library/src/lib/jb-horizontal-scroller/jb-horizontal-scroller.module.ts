import { NgModule } from '@angular/core';
import { JbHorizontalScrollerComponent } from './jb-horizontal-scroller.component';
import { CommonModule } from '@angular/common';
import { JbHorizontalScrollerItemDirective } from './jb-horizontal-scroller-item.directive';
import { JbHorizontalScrollerButtonComponent } from './jb-horizontal-scroller-button/jb-horizontal-scroller-button.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';

@NgModule({
  declarations: [
    JbHorizontalScrollerComponent,
    JbHorizontalScrollerItemDirective,
    JbHorizontalScrollerButtonComponent,
  ],
  exports: [JbHorizontalScrollerComponent, JbHorizontalScrollerItemDirective],
  imports: [CommonModule, JbIconModule],
})
export class JbHorizontalScrollerModule {}
