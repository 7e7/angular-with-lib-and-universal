import {
  Component,
  Input,
  OnInit,
  Inject,
  ElementRef,
  Renderer2,
} from '@angular/core';

import { JbVideoDirective } from './jb-video.directive';
import { JbDialogService } from './../jb-dialog/jb-dialog.service';
import { JbVideoDialogComponent } from './jb-video-dialog/jb-video-dialog.component';
import { JbVideoService } from './jb-video.service';
import { JbDeviceService } from '../jb-utils/services/device-service';
import { WINDOW } from './../jb-utils/injection-tokens';

// Used to identify the iframe (handles having more than one video on the same page)
let uniqueId = 0;

@Component({
  selector: 'jb-video',
  templateUrl: './jb-video.component.html',
  host: {
    class: 'db h-100 w-100',
  },
  styleUrls: ['./jb-video.component.scss'],
})
export class JbVideoComponent extends JbVideoDirective implements OnInit {
  /** Determines whether it's played inside a modal or not */
  @Input() openInModal = false;
  /** Unique identifier for the iframes (multiple videos in a single page) */
  domElementId = `player-${uniqueId++}`;
  /** Determines whether the thumbnail has been clicked or not */
  thumbnailIsClicked = false;

  constructor(
    @Inject(WINDOW) window: any,
    videoService: JbVideoService,
    renderer: Renderer2,
    private element: ElementRef,
    public dialogService: JbDialogService,
    public deviceService: JbDeviceService
  ) {
    super(window, videoService, element, renderer);
  }
  /** When the thumbnail is clicked, it'll determine whether it opens on a modal or just plays on native */
  handleOnClick(): void {
    if (this.shouldOpenInModal()) {
      this.openModal(this.getDefaultButton());
      return;
    }

    this.playVideo();
  }

  shouldOpenInModal(): boolean {
    return this.openInModal && !this.deviceService.isDevice();
  }

  /** Appends a modal and sends in the url of the video. The video will autoplay.
   * @param defaultButton: An HTML Element that holds the reference of the button that opened the modal. It's
   * used to refocus after the dialog is closed.
   */
  openModal(defaultButton: HTMLElement): void {
    const instance = this.dialogService.openDialog(
      JbVideoDialogComponent,
      defaultButton
    );
    instance.title = this.title;
    instance.videoId = this.videoId;
    instance.caption = this.caption;
  }

  getDefaultButton(): HTMLElement {
    return this.element.nativeElement.querySelector(
      'jb-video-thumbnail > button'
    ) as HTMLElement;
  }

  /** Unloads the thumbnail and plays the corresponding iframe */
  playVideo(): void {
    if (!this.player) {
      this.createPlayer(this.domElementId);
    }
    this.thumbnailIsClicked = true;
  }
}
