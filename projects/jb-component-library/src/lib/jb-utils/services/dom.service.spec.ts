import {
  ComponentFixture,
  TestModuleMetadata,
  async,
} from '@angular/core/testing';
import { Component, NgModule, ElementRef } from '@angular/core';
import { createStub, setupComponentFixture } from '../../test-helpers/index';
import { JbDomService } from './dom.service';
import { DOCUMENT } from '../injection-tokens';

// tslint:disable
@Component({
  selector: `jb-dummy-dom-component`,
  template: `
    <div id="test">
      <h3>Component Test</h3>
      <button>Clickable</button>
    </div>
  `,
})
class JbDummyComponent {
  constructor(public domService: JbDomService, public elmRef: ElementRef) {}
}

@NgModule({
  providers: [{ provide: DOCUMENT, useValue: document }],
  declarations: [JbDummyComponent],
  entryComponents: [JbDummyComponent],
})
class JbDummyModule {}

describe('Service: DomService', () => {
  let fixture: ComponentFixture<JbDummyComponent>;
  let component: JbDummyComponent;

  beforeEach(async(() => {
    const moduleConfig: TestModuleMetadata = {
      imports: [JbDummyModule],
    };
    setupComponentFixture(moduleConfig, JbDummyComponent).then(
      (compFixture) => {
        fixture = compFixture;
        component = fixture.componentInstance;
      }
    );
  }));

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should mount and unmount on body', () => {
    const ref = component.domService.appendComponent(JbDummyComponent);
    expect(document.body.querySelector('jb-dummy-dom-component')).toBeDefined();
    component.domService.removeComponent(ref);
    fixture.detectChanges();
    expect(document.body.querySelector('jb-dummy-dom-component')).toBe(null);
  });

  it('should mount and unmount on a div where the id is "test"', () => {
    const element = document.getElementById('test');
    const ref = component.domService.appendComponent(JbDummyComponent, element);
    expect(element.querySelector('jb-dummy-dom-component')).toBeDefined();
    component.domService.removeComponent(ref);
    fixture.detectChanges();
    expect(element.querySelector('jb-dummy-dom-component')).toBe(null);
  });

  it('should have focuseable elements', () => {
    const button = document.createElement('button');
    const secondElementText = document.createTextNode('Clickable');
    button.appendChild(secondElementText);

    const ref = component.domService.appendComponent(JbDummyComponent);

    const focusableEls = component.domService.getFocusableElements(
      document.body
    );
    expect(focusableEls[0]).toEqual(button);
    component.domService.removeComponent(ref);
  });

  it('should focus elements', () => {
    const button = document.createElement('button');
    const secondElementText = document.createTextNode('Clickable');
    button.appendChild(secondElementText);

    const ref = component.domService.appendComponent(JbDummyComponent);

    const focusableEls = component.domService.getFocusableElements(
      document.body
    );
    expect(focusableEls[0]).toEqual(button);

    component.domService.setElementFocus(focusableEls[0]);

    expect(focusableEls[0]).toEqual(document.activeElement);
    component.domService.removeComponent(ref);
  });

  it('should select all input text', () => {
    const input = { setSelectionRange: jest.fn(), value: '123' };
    component.domService.selectInputText(input as any);

    expect(input.setSelectionRange).toHaveBeenCalledWith(0, 3);
  });

  it('should set an attribute on a given element ref', () => {
    const elmRef = component.elmRef;
    const method = 'setAttribute';
    const attr = 'name';
    const val = 'hello';
    const args = [attr, val];
    component.domService.callNativeMethod(elmRef, method, ...args);
    expect(elmRef.nativeElement.getAttribute(attr)).toEqual(val);
  });

  describe('addClasses', () => {
    const elementRefMock = { nativeElement: {} };
    let service: JbDomService;
    let addClassSpy;
    let rendererMock;

    beforeEach(() => {
      addClassSpy = {
        addClass: jest.fn(),
      };
      rendererMock = createStub(addClassSpy);
      service = new JbDomService(
        createStub(),
        createStub(),
        createStub(),
        createStub()
      );
    });

    describe('addClassesAsString', () => {
      it('should call renderer.addClass for each class in string', () => {
        service.addClassesAsString(elementRefMock, rendererMock, 'ab cd ef g');

        expect(addClassSpy.addClass.mock.calls.length).toBe(4);
        expect(addClassSpy.addClass.mock.calls[0][1]).toBe('ab');
        expect(addClassSpy.addClass.mock.calls[1][1]).toBe('cd');
        expect(addClassSpy.addClass.mock.calls[2][1]).toBe('ef');
        expect(addClassSpy.addClass.mock.calls[3][1]).toBe('g');
      });
    });

    describe('addClassesAsArray', () => {
      it('should call render.addClass for each element in array', () => {
        const arrayOfClasses = ['hi', 'jk', 'l', 'mnop'];

        service.addClassesAsArray(elementRefMock, rendererMock, arrayOfClasses);

        expect(addClassSpy.addClass.mock.calls.length).toBe(4);
        expect(addClassSpy.addClass.mock.calls[0][1]).toBe('hi');
        expect(addClassSpy.addClass.mock.calls[1][1]).toBe('jk');
        expect(addClassSpy.addClass.mock.calls[2][1]).toBe('l');
        expect(addClassSpy.addClass.mock.calls[3][1]).toBe('mnop');
      });
    });
  });

  describe('removeClasses', () => {
    const elementRefMock = { nativeElement: {} };
    let service: JbDomService;
    let renderer;
    let rendererMock;

    beforeEach(() => {
      renderer = {
        removeClass: jest.fn(),
      };
      rendererMock = createStub(renderer);
      service = new JbDomService(
        createStub(),
        createStub(),
        createStub(),
        createStub()
      );
    });

    describe('removeClassesAsString', () => {
      it('should call renderer.removeClass for each class in string', () => {
        service.removeClassesAsString(
          elementRefMock,
          rendererMock,
          'ab cd ef g'
        );

        expect(renderer.removeClass.mock.calls.length).toBe(4);
        expect(renderer.removeClass.mock.calls[0][1]).toBe('ab');
        expect(renderer.removeClass.mock.calls[1][1]).toBe('cd');
        expect(renderer.removeClass.mock.calls[2][1]).toBe('ef');
        expect(renderer.removeClass.mock.calls[3][1]).toBe('g');
      });
    });

    describe('removeClassesAsArray', () => {
      it('should call render.removeClass for each element in array', () => {
        const arrayOfClasses = ['hi', 'jk', 'l', 'mnop'];

        service.removeClassesAsArray(
          elementRefMock,
          rendererMock,
          arrayOfClasses
        );

        expect(renderer.removeClass.mock.calls.length).toBe(4);
        expect(renderer.removeClass.mock.calls[0][1]).toBe('hi');
        expect(renderer.removeClass.mock.calls[1][1]).toBe('jk');
        expect(renderer.removeClass.mock.calls[2][1]).toBe('l');
        expect(renderer.removeClass.mock.calls[3][1]).toBe('mnop');
      });
    });
  });
});
