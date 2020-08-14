import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { JbAvatarSizeEnum } from './types/jb-avatar-size.enum';

@Component({
  selector: 'jb-avatar',
  templateUrl: './jb-avatar.component.html',
  styleUrls: ['./jb-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dib',
    '[class.jb-avatar-medium]': 'isMedium',
    '[class.jb-avatar-small]': 'isSmall',
  },
})
export class JbAvatarComponent implements OnInit {
  @Input() initials: String;
  @Input() src: String;
  @Input() name = '';
  @Input() placeholderTextColor = 'white';
  @Input() placeholderBackgroundColor = 'bright-blue';
  @Input() size: JbAvatarSizeEnum = JbAvatarSizeEnum.medium;

  hasImage: boolean;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.hasImage = Boolean(this.src);
  }

  setColor(
    placeholderBackgroundColor: string,
    placeholderTextColor: string = 'white'
  ) {
    this.placeholderBackgroundColor = placeholderBackgroundColor;
    this.placeholderTextColor = placeholderTextColor;
    this.cd.markForCheck();
  }

  get isMedium(): boolean {
    return this.size === JbAvatarSizeEnum.medium;
  }

  get isSmall(): boolean {
    return this.size === JbAvatarSizeEnum.small;
  }
}
