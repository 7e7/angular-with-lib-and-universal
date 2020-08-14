import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
} from '@angular/core';
import { JbSegment } from '../types/jb-segment.interface';

let id = 0;
const DEFAULT_LEGEND = 'Please select an option';

@Component({
  selector: 'jb-segmented-control',
  templateUrl: './jb-segmented-control.component.html',
})
export class JbSegmentedControlComponent implements AfterContentInit {
  id = `jb-segmented-control-${id++}`;

  @Input() value: any;
  @Input() ariaLabel = DEFAULT_LEGEND;
  @Input() segments: JbSegment[];
  @Output() selectChange = new EventEmitter<any>();

  handleChange(value: any) {
    this.selectChange.emit(value);
  }

  ngAfterContentInit(): void {
    if (this.ariaLabel === DEFAULT_LEGEND) {
      console.warn(
        'An ariaLabel input must be provided to jb-segmented-control'
      );
    }
  }
}
