import { SimpleChange, Type } from '@angular/core';
import {
  TestModuleMetadata,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

/**
 * Takes a module definition and component reference and returns the fully setup test fixture.
 *
 * @param moduleMetadata Module configuration object
 * @param component Component class reference
 */
export function setupComponentFixture<T>(
  moduleMetadata: TestModuleMetadata,
  component: Type<T>
): Promise<ComponentFixture<T>> {
  return TestBed.configureTestingModule(moduleMetadata)
    .compileComponents()
    .then(() => TestBed.createComponent(component))
    .then((fixture) => {
      fixture.autoDetectChanges();
      return fixture;
    })
    .catch((error) => {
      throw error;
    });
}

export function createKeydownEvent(key: number): CustomEvent {
  const keydownEvent: any = document.createEvent('CustomEvent');
  keydownEvent.which = key;
  keydownEvent.initEvent('keydown', true, true);
  return keydownEvent;
}

export function createStub(obj: any = {}) {
  const mock = jest.fn(() => obj);
  return new mock();
}

export function createSimpleChangesMock(
  changedProperty,
  currentValue,
  isFirstChange = true
) {
  return {
    [changedProperty]: new SimpleChange(undefined, currentValue, isFirstChange),
  };
}
