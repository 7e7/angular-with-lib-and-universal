import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { JbChevronTypeEnum } from '../../types/jb-chevron-type.enum';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'jb-select-option',
  templateUrl: './jb-select-option.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'db pa0',
    '[class.mv2]': 'type === "standard"',
    role: 'option',
    '[attr.id]': 'id',
  },
})
export class JbSelectOptionComponent implements Highlightable {
  id: string;

  @Input() name = '';
  @Input() value: any;

  @Output() valueChanged = new EventEmitter<any>();
  @Output() blur = new EventEmitter<void>();
  @Output() mouseOver = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();

  type: JbChevronTypeEnum;
  isFocused: boolean;
  isActive: boolean;
  isHovered: boolean;
  disabled?: boolean;

  constructor(private cd: ChangeDetectorRef) {}
  setActiveStyles(): void {
    this.onSearch();
  }

  setInactiveStyles(): void {
    this.setIsHovered(false);
  }

  getLabel?(): string {
    return this.name;
  }

  setOptionId = (optionId: string) => (this.id = optionId);

  setType(type: JbChevronTypeEnum) {
    this.type = type;
    this.cd.markForCheck();
  }

  setIsHovered(isHovered: boolean) {
    this.isHovered = isHovered;
    this.cd.markForCheck();
  }

  setIsFocused(isFocused: boolean) {
    this.isFocused = isFocused;
    this.cd.markForCheck();
  }

  setIsActive(isActive: boolean) {
    this.isActive = isActive;
    this.cd.markForCheck();
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  onClick() {
    this.valueChanged.emit({ value: this.value, name: this.name });
    this.blur.emit();
  }

  onSearch() {
    this.search.emit({ value: this.value, name: this.name });
  }

  onMouse() {
    this.mouseOver.emit({ value: this.value, name: this.name });
  }
}
