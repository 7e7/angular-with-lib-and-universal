import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { JbIconComponent } from '../../../jb-icon/jb-icon.component';

@Component({
  selector: 'jb-bullet-list-item',
  templateUrl: './jb-bullet-list-item.component.html',
  styleUrls: ['./jb-bullet-list-item.component.scss'],
  host: {
    role: 'listitem',
    class: 'charcoal flex flex-row items-start',
  },
})
export class JbBulletListItemComponent implements AfterViewInit {
  @Input() bulletIcon: string;
  @Input() bulletColor: string;
  @Input() bulletSize: string;

  @ViewChild(JbIconComponent) bullet: JbIconComponent;

  ngAfterViewInit() {
    if (this.bulletSize) {
      this.updateBulletSize(this.bulletSize);
    }
  }

  updateBulletSize(bulletSize: string) {
    this.bulletSize = bulletSize;
    this.bullet.setIconSize(this.bulletSize, this.bulletSize);
  }
}
