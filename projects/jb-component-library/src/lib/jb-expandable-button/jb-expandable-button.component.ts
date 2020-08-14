import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JbChevronIconSizeEnum } from '../types/jb-chevron-icon-size.enum';

@Component({
  selector: 'jb-expandable-button',
  templateUrl: './jb-expandable-button.component.html',
  styleUrls: ['./jb-expandable-button.component.scss'],
})
export class JbExpandableButtonComponent {
  iconSizes = JbChevronIconSizeEnum;

  @Input() value = false;
  @Input() ariaLabel: string;
  @Input() ariaDescribedBy: string;
  @Input() iconSize: JbChevronIconSizeEnum = JbChevronIconSizeEnum.compact;
  @Input() hasError = false;

  @Output() toggle = new EventEmitter<boolean>();

  onClick() {
    this.toggle.emit(!this.value);
  }
}
