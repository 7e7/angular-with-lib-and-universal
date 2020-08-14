import { Component, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { JbTransitionType } from '../../types/jb-transition.type';

@Component({
  selector: 'jb-expandable-section',
  templateUrl: './jb-expandable-section.component.html',
  animations: [
    trigger('expandHeight', [
      state(
        'collapsed',
        style({
          height: 0,
          opacity: 0,
          visibility: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
          visibility: 'visible',
        })
      ),
      transition('collapsed <=> expanded', animate('300ms ease')),
    ]),
    trigger('expandWidth', [
      state(
        'collapsed',
        style({
          width: 0,
          opacity: 0,
          visibility: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          width: '*',
          opacity: 1,
          visibility: 'visible',
        })
      ),
      transition('collapsed <=> expanded', animate('300ms ease')),
    ]),
  ],
})
export class JbExpandableSectionComponent {
  @Input() isExpanded = false;
  @Input() direction: JbTransitionType = 'height';
  isInTransition = false;

  captureStartEvent($event: any) {
    this.isInTransition = true;
  }

  captureDoneEvent($event: any) {
    setTimeout(() => {
      this.isInTransition = false;
    }, 0);
  }
}
