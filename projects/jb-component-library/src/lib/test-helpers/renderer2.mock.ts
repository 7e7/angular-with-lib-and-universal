export class MockRenderer2 {
  data: any;
  destroy = jasmine.createSpy('destroy');
  createElement = jasmine.createSpy('createElement');
  createComment = jasmine.createSpy('createComment');
  createText = jasmine.createSpy('createText');
  destroyNode = jasmine.createSpy('destroyNode');
  appendChild = jasmine.createSpy('appendChild');
  insertBefore = jasmine.createSpy('insertBefore');
  removeChild = jasmine.createSpy('removeChild');
  selectRootElement = jasmine.createSpy('selectRootElement');
  parentNode = jasmine.createSpy('parentNode');
  nextSibling = jasmine.createSpy('nextSibling');
  removeAttribute = jasmine.createSpy('removeAttribute');
  setAttribute = jasmine.createSpy('setAttribute');
  addClass = jasmine.createSpy('addClass');
  removeClass = jasmine.createSpy('removeClass');
  setStyle = jasmine.createSpy('setStyle');
  removeStyle = jasmine.createSpy('removeStyle');
  setProperty = jasmine.createSpy('setProperty');
  setValue = jasmine.createSpy('setValue');
  listen = jasmine.createSpy('listen');
}
