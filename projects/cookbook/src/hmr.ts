import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

/**
 * This bootstrapping function is created according to instructions found:
 * https://medium.com/@beeman/tutorial-enable-hmr-in-angular-cli-apps-1b0d13b80130
 * https://medium.com/echohub/implementation-of-hmr-hot-module-replacement-to-angular-project-f7bca523bd16
 */
export const hmrBootstrap = (
  module: any,
  bootstrap: () => Promise<NgModuleRef<any>>
) => {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();
  bootstrap().then((mod) => (ngModule = mod));
  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map((c) => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    makeVisible();
  });
};
