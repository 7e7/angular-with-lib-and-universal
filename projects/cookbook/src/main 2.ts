import './styles/index.scss';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppBrowserModule } from './app/app.browser.module';
import { hmrBootstrap } from './hmr';

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppBrowserModule);
}

environment.production
  ? enableProdMode()
  : require('zone.js/dist/long-stack-trace-zone');

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, main);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    // tslint:disable-next-line:no-console
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  main();
}
