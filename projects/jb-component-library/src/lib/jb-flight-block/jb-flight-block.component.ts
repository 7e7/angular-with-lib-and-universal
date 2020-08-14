import {
  ContentChild,
  Component,
  Input,
  Output,
  AfterContentInit,
  EventEmitter,
} from '@angular/core';

import { JbImageComponent } from '../jb-image/jb-image.component';
import { JbFlagComponent } from '../jb-flag/jb-flag.component';

@Component({
  selector: 'jb-flight-block',
  templateUrl: './jb-flight-block.component.html',
  styleUrls: ['./jb-flight-block.component.scss'],
  host: {
    class: 'flex relative',
    '[class.cursor-not-allowed]': '!available',
  },
})
export class JbFlightBlockComponent implements AfterContentInit {
  @Input() link = '';
  @Input() available = true;
  @Input() target = '_self';
  @Input() hasLegalLink = true;
  @Input() hasButton = true;
  @Output() onLegalLinkClick: EventEmitter<Event> = new EventEmitter();

  @ContentChild(JbImageComponent) image: JbImageComponent;
  @ContentChild(JbFlagComponent) flag: JbFlagComponent;

  hasFlag = false;
  hasImage = false;

  ngAfterContentInit() {
    if (this.image) {
      this.hasImage = true;
    }

    if (this.flag) {
      this.hasFlag = true;
    }
  }

  LegalLinkClicked(event) {
    // Ensure that only the button gets triggered and not the link
    event.preventDefault();
    this.onLegalLinkClick.emit(event);
  }

  /**
   * This function prevents the disabled link to redirect after after it got focused and enter key got pressed.
   * @return true if link is active, false otherwise
   */
  linkClicked(): boolean {
    return !!this.link;
  }
}
