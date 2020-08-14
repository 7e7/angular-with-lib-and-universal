import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'jb-hover-icon',
  template: `
    <jb-icon
      className="db"
      width="100%"
      height="100%"
      [name]="isHovered ? hoverIcon : defaultIcon"
    ></jb-icon>
  `,
  host: {
    class: 'db',
  },
})
export class JbHoverIconComponent {
  @Input() defaultIcon = '';
  @Input() hoverIcon = '';

  /** @optional */
  @Input() isHovered = false;

  @HostListener('mouseenter')
  setToHover(): void {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  setToDefault(): void {
    this.isHovered = false;
  }
}
