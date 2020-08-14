import { Inject, Injectable } from '@angular/core';
import { IconMap } from './icon-map.interface';
import { JB_ICONS } from './jb-icons.token';
import { icons as internalIcons } from './icon-manifest';

function getAllIconNames(iconMaps: IconMap[]): string[] {
  const keys = iconMaps.map((mapping) => Object.keys(mapping));
  return [].concat(...keys);
}

function warnOnDuplicateIconNames(maps: IconMap[]): void {
  const iconsSet = new Set<string>();

  for (const key of getAllIconNames(maps)) {
    if (iconsSet.has(key)) {
      console.warn(
        `There is a duplicate key for "${key}" that conflicts with an internal Component Library icon name. ` +
          `Your provided icon will override it.`
      );
    }
    iconsSet.add(key);
  }
}

@Injectable({
  providedIn: 'root',
})
export class JbIconService {
  private icons: IconMap = {};

  constructor(@Inject(JB_ICONS) iconsArray: IconMap[]) {
    warnOnDuplicateIconNames([internalIcons, ...iconsArray]);

    this.icons = Object.assign({}, internalIcons, ...iconsArray);
  }

  // for lazy loading
  addIcons(icons: IconMap) {
    this.icons = { ...this.icons, ...icons };
  }

  get(iconName: string) {
    return this.icons[iconName];
  }
}
