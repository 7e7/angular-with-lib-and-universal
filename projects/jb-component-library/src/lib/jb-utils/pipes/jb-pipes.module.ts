import { NgModule } from '@angular/core';

import { JbHighlightPipe } from './jb-highlight.pipe';
import { JbTruncatePipe } from './jb-truncate.pipe';
import { JbReversePipe } from './jb-reverse.pipe';

const PIPES = [JbHighlightPipe, JbTruncatePipe, JbReversePipe];

@NgModule({
  declarations: [...PIPES],
  exports: [...PIPES],
})
export class JbPipesModule {}
