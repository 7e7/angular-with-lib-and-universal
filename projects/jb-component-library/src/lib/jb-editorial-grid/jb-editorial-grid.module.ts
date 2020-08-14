import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JbEditorialBlogPostBlockComponent } from './components/jb-editorial-blog-post-block/jb-editorial-blog-post-block.component';
import { JbEditorialCrewScoopBlockComponent } from './components/jb-editorial-crew-scoop-block/jb-editorial-crew-scoop-block.component';
import { JbEditorialImageBlockComponent } from './components/jb-editorial-image-block/jb-editorial-image-block.component';
import { JbEditorialImageComponent } from './components/jb-editorial-image/jb-editorial-image.component';
import { JbEditorialWeatherWidgetComponent } from './components/jb-editorial-weather-widget/jb-editorial-weather-widget.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbImageModule } from '../jb-image/jb-image.module';
import { JbCopyModule } from '../jb-copy/jb-copy.module';
import { JbLinkModule } from '../jb-link/jb-link.module';
import { JbFlagModule } from '../jb-flag/jb-flag.module';
import { JbActionLinkModule } from '../jb-link/jb-action-link/jb-action-link.module';
import { JbEditorialGridComponent } from './jb-editorial-grid.component';
import { JbBackgroundImageModule } from '../jb-background-image/jb-background-image.module';
import { JbSelectModule } from '../jb-select/jb-select.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    JbIconModule,
    JbImageModule,
    JbCopyModule,
    JbLinkModule,
    JbFlagModule,
    JbActionLinkModule,
    JbSelectModule,
    JbBackgroundImageModule,
    FormsModule,
  ],
  declarations: [
    JbEditorialBlogPostBlockComponent,
    JbEditorialCrewScoopBlockComponent,
    JbEditorialImageBlockComponent,
    JbEditorialImageComponent,
    JbEditorialGridComponent,
    JbEditorialWeatherWidgetComponent,
  ],
  exports: [
    JbEditorialBlogPostBlockComponent,
    JbEditorialCrewScoopBlockComponent,
    JbEditorialImageBlockComponent,
    JbEditorialImageComponent,
    JbEditorialGridComponent,
    JbEditorialWeatherWidgetComponent,
  ],
})
export class JbEditorialGridModule {}
