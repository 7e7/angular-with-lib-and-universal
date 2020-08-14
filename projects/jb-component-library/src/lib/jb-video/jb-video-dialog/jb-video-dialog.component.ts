import { Component, OnInit } from '@angular/core';

import { JbVideoDirective } from '../jb-video.directive';

@Component({
  templateUrl: './jb-video-dialog.component.html',
})
export class JbVideoDialogComponent extends JbVideoDirective implements OnInit {
  /** Creates and plays the video - see base class for the function declaration. */
  ngOnInit() {
    this.createPlayer('player');
  }
}
