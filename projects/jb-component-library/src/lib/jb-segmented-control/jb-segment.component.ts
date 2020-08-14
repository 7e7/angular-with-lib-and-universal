import { Component, Input, Output, EventEmitter } from '@angular/core';

let id = 0;

@Component({
  selector: 'jb-segment',
  templateUrl: './jb-segment.component.html',
  styleUrls: ['./jb-segment.component.scss'],
  host: {
    class: 'flex flex-auto ba content-center bg-white border-box h2',
    '[class.checked]': 'checked',
    '[class.b--royal-blue]': 'checked',
    '[class.b--medium-gray]': '!checked',
  },
})
export class JbSegmentComponent {
  id = `jb-segment-${id++}`;

  @Input() checked: boolean;
  @Input() value: string;
  @Input() label: string;
  @Input() name = 'segments';
  @Output() valueChange = new EventEmitter<any>();

  handleChange(value: any) {
    this.valueChange.emit(value);
  }
}
