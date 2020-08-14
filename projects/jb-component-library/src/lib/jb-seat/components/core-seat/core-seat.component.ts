import { Component, Input } from '@angular/core';
import { JbSeatState } from '../../../types/jb-seat-state.enum';

@Component({
  selector: 'jb-core-seat',
  templateUrl: './core-seat.component.html',
  styleUrls: ['./core-seat.component.scss'],
  host: {
    class: 'db line-height-0 relative',
    '[class.core-blue]': 'state !== "disabled"',
    '[class.off-white]': 'state === "disabled"',
  },
})
export class JbCoreSeatComponent {
  @Input() state: JbSeatState = JbSeatState.available;
}
