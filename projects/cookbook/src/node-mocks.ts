// tslint:disable

import { ENVIRONMENT_OPTIONS } from './app/core/app-config/types';

export class FakeStorage {
  length = 3;
  key() {
    return '';
  }
  getItem() {
    return '{}';
  }
  removeItem() {
    return '';
  }
  setItem() {
    return '';
  }
  clear() {
    return '';
  }
}

export const FakeEnvConfig = {
  compodocUrl: '',
  environment: ENVIRONMENT_OPTIONS.dev,
  buildId: '',
};

const createDOMTokenList = () => ({
  add() {},
  remove() {},
  contains() {},
  match() {},
});

export const FakeDocument = {
  body: {
    classList: createDOMTokenList(),
  },
};

export class FakeNavigator {
  onLine = true;
  watchPosition() {}
  geolocation = {
    getCurrentPosition: () => {},
  };
}

export class FakeWindow {
  addEventListener = () => {};
}

export function omnitureFactory() {
  return {
    pageName: '',
    pageURL: '',
    t: () => {},
    tl: () => {},
    clearVars: () => {},
  };
}
