import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbRelatedContentBlockComponent } from './components/jb-related-content-block/jb-related-content-block.component';
import { JbRelatedContentBlockItemComponent } from './components/jb-related-content-block-item/jb-related-content-block-item.component';
import { JbRelatedContentBlockTitleComponent } from './components/jb-related-content-block-title/jb-related-content-block-title.component';
import { JbRelatedContentBlockGridContainerComponent } from './components/jb-related-content-block-grid-container/jb-related-content-block-grid-container.component';
import { JbCopyModule } from '../jb-copy/jb-copy.module';
import { JbActionLinkModule } from '../jb-link/jb-action-link/jb-action-link.module';
import { JbRelatedContentBlockSectionSpecificComponent } from './components/jb-related-content-block-section-specific/jb-related-content-block-section-specific.component';
import { JbRelatedContentBlockPageSpecificComponent } from './components/jb-related-content-block-page-specific/jb-related-content-block-page-specific.component';
import { JbImageModule } from '../jb-image/jb-image.module';

@NgModule({
  imports: [CommonModule, JbCopyModule, JbActionLinkModule, JbImageModule],
  declarations: [
    JbRelatedContentBlockComponent,
    JbRelatedContentBlockItemComponent,
    JbRelatedContentBlockTitleComponent,
    JbRelatedContentBlockGridContainerComponent,
    JbRelatedContentBlockSectionSpecificComponent,
    JbRelatedContentBlockPageSpecificComponent,
  ],
  exports: [JbRelatedContentBlockComponent, JbRelatedContentBlockItemComponent],
})
export class JbRelatedContentBlockModule {}
