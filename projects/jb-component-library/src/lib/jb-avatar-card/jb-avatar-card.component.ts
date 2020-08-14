import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ContentChild,
  OnInit,
} from '@angular/core';
import { JbSeatType } from './../types/jb-seat-type.enum';
import { JbAvatarComponent } from '../jb-avatar/jb-avatar.component';

const SEAT_TYPE_COLORS = {
  [JbSeatType.default]: {
    textColor: 'white',
    backgroundColor: 'bright-blue',
  },
  [JbSeatType.mint]: {
    textColor: 'white',
    backgroundColor: 'mint-green',
  },
  [JbSeatType.core]: {
    textColor: 'white',
    backgroundColor: 'core-blue',
  },
  [JbSeatType.ems]: {
    textColor: 'white',
    backgroundColor: 'orange',
  },
};

@Component({
  selector: 'jb-avatar-card',
  templateUrl: './jb-avatar-card.component.html',
  styleUrls: ['./jb-avatar-card.component.scss'],
  host: {
    class: 'db',
  },
})
export class JbAvatarCardComponent implements OnInit, OnChanges {
  @Input() isActive = false;
  @Input() seatType: JbSeatType = JbSeatType.default;
  @Input() mosaicStatus = false;
  @ContentChild(JbAvatarComponent, { static: true })
  avatarComponent: JbAvatarComponent;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.seatType) {
      this.setAvatarColor(this.seatType);
    }
  }

  ngOnInit() {
    this.setAvatarColor(this.seatType);
  }

  private setAvatarColor(seatType: JbSeatType) {
    const { textColor, backgroundColor } = SEAT_TYPE_COLORS[seatType];
    this.avatarComponent.setColor(backgroundColor, textColor);
  }
}
