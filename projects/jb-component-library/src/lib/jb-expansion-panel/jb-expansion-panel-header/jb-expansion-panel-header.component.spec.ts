import { JbExpansionPanelHeaderComponent } from './jb-expansion-panel-header.component';
import { createStub } from '../../test-helpers';
import { JbAnimationHelperService } from '../../jb-utils/services/animation-helper.service';

jest.mock('../../jb-utils/services/animation-helper.service');

/*
 * Test Helpers
 */
const createAnimationPlayerMock = () => ({
  play: jest.fn(),
  reset: jest.fn(),
  destroy: jest.fn(),
  finish: jest.fn(),
});

/*
 * Test Suite
 */
describe('JbExpansionPanelHeader', () => {
  let component: JbExpansionPanelHeaderComponent;
  let animationHelperServiceMock;
  let animationFactoryMock;
  let buttonMock;
  let openPlayerMock;
  let closePlayerMock;

  beforeEach(() => {
    const animationPlayerMock = createAnimationPlayerMock();

    buttonMock = {
      nativeElement: {
        focus: jest.fn(),
      },
    };

    animationFactoryMock = {
      create: createAnimationPlayerMock,
    };

    openPlayerMock = createStub(animationPlayerMock);
    closePlayerMock = createStub(animationPlayerMock);

    animationHelperServiceMock = new JbAnimationHelperService(
      createStub(),
      createStub(),
      createStub()
    );
    animationHelperServiceMock.buildFlip.mockReturnValue(animationFactoryMock);
    animationHelperServiceMock.buildFlipReverse.mockReturnValue(
      animationFactoryMock
    );

    component = new JbExpansionPanelHeaderComponent(animationHelperServiceMock);
    component.button = buttonMock;

    component.icon = { nativeElement: { style: [] } };
    (component as any).openPlayer = openPlayerMock;
    (component as any).closePlayer = closePlayerMock;
  });

  describe('setFocus', () => {
    it('should update isFocused', () => {
      component.isFocused = false;
      component.setFocus(true);
      expect(component.isFocused).toBe(true);
    });
  });

  describe('focusButton', () => {
    it('should focus the button', () => {
      component.button = buttonMock;
      component.focusButton();
      expect(buttonMock.nativeElement.focus.mock.calls.length).toBe(1);
    });
  });

  describe('onClick', () => {
    it('should focus button', () => {
      component.onClick(createStub());
      expect(buttonMock.nativeElement.focus.mock.calls.length).toBe(1);
    });

    it('should emit the click event', (done) => {
      component.expand.subscribe((mouseEvent: any) => done());
      component.onClick(createStub());
    });
  });

  describe('getIconFill', () => {
    it('should return core blue if expanded', () => {
      component.isExpanded = true;
      expect(component.getIconFill()).toBe(component.CORE_BLUE);
    });

    it('should return pure white if not expanded', () => {
      component.isExpanded = false;
      expect(component.getIconFill()).toBe(component.PURE_WHITE);
    });
  });

  describe('getButtonTextColor', () => {
    it('should return core blue if expanded', () => {
      component.isExpanded = true;
      expect(component.getButtonTextColor()).toBe(component.CORE_BLUE);
    });

    it('should return pure white if not expanded', () => {
      component.isExpanded = false;
      expect(component.getButtonTextColor()).toBe(component.PURE_WHITE);
    });
  });

  describe('onHover', () => {
    it('should set isHovered to value defined by parameter', () => {
      component.isHovered = false;
      component.onHover(true);
      expect(component.isHovered).toBe(true);
    });
  });

  describe('setIsExpanded', () => {
    it('should update isExpanded', () => {
      component.isExpanded = false;
      component.setIsExpanded(true);
      expect(component.isExpanded).toBe(true);
    });

    it('should play animations if isIconAnimation is true', () => {
      const playAnimationsMock = jest.fn();

      component.iconAnimationSpeed = 299792458;
      component.ngAfterViewInit();

      component.playAnimations = playAnimationsMock;

      component.setIsExpanded(true);
      expect(playAnimationsMock.mock.calls.length).toBe(1);
    });
  });

  describe('playAnimations', () => {
    it('should play the openPlayer animation if expanded', () => {
      component.isExpanded = true;
      component.playAnimations();
      expect(openPlayerMock.play.mock.calls.length).toBe(1);
      expect(closePlayerMock.reset.mock.calls.length).toBe(1);
    });

    it('should play the closePlayer animation if not expanded', () => {
      component.isExpanded = false;
      component.playAnimations();
      expect(openPlayerMock.reset.mock.calls.length).toBe(1);
      expect(closePlayerMock.play.mock.calls.length).toBe(1);
    });
  });
});
