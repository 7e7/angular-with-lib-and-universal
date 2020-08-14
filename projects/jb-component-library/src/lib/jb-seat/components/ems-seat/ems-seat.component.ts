import { Component, Input } from '@angular/core';
import { JbSeatState } from '../../../types/jb-seat-state.enum';

@Component({
  selector: 'jb-ems-seat',
  templateUrl: './ems-seat.component.html',
  styleUrls: ['./ems-seat.component.scss'],
  host: {
    class: 'db line-height-0 relative',
    '[class.orange]': 'state !== "disabled"',
    '[class.off-white]': 'state === "disabled"',
  },
})
export class JbEMSSeatComponent {
  @Input() state: JbSeatState = JbSeatState.available;
}
