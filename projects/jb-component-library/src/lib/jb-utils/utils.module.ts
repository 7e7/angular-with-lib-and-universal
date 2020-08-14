import { NgModule } from '@angular/core';

import { JbClickStopDirective } from './directives/jb-click-stop.directive';
import { JbClickOutsideDirective } from './directives/jb-click-outside.directive';
import { JbScrollLockDirective } from './directives/jb-scroll-lock.directive';
import { JbPipesModule } from './pipes/jb-pipes.module';
import { JbTabOutDirective } from './directives/jb-tab-out.directive';
import { JbButtonResetStylesDirective } from './directives/jb-button-reset-styles.directive';
import { JbPrefixDirective } from './directives/jb-prefix.directive';

const DIRECTIVES = [
  JbClickStopDirective,
  JbClickOutsideDirective,
  JbScrollLockDirective,
  JbTabOutDirective,
  JbButtonResetStylesDirective,
  JbPrefixDirective,
];

// This module will be distributed. Only include modules intended for direct usage by jb-component-library end users.
// If you only need it in your component, please add to your component's providers.
@NgModule({
  imports: [JbPipesModule],
  declarations: [...DIRECTIVES],
  exports: [JbPipesModule, ...DIRECTIVES],
})
export class JbUtilsModule {}

export * from './injection-tokens';
export * from './global-factories';
export * from './breakpoints.constant';
export { JbDeviceService } from './services/device-service';
export { JbScrollService } from './services/scroll.service';
export { JbViewPortService } from './services/viewport.service';
