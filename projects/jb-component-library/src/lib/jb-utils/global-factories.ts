import { isPlatformBrowser } from '@angular/common';

export function localStorageFactory() {
  return localStorage;
}

export function sessionStorageFactory() {
  return sessionStorage;
}

export function windowFactory(): Object {
  return typeof window === 'object'
    ? window
    : {
        // tslint:disable-next-line
        addEventListener: () => {},
      };
}

export function documentFactory(): Object {
  return typeof window === 'object' ? document : {};
}

export function navigatorFactory(): Object {
  return typeof window === 'object' ? navigator : {};
}

export function isBrowserFactory(platformId: Object): boolean {
  return isPlatformBrowser(platformId);
}
