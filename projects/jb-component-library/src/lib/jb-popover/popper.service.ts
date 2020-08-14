import { InjectionToken } from '@angular/core';
import Popper from 'popper.js';

export class PopperService {
  create(
    reference: Element | Popper.ReferenceObject,
    popper: Element,
    options?: Popper.PopperOptions
  ) {
    return new Popper(reference, popper, options);
  }
}

export function popperFactory() {
  return new PopperService();
}

export const POPPER_TOKEN = new InjectionToken<Storage>('POPPER_TOKEN', {
  providedIn: 'root',
  factory: popperFactory as any,
});
