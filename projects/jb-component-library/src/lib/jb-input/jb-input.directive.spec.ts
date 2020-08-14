import { JbInputDirective } from './jb-input.directive';
import { createSimpleChangesMock, createStub } from '../test-helpers';
import { JbInputType } from './types/jb-input-type.enum';

describe('JbInputDirective', () => {
  let directive: JbInputDirective;
  let elementRefMock;
  let rendererMock;
  let domServiceMock;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: {},
    };

    rendererMock = {
      addClass: jest.fn(),
      setAttribute: jest.fn(),
    };

    domServiceMock = {
      addClassesAsString: jest.fn(),
    };

    directive = new JbInputDirective(
      elementRefMock,
      createStub(rendererMock),
      domServiceMock,

      {} as any,
      {} as any,
      {} as any,
      {} as any,
      { isErrorState: () => false } as any
    );
  });

  describe('escapeValue', () => {
    const dummyInput = '';

    it('should replace %20 with empty space', () => {
      const expected = 'http://www.google.com/I Have Spaces';

      directive.encodeURIComponent = (value: string): string =>
        'http://www.google.com/I%20Have%20Spaces';

      expect(directive.escapeValue(dummyInput)).toEqual(expected);
    });

    it('should replace %40 with @ character', () => {
      const expected = 'http://www.google.com/@JetBlue';

      directive.encodeURIComponent = (value: string): string =>
        'http://www.google.com/%40JetBlue';

      expect(directive.escapeValue(dummyInput)).toEqual(expected);
    });
  });

  describe('validateType', () => {
    it('should throw Error if not a valid type', () => {
      directive.type = 'pizza' as JbInputType;
      expect(() => {
        directive.validateType();
      }).toThrowError();
    });

    it('should not throw Error if type is password', () => {
      directive.type = JbInputType.password;
      directive.validateType();
    });

    it('should not throw Error if type is text', () => {
      directive.type = JbInputType.text;
      directive.validateType();
    });

    it('should not throw Error if type is email', () => {
      directive.type = JbInputType.email;
      directive.validateType();
    });

    it('should not throw Error if type is number', () => {
      directive.type = JbInputType.number;
      directive.validateType();
    });
  });

  describe('ngDoCheck', () => {
    it('should emit valueChanges if native element value is different from class property', (done) => {
      const changeValue = 'cowabunga';

      directive.valueChanges.subscribe((value: string) => {
        expect(value).toEqual(changeValue);
        done();
      });

      elementRefMock.nativeElement.value = changeValue;
      directive.value = 'pizza';

      directive.ngDoCheck();
    });

    it('should not emit valueChanges if element value is the same as class property value', () => {
      const value = 'pizza';
      elementRefMock.nativeElement.value = value;
      directive.value = value;

      spyOn(directive.valueChanges, 'emit');
      directive.ngDoCheck();
      expect(directive.valueChanges.emit).not.toHaveBeenCalled();
    });
  });

  describe('inputChange', () => {
    it('should be a NOOP function and exist to trigger Angular change detection', () => {
      expect(directive.inputChange()).toBeUndefined();
    });
  });

  describe('setters', () => {
    const ariaData = 'Aria Smith';

    it('setAriaLabelledBy should update member variable', () => {
      directive.setAriaLabelledBy(ariaData);
      expect(directive.ariaLabelledBy).toBe(ariaData);
    });

    it('setAriaDescribedBy should update member variable', () => {
      directive.setAriaDescribedBy(ariaData);
      expect(directive.ariaDescribedBy).toBe(ariaData);
    });

    it('handleFocus should set isFocused', () => {
      directive.isFocused = false;
      directive.handleFocus(true);
      expect(directive.isFocused).toBe(true);
    });
  });

  describe('addClasses', () => {
    it('should add each class in space-delimited list', () => {
      const classes = 'pt4 pb1 bg-transparent';
      directive.addClasses(classes);
      expect(domServiceMock.addClassesAsString.mock.calls.length).toBe(1);
    });
  });

  describe('ngOnChanges', () => {
    it('should update element attributes', () => {
      const setAttributeMock = rendererMock.setAttribute.mock;
      const attribName = 'aria-invalid';
      const attribValue = 'false';

      directive.ngOnChanges(createSimpleChangesMock(attribName, attribValue));

      expect(setAttributeMock.calls.length).toBe(1);
      expect(setAttributeMock.calls[0][0]).toBe(elementRefMock.nativeElement);
      expect(setAttributeMock.calls[0][1]).toBe(attribName);
      expect(setAttributeMock.calls[0][2]).toBe(attribValue);
    });
  });
});
