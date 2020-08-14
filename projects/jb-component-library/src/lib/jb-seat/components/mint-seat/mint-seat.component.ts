import { Component, Input } from '@angular/core';
import { JbSeatState } from '../../../types/jb-seat-state.enum';

@Component({
  selector: 'jb-mint-seat',
  templateUrl: './mint-seat.component.html',
  styleUrls: ['./mint-seat.component.scss'],
  host: {
    class: 'db line-height-0 relative',
    '[class.mint-green]': 'state !== "disabled"',
    '[class.off-white]': 'state === "disabled"',
  },
})
export class JbMintSeatComponent {
  @Input() state: JbSeatState = JbSeatState.available;
}
