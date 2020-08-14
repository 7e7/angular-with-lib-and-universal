import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CloseButtonSize } from './types/jb-button-close-size.enum';
import { CloseButtonFill } from './types/jb-button-close-color.enum';

let uniqueId = 0;

@Component({
  selector: 'jb-button-close',
  templateUrl: 'jb-button-close.component.html',
  host: {
    '[attr.id]': 'id',
  },
})
export class JbButtonCloseComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() size: CloseButtonSize = CloseButtonSize.SMALL;
  @Input() fill: CloseButtonFill = CloseButtonFill.WHITE;

  id: string;

  ngOnInit(): void {
    this.id = `jb-button-close-${uniqueId++}`;
  }

  get isLarge() {
    return this.size === CloseButtonSize.LARGE;
  }
  get isSmall() {
    return this.size === CloseButtonSize.SMALL;
  }
  get svgFill() {
    return this.fill;
  }
  onClick() {
    this.close.emit();
  }
}
