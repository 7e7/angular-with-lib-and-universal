import { NgModule } from '@angular/core';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbImageModule } from '../jb-image/jb-image.module';
import { JbCopyModule } from '../jb-copy/jb-copy.module';
import { JbSrOnlyModule } from '../jb-sr-only/jb-sr-only.module';

import { JbNavigationBlockComponent } from './jb-navigation-block.component';

@NgModule({
  imports: [JbIconModule, JbImageModule, JbCopyModule, JbSrOnlyModule],
  declarations: [JbNavigationBlockComponent],
  exports: [JbNavigationBlockComponent],
})
export class JbNavigationBlockModule {}
