import {
  Inject,
  Input,
  OnInit,
  ElementRef,
  Renderer2,
  Directive,
} from '@angular/core';

import { WINDOW } from './../jb-utils/injection-tokens';
import { JbVideoService } from './jb-video.service';

@Directive()
export abstract class JbVideoDirective implements OnInit {
  /** Holds the title of the video */
  @Input() title: string;
  /** Holds the caption of the video */
  @Input() caption: string;
  /** Holds the video's ID */
  @Input() videoId: string;
  /** Holds the instance of the video player */
  player;

  constructor(
    @Inject(WINDOW) private window: any,
    public videoService: JbVideoService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  /** Loads the YouTube iframe's API script */
  ngOnInit() {
    const script = this.videoService.loadScript();
    if (script) {
      this.renderer.appendChild(this.el.nativeElement, script);
    }
  }

  /** Creates and holds the instance of the YouTube's Player */
  createPlayer(elementId, eventReadyCallback?): void {
    const youtubeAPIInstance = this.window.YT;
    this.player = new youtubeAPIInstance.Player(elementId, {
      videoId: this.videoId,
      playerVars: {
        autoplay: 0,
        rel: 0,
        showinfo: 0,
      },
      events: {
        onReady: () => {
          this.player.playVideo();
          if (eventReadyCallback) {
            eventReadyCallback();
          }
        },
      },
    });
  }
}
