import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JbIconComponent } from './jb-icon.component';
import { JbHoverIconComponent } from './jb-hover-icon.component';
import { IconMap } from './icon-map.interface';
import { JB_ICONS } from './jb-icons.token';

@NgModule({
  imports: [CommonModule],
  providers: [{ provide: JB_ICONS, useValue: {}, multi: true }],
  declarations: [JbIconComponent, JbHoverIconComponent],
  exports: [JbIconComponent, JbHoverIconComponent, CommonModule],
})
export class JbIconModule {
  static withIcons(icons: IconMap): ModuleWithProviders<JbIconModule> {
    return {
      ngModule: JbIconModule,
      providers: [{ provide: JB_ICONS, useValue: icons, multi: true }],
    };
  }
}
