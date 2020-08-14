import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  ContentChild,
  SimpleChanges,
  OnInit,
  OnChanges,
  AfterViewInit,
  AfterContentInit,
} from '@angular/core';
import { AnimationPlayer } from '@angular/animations';
import { JbAnimationHelperService } from '../../jb-utils/services/animation-helper.service';
import { JbExpansionPanelHeaderExpandedOnlyContentComponent } from './jb-expansion-panel-header-expanded-only-content.component';
import { JbExpansionPanelHeaderIconStyle } from './types/jb-expansion-panel-header-icon-style.type';
import { JbExpansionPanelHeaderIconNameEnum } from './types/jb-expansion-panel-header-icon-name.enum';

const ICON_DIMENSIONS = {
  small: 9,
  large: 18,
};

@Component({
  selector: 'jb-expansion-panel-header',
  templateUrl: './jb-expansion-panel-header.component.html',
  styleUrls: ['./jb-expansion-panel-header.component.scss'],
  host: {
    class:
      'jb-expansion-panel-header flex justify-between items-center w-100 b--medium-gray',
    '[class.h3]': 'isPrimary',
    '[class.bt]': '!isPrimary',
    '[class.bg-off-white]': 'isExpanded && isPrimary',
    '[class.bg-core-blue]': '!isExpanded && isPrimary',
    '[class.bg-transparent]': '!isExpanded && !isPrimary',
    '[class.bg-royal-blue]': '!isExpanded && isPrimary && isHovered',
    '[class.bg-sky-blue-transparent]': '!isExpanded && !isPrimary && isHovered',
    '[class.secondary-header-bt]': '!isPrimary',
    '(mouseenter)': 'onHover(true)',
    '(mouseleave)': 'onHover(false)',
    '(touchstart)': 'onHover(false)',
  },
})
export class JbExpansionPanelHeaderComponent
  implements OnInit, OnChanges, AfterViewInit, AfterContentInit {
  readonly PURE_WHITE = '#fff';
  readonly CORE_BLUE = '#1d2758';

  /** A flag to hide or show the chevron icon. */
  @Input() showToggle = true;
  /** A Flag to use primary or secondary styling. */
  @Input() isPrimary = true;
  /** Animation speed of the icon in ms. 0 or negative - no animation. */
  @Input() iconAnimationSpeed = 300;
  @Input() iconStyle: JbExpansionPanelHeaderIconStyle = 'large';
  /** Emitter for the click event.  */
  @Output() expand = new EventEmitter();

  /** Reference to the button element in template. */
  @ViewChild('jbExpansionPanelHeaderButton')
  button: ElementRef;
  /** Icon element to attach animations */
  @ViewChild('jbExpansionPanelHeaderIcon', { read: ElementRef })
  icon: ElementRef;

  @ContentChild(JbExpansionPanelHeaderExpandedOnlyContentComponent)
  expandedOnlyContent: JbExpansionPanelHeaderExpandedOnlyContentComponent;
  iconName: string;
  iconDimensions: string;
  iconFill: string;

  /** The expanded state of the header set by the panel */
  contentWillChangeWhenExpanded = false;
  isExpanded: boolean;
  isFocused = false;
  isHovered = false;
  /** Aria controls attribute set by the panel. */
  ariaControls: string;

  private doesIconAnimate = false;
  private openPlayer: AnimationPlayer;
  private closePlayer: AnimationPlayer;

  constructor(private animationBuilderHelper: JbAnimationHelperService) {}

  ngOnInit() {
    this.iconDimensions = this.getIconDimensions();
    this.iconName = this.getIconName();
    this.iconFill = this.getIconFill();
  }

  /** Set up animations */
  ngAfterViewInit() {
    this.doesIconAnimate = this.iconAnimationSpeed > 0;
    this.updateAnimations();
  }

  ngAfterContentInit() {
    if (this.expandedOnlyContent) {
      this.contentWillChangeWhenExpanded = true;
    }
  }

  /** Change detection to run expand logic. */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.iconAnimationSpeed) {
      const newSpeed = changes.iconAnimationSpeed.currentValue;
      this.doesIconAnimate = newSpeed > 0;
      this.iconAnimationSpeed = newSpeed;
      this.updateAnimations();
    }
    if (changes.isExpanded) {
      this.setIsExpanded(changes.isExpanded.currentValue);
    }
    if (changes.iconStyle) {
      this.iconDimensions = this.getIconDimensions();
      this.iconName = this.getIconName();
    }
    if (changes.isPrimary) {
      this.iconFill = this.getIconFill();
    }
  }

  setIsExpanded(isExpanded: boolean) {
    if (this.isExpanded === isExpanded) {
      return;
    }
    this.isExpanded = isExpanded;
    if (this.isPrimary) {
      this.iconFill = this.getIconFill();
    }

    if (this.doesIconAnimate && this.icon) {
      this.playAnimations();
    }
  }

  playAnimations() {
    if (this.isExpanded) {
      this.openPlayer.play();
      this.closePlayer.reset();
    } else {
      this.closePlayer.play();
      this.openPlayer.reset();
    }
  }

  /** Explicitly sets the focus state. */
  setFocus(focus: boolean) {
    this.isFocused = focus;
  }

  /** Focuses on the button element of the header. */
  focusButton() {
    this.button.nativeElement.focus();
  }

  /** Emits the click event. */
  onClick(event: MouseEvent) {
    this.focusButton();
    this.expand.emit();
  }

  /** Gets the icon fill color. */
  getIconFill() {
    if (this.isPrimary) {
      return this.isExpanded ? this.CORE_BLUE : this.PURE_WHITE;
    }

    return this.CORE_BLUE;
  }

  getIconDimensions() {
    return `${ICON_DIMENSIONS[this.iconStyle]}px`;
  }

  getIconName() {
    return JbExpansionPanelHeaderIconNameEnum[this.iconStyle];
  }

  /** Getes the button text color. */
  getButtonTextColor() {
    return this.getIconFill();
  }

  /** Sets the hover state. */
  onHover(hover: boolean) {
    this.isHovered = hover;
  }

  /** Updates animation players for icon element. Disables it or sets animation speed */
  private updateAnimations() {
    if (this.openPlayer) {
      this.openPlayer.destroy();
    }
    if (this.closePlayer) {
      this.closePlayer.destroy();
    }

    if (!this.doesIconAnimate || !this.icon) {
      return;
    }

    this.icon.nativeElement.style[''] = '';

    this.openPlayer = this.animationBuilderHelper
      .buildFlip(this.iconAnimationSpeed)
      .create(this.icon.nativeElement);

    this.closePlayer = this.animationBuilderHelper
      .buildFlipReverse(this.iconAnimationSpeed)
      .create(this.icon.nativeElement);

    if (this.isExpanded) {
      this.openPlayer.finish();
      this.closePlayer.reset();
    } else {
      // THIS LINE BREAKS TESTS
      this.closePlayer.finish();

      this.openPlayer.reset();
    }
  }
}
