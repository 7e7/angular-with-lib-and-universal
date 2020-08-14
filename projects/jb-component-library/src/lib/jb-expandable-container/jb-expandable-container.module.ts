import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbExpandableContainerComponent } from './jb-expandable-container.component';
import { JbExpandableSectionComponent } from './jb-expandable-section/jb-expandable-section.component';

@NgModule({
  imports: [CommonModule],
  declarations: [JbExpandableContainerComponent, JbExpandableSectionComponent],
  exports: [JbExpandableContainerComponent, JbExpandableSectionComponent],
})
export class JbExpandableContainerModule {}
