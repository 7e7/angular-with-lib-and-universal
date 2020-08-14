import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function createTransformIconTrigger(): AnimationTriggerMetadata {
  return trigger('transformIcon', [
    state(
      'true',
      style({
        transform: 'rotateX(180deg)',
      })
    ),
    transition('void => *', animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
  ]);
}
