import {
  Component,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'jb-filters-button',
  templateUrl: './jb-filters-button.component.html',
  styleUrls: ['./jb-filters-button.component.scss'],
  host: { class: 'mr2' },
})
export class JbFiltersButtonComponent {
  @ViewChild('button') button: ElementRef;

  @Output() click = new EventEmitter<void>();
  @Output() tab = new EventEmitter<KeyboardEvent>();

  isActive = false;
  isApplied = false;

  setFocus() {
    this.button.nativeElement.focus();
  }
}
