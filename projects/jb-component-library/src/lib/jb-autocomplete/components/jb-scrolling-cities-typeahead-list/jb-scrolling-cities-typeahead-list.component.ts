import {
  Component,
  OnChanges,
  SimpleChanges,
  ViewChild,
  QueryList,
  ElementRef,
  ViewChildren,
  Input,
} from '@angular/core';
import { JbCity } from '../../types/jb-city.interface';
import { JbTypeaheadListDirective } from '../../jb-typeahead-list.directive';

@Component({
  selector: 'jb-scrolling-cities-typeahead-list',
  templateUrl: './jb-scrolling-cities-typeahead-list.component.html',
  styleUrls: ['./jb-scrolling-cities-typeahead-list.component.scss'],
})
export class JbScrollingCitiesTypeaheadListComponent
  extends JbTypeaheadListDirective
  implements OnChanges {
  @Input() isPopUpFocused: boolean;

  @ViewChild('listContainer') listContainer: ElementRef;

  @ViewChildren('listItem') listItem: QueryList<ElementRef>;

  ngOnChanges(changes: SimpleChanges): void {
    this.visible = !this.hidden && this.options.length > 0;

    this.options.forEach((option: JbCity) => {
      option.fillColor = this.getFillColor(option);
      option.hasIcon = option.iconName !== undefined;
    });
  }

  onHover(i: number) {
    // If we are in the middle of a keypress event, ignore the hover so the
    // cursor doesn't jump.
    if (!this.isKeyPressed) {
      this.hover.emit(i);
    }
  }

  // Ensures that the indexed item in the list is visible
  scrollToIndex(index) {
    if (!this.listItem) {
      return;
    }
    const numItems = this.listItem.length;
    if (numItems === 0 || index >= this.listItem.length) {
      return;
    }

    if (index === 0) {
      this.listContainer.nativeElement.scrollTop = 0;
      return;
    }

    const activeOption = this.listItem.toArray()[index];
    const activeElementRect: ClientRect = activeOption.nativeElement.getBoundingClientRect();
    const listContainerRect: ClientRect = this.listContainer.nativeElement.getBoundingClientRect();

    // If the active element is above the list container make it visible as the first element
    if (listContainerRect.top > activeElementRect.top) {
      const firstItem = this.listItem.first;
      this.listContainer.nativeElement.scrollTop =
        activeElementRect.top -
        firstItem.nativeElement.getBoundingClientRect().top;
    }

    // If the active element is below the list container make it visible as the last element
    const FOCUS_PADDING = 16; // based on pv2 in template
    if (listContainerRect.bottom < activeElementRect.bottom) {
      const firstItem = this.listItem.first;
      this.listContainer.nativeElement.scrollTop =
        activeElementRect.bottom -
        firstItem.nativeElement.getBoundingClientRect().top -
        listContainerRect.height +
        FOCUS_PADDING;
    }
  }

  private getFillColor = (option: JbCity): string =>
    option.iconName === this.MINT_ICON ? this.MINT_GREEN : this.SLATE_GRAY;
}
