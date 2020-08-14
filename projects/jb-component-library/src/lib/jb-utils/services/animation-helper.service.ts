import { Injectable, Inject } from '@angular/core';
import {
  style,
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationMetadata,
} from '@angular/animations';
import { DOCUMENT, WINDOW } from '../injection-tokens';

/**
 * This class is a thin wrapper around AnimationBuilder.
 * It provides methods to create common animations with variable speed.
 */

@Injectable({
  providedIn: 'root',
})
export class JbAnimationHelperService {
  readonly CSS_ROTATE_X_0 = 'rotateX(0deg)';
  readonly CSS_ROTATE_X_180 = 'rotateX(180deg)';

  readonly CSS_MARGIN_MINUS_100 = '-100%';
  readonly CSS_MARGIN_100 = '100%';
  readonly CSS_MARGIN_0 = '0';

  readonly DEFAULT_ANIMATION_SPEED = 300;

  /**
   * IE11 has a bug where it does not do calc() inside the css transition.
   * This is why we use negative marging for slide animation instaed of transition.
   */
  private readonly isIE11: boolean;

  /**
   * Default speed for animations
   */
  private defaultSpeed = this.DEFAULT_ANIMATION_SPEED;

  constructor(
    private animationBuilder: AnimationBuilder,
    @Inject(DOCUMENT) private document,
    @Inject(WINDOW) private window
  ) {
    // This will detect IE11
    this.isIE11 =
      !!this.window.MSInputMethodContext && !!this.document.documentMode;
  }

  /**
   * transform: rotateX(0deg) => rotateX(180deg)
   */
  buildFlip(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build(
      this.createFlipAnimationMetadata(
        speed,
        this.CSS_ROTATE_X_0,
        this.CSS_ROTATE_X_180
      )
    );
  }

  /**
   * transform Reverse: rotateX(180deg) => rotateX(0deg)
   */
  buildFlipReverse(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build(
      this.createFlipAnimationMetadata(
        speed,
        this.CSS_ROTATE_X_180,
        this.CSS_ROTATE_X_0
      )
    );
  }

  /**
   * transform: rotateY(0deg) => rotateY(180deg)
   */
  buildMirror(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build([
      style({ transform: 'rotateY(0deg)' }),
      animate(speed, style({ transform: 'rotateY(180deg)' })),
    ]);
  }

  /**
   * transform: rotateY(180deg) => rotateY(0deg)
   */
  buildMirrorReverse(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build([
      style({ transform: 'rotateY(180deg)' }),
      animate(speed, style({ transform: 'rotateY(0deg)' })),
    ]);
  }

  /**
   * transform: rotateZ(0deg) => rotateZ(180deg)
   */
  buildRotate180(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build([
      style({ transform: 'rotateX(0deg)' }),
      animate(speed, style({ transform: 'rotateZ(180deg)' })),
    ]);
  }

  /**
   * transform: rotateZ(180deg) => rotateZ(0deg)
   */
  buildRotate180Reverse(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build([
      style({ transform: 'rotateZ(180deg)' }),
      animate(speed, style({ transform: 'rotateZ(0deg)' })),
    ]);
  }

  /**
   * opacity: 0 => 1
   */
  buildFadeIn(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build([
      style({ opacity: 0 }),
      animate(speed, style({ opacity: 1 })),
    ]);
  }

  /**
   * opacity: 1 => 0
   */
  buildFadeOut(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build([
      style({ opacity: 1 }),
      animate(speed, style({ opacity: 0 })),
    ]);
  }

  /**
   * transform: translateX(-100%) => translateX(0)
   */
  buildSlideInLeft(speed: number = this.defaultSpeed): AnimationFactory {
    return this.isIE11
      ? this.buildSlideInLeftIE11(speed)
      : this.animationBuilder.build([
          style({ transform: 'translateX(-100%)' }),
          animate(speed, style({ transform: 'translateX(0)' })),
        ]);
  }

  /**
   * transform: translateX(0) => translateX(-100%)
   */
  buildSlideOutLeft(speed: number = this.defaultSpeed): AnimationFactory {
    return this.isIE11
      ? this.buildSlideOutLeftIE11(speed)
      : this.animationBuilder.build([
          style({ transform: 'translateX(0)' }),
          animate(speed, style({ transform: 'translateX(-100%)' })),
        ]);
  }

  /**
   * transform: translateX(100%) => translateX(0)
   */
  buildSlideInRight(speed: number = this.defaultSpeed): AnimationFactory {
    return this.isIE11
      ? this.buildSlideInRightIE11(speed)
      : this.animationBuilder.build([
          style({ transform: 'translateX(100%)' }),
          animate(speed, style({ transform: 'translateX(0)' })),
        ]);
  }

  /**
   * transform: translateX(0) => translateX(100%)
   */
  buildSlideOutRight(speed: number = this.defaultSpeed): AnimationFactory {
    return this.isIE11
      ? this.buildSlideOutRightIE11(speed)
      : this.animationBuilder.build([
          style({ transform: 'translateX(0)' }),
          animate(speed, style({ transform: 'translateX(100%)' })),
        ]);
  }

  /**
   * margin-left: -100% => 0
   */
  buildSlideInLeftIE11(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build(
      this.createSlideEI11AnimationMetadata(
        speed,
        this.CSS_MARGIN_MINUS_100,
        this.CSS_MARGIN_0
      )
    );
  }

  /**
   * margin-left: 0 => -100%
   */
  buildSlideOutLeftIE11(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build(
      this.createSlideEI11AnimationMetadata(
        speed,
        this.CSS_MARGIN_0,
        this.CSS_MARGIN_MINUS_100
      )
    );
  }

  /**
   * margin-left: 100% => 0
   */
  buildSlideInRightIE11(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build(
      this.createSlideEI11AnimationMetadata(
        speed,
        this.CSS_MARGIN_100,
        this.CSS_MARGIN_0
      )
    );
  }

  /**
   * margin-left: 0 => 100%
   */
  buildSlideOutRightIE11(speed: number = this.defaultSpeed): AnimationFactory {
    return this.animationBuilder.build(
      this.createSlideEI11AnimationMetadata(
        speed,
        this.CSS_MARGIN_0,
        this.CSS_MARGIN_100
      )
    );
  }

  /*
   * Helpers
   */

  createSlideEI11AnimationMetadata(
    speed: number,
    firstStepMarginLeft: string,
    secondStepMarginLeft: string
  ): AnimationMetadata[] {
    return [
      style({ marginLeft: firstStepMarginLeft }),
      animate(speed, style({ marginLeft: secondStepMarginLeft })),
    ];
  }

  createFlipAnimationMetadata(
    speed: number,
    firstStepTransform: string,
    secondStepTransform: string
  ): AnimationMetadata[] {
    return [
      style({ transform: firstStepTransform }),
      animate(speed, style({ transform: secondStepTransform })),
    ];
  }
}
