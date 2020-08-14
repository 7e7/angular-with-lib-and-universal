import { InjectionToken } from '@angular/core';
import {
  windowFactory,
  navigatorFactory,
  localStorageFactory,
  sessionStorageFactory,
  documentFactory,
} from './global-factories';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LOCAL_STORAGE', {
  providedIn: 'root',
  factory: localStorageFactory as any,
});
export const SESSION_STORAGE = new InjectionToken<Storage>('SESSION_STORAGE', {
  providedIn: 'root',
  factory: sessionStorageFactory as any,
});
export const NAVIGATOR = new InjectionToken<Navigator>('NAVIGATOR', {
  providedIn: 'root',
  factory: navigatorFactory as any,
});
export const WINDOW = new InjectionToken<Window>('WINDOW', {
  providedIn: 'root',
  factory: windowFactory as any,
});
export const DOCUMENT = new InjectionToken<Document>('DOCUMENT', {
  providedIn: 'root',
  factory: documentFactory as any,
});
export const IS_BROWSER = new InjectionToken<boolean>('IS_BROWSER', {
  providedIn: 'root',
  factory: () => true,
});
