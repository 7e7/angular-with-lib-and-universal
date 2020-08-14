import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-background',
  templateUrl: './jb-background.component.html',
  host: { class: 'db absolute absolute--fill' },
})
export class JbBackgroundComponent {
  @Input() src = '';
  @Input() color = '';
  @Input() repeat = false;

  get patternBackground() {
    return {
      'background-color': this.color,
      'background-image': `url("${this.src}")`,
      'background-repeat': this.repeat ? 'repeat' : 'no-repeat',
      'background-size': this.repeat ? '' : 'cover',
      'background-position': this.repeat ? '' : 'center',
    };
  }
}
