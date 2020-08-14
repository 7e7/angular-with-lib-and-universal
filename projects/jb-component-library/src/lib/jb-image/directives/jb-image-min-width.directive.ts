import {
  Directive,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { JbImageComponent } from '../jb-image.component';

@Directive({
  selector: '[jbImageMinWidth]',
})
export class JbImageMinWidthDirective implements OnChanges {
  @Input() minWidth: string;

  constructor(private image: JbImageComponent, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.renderer.setStyle(
      this.image.getImageElement(),
      'min-width',
      this.minWidth
    );
  }
}
