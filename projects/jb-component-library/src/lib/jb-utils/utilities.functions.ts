import { JbVariantType } from '../types/jb-variant-type.type';
import { JbTheme } from '../types/jb-theme.type';
import { JbVariantTypeEnum } from '../types/jb-variant-type.enum';
import { JbThemeEnum } from '../types/jb-theme.enum';
import { ElementRef } from '@angular/core';

export function elementHasContent(element: HTMLElement): boolean {
  return element.children.length > 0 || element.textContent.length > 0;
}

export function isPrimary(variantType: JbVariantType): boolean {
  return variantType === JbVariantTypeEnum.primary;
}

export function isSecondary(variantType: JbVariantType): boolean {
  return variantType === JbVariantTypeEnum.secondary;
}

export function isLightTheme(variantType: JbTheme): boolean {
  return variantType === JbThemeEnum.light;
}

export function isDarkTheme(variantType: JbTheme): boolean {
  return variantType === JbThemeEnum.dark;
}

export const debounce = (fn: Function, delay: number, immediate = false) => {
  let timeout;

  return function(...args: any[]) {
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;

      if (!immediate) {
        // tslint:disable-next-line: no-invalid-this
        fn.apply(this, args);
      }
    }, delay);

    if (callNow) {
      // tslint:disable-next-line: no-invalid-this
      fn.apply(this, args);
    }
  };
};

export const getNativeElement = (element: HTMLElement | ElementRef) => {
  return element instanceof ElementRef ? element.nativeElement : element;
};
