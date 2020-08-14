import { debounce as pureDebounce } from './utilities.functions';

export function debounce(delay: number = 300): MethodDecorator {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const original = descriptor.value;
    const map = new WeakMap();

    descriptor.value = function(...params: any[]) {
      // tslint:disable-next-line:no-invalid-this
      let debounced = map.get(this);
      if (!debounced) {
        // tslint:disable-next-line:no-invalid-this
        debounced = pureDebounce(original, delay).bind(this);
        // tslint:disable-next-line:no-invalid-this
        map.set(this, debounced);
      }
      debounced(...params);
    };

    return descriptor;
  };
}
