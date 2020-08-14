import { Component, Input } from '@angular/core';
import { JbSeatState } from '../types/jb-seat-state.enum';
import { JbSeatType } from '../types/jb-seat-type.enum';

@Component({
  selector: 'jb-seat',
  templateUrl: './jb-seat.component.html',
  styleUrls: ['./jb-seat.component.scss'],
  host: {
    '[class.mint]': 'type === "mint" && state !== "disabled"',
    '[class.mint-studio]': 'type === "mintStudio" && state !== "disabled"',
    '[class.mint-suite]': 'type === "mintSuite" && state !== "disabled"',
    '[class.ems]': 'type === "ems"  && state !== "disabled"',
    '[class.core]': 'type === "core"  && state !== "disabled" ',
  },
})
export class JbSeatComponent {
  @Input() interactive = true;
  @Input() type: JbSeatType;
  @Input() state: JbSeatState;
  @Input() padding = true;
  @Input() ariaLabel: string;

  // Mint only
  @Input() side: 'left' | 'right' = 'left';
  @Input() front = false;
}
