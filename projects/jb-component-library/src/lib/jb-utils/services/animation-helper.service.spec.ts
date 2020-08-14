import { JbAnimationHelperService } from './animation-helper.service';
import { createStub } from '../../test-helpers';
import { AnimationFactory, AnimationMetadata } from '@angular/animations';

describe('JbAnimationHelperService', () => {
  const SPEED_OF_LIGHT = 299792458;

  let service: JbAnimationHelperService;
  let animationBuilder;

  const assertBuiltAnimation = (
    returnValue: AnimationFactory,
    expectedMetaData: AnimationMetadata[]
  ) => {
    expect(animationBuilder.build.mock.calls.length).toBe(1);
    expect(animationBuilder.build.mock.calls[0][0]).toEqual(expectedMetaData);
    expect(returnValue.create).toBeDefined();
  };

  beforeEach(() => {
    animationBuilder = createStub({
      build: jest.fn(),
    });

    animationBuilder.build.mockReturnValue({ create: jest.fn() });
    service = new JbAnimationHelperService(
      animationBuilder,
      createStub(),
      createStub()
    );
  });

  describe('createSlideIE11AnimationMetadata', () => {
    const speed = 100;
    const firstStepMarginLeft = '-20%';
    const secondStepMarginLeft = '2';

    let metaData;

    beforeEach(() => {
      metaData = service.createSlideEI11AnimationMetadata(
        speed,
        firstStepMarginLeft,
        secondStepMarginLeft
      );
    });

    it('should return an AnimationMetadata array with two elements', () => {
      expect(metaData.length).toBe(2);
    });

    it('should apply parameters to returned metadata', () => {
      expect(metaData[0].styles).toEqual({ marginLeft: firstStepMarginLeft });
      expect(metaData[1].styles.styles).toEqual({ marginLeft: '2' });
    });
  });

  describe('createFlipAnimationMetadata', () => {
    const speed = 167;
    const firstStepTransform = 'rotateX(23deg)';
    const secondStepTransform = 'rotateX(64deg)';

    let metaData;

    beforeEach(() => {
      metaData = service.createFlipAnimationMetadata(
        speed,
        firstStepTransform,
        secondStepTransform
      );
    });

    it('should return an AnimationMetadata array with two elements', () => {
      expect(metaData.length).toBe(2);
    });

    it('should apply parameters to returned metadata', () => {
      expect(metaData[0].styles).toEqual({ transform: firstStepTransform });
      expect(metaData[1].styles.styles).toEqual({
        transform: secondStepTransform,
      });
    });
  });

  describe('buildFlip', () => {
    it('should create and return the flip animation', () => {
      const expectedMetaData = service.createFlipAnimationMetadata(
        service.DEFAULT_ANIMATION_SPEED,
        service.CSS_ROTATE_X_0,
        service.CSS_ROTATE_X_180
      );

      assertBuiltAnimation(service.buildFlip(), expectedMetaData);
    });

    it('should apply speed parameter to animation', () => {
      const expectedMetaData = service.createFlipAnimationMetadata(
        SPEED_OF_LIGHT,
        service.CSS_ROTATE_X_0,
        service.CSS_ROTATE_X_180
      );

      assertBuiltAnimation(service.buildFlip(SPEED_OF_LIGHT), expectedMetaData);
    });
  });

  describe('buildFlipReverse', () => {
    it('should create and return the reverse flip animation', () => {
      const expectedMetadata = service.createFlipAnimationMetadata(
        service.DEFAULT_ANIMATION_SPEED,
        service.CSS_ROTATE_X_180,
        service.CSS_ROTATE_X_0
      );

      assertBuiltAnimation(service.buildFlipReverse(), expectedMetadata);
    });

    it('should apply speed to animation', () => {
      const expectedMetadata = service.createFlipAnimationMetadata(
        SPEED_OF_LIGHT,
        service.CSS_ROTATE_X_180,
        service.CSS_ROTATE_X_0
      );

      assertBuiltAnimation(
        service.buildFlipReverse(SPEED_OF_LIGHT),
        expectedMetadata
      );
    });
  });

  describe('buildSlideInLeftIE11', () => {
    it('should create the animation factory', () => {
      const expectedMetadata = service.createSlideEI11AnimationMetadata(
        service.DEFAULT_ANIMATION_SPEED,
        service.CSS_MARGIN_MINUS_100,
        service.CSS_MARGIN_0
      );

      assertBuiltAnimation(service.buildSlideInLeftIE11(), expectedMetadata);
    });

    it('should apply speed to animation', () => {
      const expectedMetadata = service.createSlideEI11AnimationMetadata(
        SPEED_OF_LIGHT,
        service.CSS_MARGIN_MINUS_100,
        service.CSS_MARGIN_0
      );

      assertBuiltAnimation(
        service.buildSlideInLeftIE11(SPEED_OF_LIGHT),
        expectedMetadata
      );
    });
  });

  describe('buildSlideOutLeftIE11', () => {
    it('should create the animation factory', () => {
      const expectedMetadata = service.createSlideEI11AnimationMetadata(
        service.DEFAULT_ANIMATION_SPEED,
        service.CSS_MARGIN_0,
        service.CSS_MARGIN_MINUS_100
      );

      assertBuiltAnimation(service.buildSlideOutLeftIE11(), expectedMetadata);
    });

    it('should apply speed value to animation', () => {
      const expectedMetadata = service.createSlideEI11AnimationMetadata(
        SPEED_OF_LIGHT,
        service.CSS_MARGIN_0,
        service.CSS_MARGIN_MINUS_100
      );

      assertBuiltAnimation(
        service.buildSlideOutLeftIE11(SPEED_OF_LIGHT),
        expectedMetadata
      );
    });
  });

  describe('buildSlideInRightIE11', () => {
    it('should create the animation factory', () => {
      const expectedMetadata = service.createSlideEI11AnimationMetadata(
        service.DEFAULT_ANIMATION_SPEED,
        service.CSS_MARGIN_100,
        service.CSS_MARGIN_0
      );

      assertBuiltAnimation(service.buildSlideInRightIE11(), expectedMetadata);
    });

    it('should apply speed value to animation', () => {
      const expectedMetadata = service.createSlideEI11AnimationMetadata(
        SPEED_OF_LIGHT,
        service.CSS_MARGIN_100,
        service.CSS_MARGIN_0
      );

      assertBuiltAnimation(
        service.buildSlideInRightIE11(SPEED_OF_LIGHT),
        expectedMetadata
      );
    });
  });
});
