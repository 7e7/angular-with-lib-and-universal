import { Component, EventEmitter, Input, HostListener } from '@angular/core';
@Component({
  selector: 'jb-video-thumbnail',
  templateUrl: './jb-video-thumbnail.component.html',
  host: {
    class: 'h-100',
  },
  styleUrls: ['./jb-video-thumbnail.component.scss'],
})
export class JbVideoThumbnailComponent {
  /** Sets and gets a thumbnail from YouTube based on the video's id  */
  @Input()
  get thumbnailUrl(): string {
    return this.url;
  }
  set thumbnailUrl(value: string) {
    this.url = `https://img.youtube.com/vi/${value}/maxresdefault.jpg`;
  }
  /** Holds the title for the image alt */
  @Input() title = '';
  /** Holds the url of the thumbnail */
  url: string;
  /** Event Emitter - to emit a function after the thumbnail is clicked */
  click: EventEmitter<void> = new EventEmitter(true);
  /** Holds the value of the hovered state */
  isHovered: boolean;

  /** Sets the hover state to change the icon back to hovered */
  @HostListener('mouseover')
  onMouseOver(): void {
    this.isHovered = true;
  }

  /** Resets the hover state to change the icon back to default */
  @HostListener('mouseleave')
  onMouseOut(): void {
    this.isHovered = false;
  }

  /** Emits an event onclick */
  emitEvent(): void {
    this.click.emit();
  }
}
