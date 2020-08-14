import { JbButtonDirective } from './jb-button.directive';
import { createStub } from '../test-helpers';
import { JbButtonTypeEnum } from './types/jb-button-type.enum';

describe('JbButtonDirective', () => {
  let directive: JbButtonDirective;
  let elementRefMock;
  let rendererMock;
  let setAttributeSpy;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: {
        disabled: false,
      },
    };

    setAttributeSpy = {
      setAttribute: jest.fn(),
    };
    rendererMock = createStub(setAttributeSpy);

    directive = new JbButtonDirective(
      elementRefMock,
      rendererMock,
      createStub()
    );
  });

  it('should default to primary variant', () => {
    expect(directive.theme).toBe(JbButtonTypeEnum.primary);
  });

  it('should default to isRounded', () => {
    expect(directive.isRounded).toBe(true);
  });

  it('should default to not isPaired', () => {
    expect(directive.isPaired).toBe(false);
  });

  it('should not be loading in initial state', () => {
    expect(directive.isLoading).toBe(false);
  });

  it('should not be focused in initial state', () => {
    expect(directive.isFocused).toBe(false);
  });

  it('should not be disabled in initial state', () => {
    expect(directive.isDisabled).toBe(false);
  });

  describe('addAttribute', () => {
    it('should set the attribute on native element', () => {
      const type = 'aria-hidden';
      const value = 'false';

      directive.addAttribute(type, value);
      expect(setAttributeSpy.setAttribute.mock.calls.length).toBe(1);
      expect(setAttributeSpy.setAttribute.mock.calls[0][1]).toBe(type);
      expect(setAttributeSpy.setAttribute.mock.calls[0][2]).toBe(value);
    });
  });

  describe('ngOnInit', () => {
    it('should set isDisabled from nativeElement', () => {
      directive.ngOnInit();
      expect(directive.isDisabled).toBe(false);

      elementRefMock.nativeElement.disabled = true;

      directive.ngOnInit();
      expect(directive.isDisabled).toBe(true);
    });

    describe('onFocus', () => {
      it('should set isFocused to true', () => {
        directive.isFocused = false;
        directive.onFocus();
        expect(directive.isFocused).toBe(true);
      });
    });

    describe('onBlur', () => {
      it('should set isFocused to false', () => {
        directive.isFocused = true;
        directive.onBlur();
        expect(directive.isFocused).toBe(false);
      });
    });
  });

  describe('isPrimary', () => {
    it('should return true if theme is primary', () => {
      expect(directive.isPrimary).toBe(true);
    });

    it('should return false if theme is not primary', () => {
      directive.theme = JbButtonTypeEnum.secondary;
      expect(directive.isPrimary).toBe(false);
    });
  });

  describe('isSecondary', () => {
    it('should return true if theme is secondary', () => {
      directive.theme = JbButtonTypeEnum.secondary;
      expect(directive.isSecondary).toBe(true);
    });

    it('should return false if theme is not secondary', () => {
      expect(directive.isSecondary).toBe(false);
    });
  });

  describe('isActivePrimary', () => {
    it('should return true if theme is primary and not disabled', () => {
      directive.theme = JbButtonTypeEnum.primary;
      directive.isDisabled = false;
      expect(directive.isActivePrimary).toBe(true);
    });

    it('should return false if theme is not primary', () => {
      directive.theme = JbButtonTypeEnum.secondary;
      directive.isDisabled = false;
      expect(directive.isActivePrimary).toBe(false);
    });

    it('should return false if disabled', () => {
      directive.theme = JbButtonTypeEnum.primary;
      directive.isDisabled = true;
      expect(directive.isActivePrimary).toBe(false);
    });
  });

  describe('isActiveSecondary', () => {
    it('should return true if theme is secondary and not disabled', () => {
      directive.theme = JbButtonTypeEnum.secondary;
      directive.isDisabled = false;
      expect(directive.isActiveSecondary).toBe(true);
    });

    it('should return false if theme is not secondary', () => {
      directive.theme = JbButtonTypeEnum.primary;
      directive.isDisabled = false;
      expect(directive.isActiveSecondary).toBe(false);
    });

    it('should return false if disabled', () => {
      directive.theme = JbButtonTypeEnum.secondary;
      directive.isDisabled = true;
      expect(directive.isActiveSecondary).toBe(false);
    });
  });

  describe('isActive', () => {
    it('should return true if not disabled', () => {
      directive.isDisabled = false;
      expect(directive.isActive).toBe(true);
    });

    it('should return false if disabled', () => {
      directive.isDisabled = true;
      expect(directive.isActive).toBe(false);
    });
  });

  describe('isDisabledPrimary', () => {
    it('should return true if theme is primary and is disabled', () => {
      directive.theme = JbButtonTypeEnum.primary;
      directive.isDisabled = true;
      expect(directive.isDisabledPrimary).toBe(true);
    });

    it('should return false if not disabled', () => {
      directive.theme = JbButtonTypeEnum.primary;
      directive.isDisabled = false;
      expect(directive.isDisabledPrimary).toBe(false);
    });

    it('should return false if not primary theme', () => {
      directive.theme = JbButtonTypeEnum.secondary;
      directive.isDisabled = true;
      expect(directive.isDisabledPrimary).toBe(false);
    });
  });

  describe('isDisabledSecondary', () => {
    it('should return true if theme is secondary and is disabled', () => {
      directive.theme = JbButtonTypeEnum.secondary;
      directive.isDisabled = true;
      expect(directive.isDisabledSecondary).toBe(true);
    });

    it('should return false if theme is primary', () => {
      directive.theme = JbButtonTypeEnum.primary;
      directive.isDisabled = true;
      expect(directive.isDisabledSecondary).toBe(false);
    });

    it('should return false if not disabled', () => {
      directive.theme = JbButtonTypeEnum.secondary;
      directive.isDisabled = false;
      expect(directive.isDisabledSecondary).toBe(false);
    });
  });

  describe('isRoundedPaired', () => {
    it('should return true if isPaired and isRounded', () => {
      directive.isPaired = true;
      directive.isRounded = true;

      expect(directive.isRoundedPaired).toBe(true);
    });

    it('should return false if isPaired is false', () => {
      directive.isPaired = false;
      directive.isRounded = true;
      expect(directive.isRoundedPaired).toBe(false);
    });

    it('should return false if isRounded is false', () => {
      directive.isPaired = true;
      directive.isRounded = false;
      expect(directive.isRoundedPaired).toBe(false);
    });
  });

  describe('isRoundedSingle', () => {
    it('should return true if isRounded and not paired', () => {
      directive.isPaired = false;
      directive.isRounded = true;
      expect(directive.isRoundedSingle).toBe(true);
    });

    it('should return false if paired', () => {
      directive.isPaired = true;
      directive.isRounded = true;
      expect(directive.isRoundedSingle).toBe(false);
    });

    it('should return false if not rounded', () => {
      directive.isPaired = false;
      directive.isRounded = false;
      expect(directive.isRoundedSingle).toBe(false);
    });
  });
});
