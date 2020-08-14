import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { JbHorizontalScrollerDirectionEnum } from '../types/jb-horizontal-scroller-direction.enum';

@Component({
  selector: 'jb-horizontal-scroller-button',
  templateUrl: './jb-horizontal-scroller-button.component.html',
  styleUrls: ['./jb-horizontal-scroller-button.component.scss'],
  host: {
    class: 'flex-none bg-none',
    '[class.left-0]': 'isLeft',
    '[class.right-0]': 'isRight',
  },
})
export class JbHorizontalScrollerButtonComponent implements OnChanges {
  @Input() direction: JbHorizontalScrollerDirectionEnum;
  @Input() isVisible = false;
  @Input() isDisabled = false;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  ariaLabel: string;
  isLeft: boolean;
  isRight: boolean;

  constructor(public elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isLeft = this.direction === JbHorizontalScrollerDirectionEnum.left;
    this.isRight = this.direction === JbHorizontalScrollerDirectionEnum.right;
    this.ariaLabel = `Move ${this.direction}`;
  }

  getWidth(): number {
    return this.elementRef.nativeElement.firstElementChild.clientWidth;
  }
}
