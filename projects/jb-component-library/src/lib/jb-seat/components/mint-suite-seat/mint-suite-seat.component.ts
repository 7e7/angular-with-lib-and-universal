import { Component, Input } from '@angular/core';
import { JbSeatState } from '../../../types/jb-seat-state.enum';

@Component({
  selector: 'jb-mint-suite-seat',
  templateUrl: './mint-suite-seat.component.html',
  styleUrls: ['./mint-suite-seat.component.scss'],
  host: {
    class: 'db line-height-0 relative',
    '[class.mint-green]': 'state !== "disabled"',
    '[class.off-white]': 'state === "disabled"',
    '[class.left]': 'side === "left"',
    '[class.right]': 'side === "right"',
  },
})
export class JbMintSuiteSeatComponent {
  @Input() side: 'left' | 'right' = 'left';
  @Input() state: JbSeatState = JbSeatState.available;
  @Input() textColor = 'black';
}
