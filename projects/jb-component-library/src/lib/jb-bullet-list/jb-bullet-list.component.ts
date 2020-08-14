import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  Renderer2,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { JbBulletListItemComponent } from './components/jb-bullet-list-item/jb-bullet-list-item.component';

@Component({
  selector: 'jb-bullet-list',
  templateUrl: './jb-bullet-list.component.html',
  host: {
    class: 'copy',
  },
})
export class JbBulletListComponent implements AfterContentInit, OnChanges {
  @Input() previewCount: number;
  @Input() bulletSize: string;
  @Input() bulletIcon = 'bullet';
  @Input() bulletColor = 'black';
  @Input() expandMessage = '';
  @Input() collapseMessage = '';

  @ContentChildren(JbBulletListItemComponent, { read: ElementRef })
  listItemElements: QueryList<ElementRef>;

  @ContentChildren(JbBulletListItemComponent) listItems: QueryList<
    JbBulletListItemComponent
  >;
  @ViewChild('listContainer', { read: ElementRef, static: true })
  listContainer: ElementRef;

  isExpanded = false;
  displayAllItems = false;
  attributes: Record<string, string> = {};

  constructor(private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    // update the attributes
    if (changes.bulletIcon) {
      this.attributes['bulletIcon'] = this.bulletIcon;
    }
    if (changes.bulletColor) {
      this.attributes['bulletColor'] = this.bulletColor;
    }
    if (this.bulletSize && changes.bulletSize) {
      this.attributes['bulletSize'] = this.bulletSize;
    }

    if (
      (changes.bulletIcon || changes.bulletColor || changes.bulletSize) &&
      this.listItems
    ) {
      this.updateBulletProperties();
    }
  }

  ngAfterContentInit() {
    if (
      !this.previewCount ||
      this.listItemElements.length <= this.previewCount
    ) {
      this.displayAllItems = true;
      this.previewCount = this.listItemElements.length;
    }

    // update the attributes
    this.attributes['bulletIcon'] = this.bulletIcon;
    this.attributes['bulletColor'] = this.bulletColor;
    if (this.bulletSize) {
      this.attributes['bulletSize'] = this.bulletSize;
    }

    setTimeout(() => {
      this.updateBulletProperties();
    });

    const items = this.listItemElements.toArray();
    items.slice(0, this.previewCount).forEach((item) => {
      this.toggleListItem(item, true);
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;

    const items = this.listItemElements.toArray();
    items.slice(this.previewCount).forEach((item) => {
      this.toggleListItem(item, this.isExpanded);
    });
  }

  private toggleListItem(item: ElementRef, show: boolean) {
    show
      ? this.renderer.appendChild(
          this.listContainer.nativeElement,
          item.nativeElement
        )
      : this.renderer.removeChild(
          this.listContainer.nativeElement,
          item.nativeElement
        );
  }

  private updateBulletProperties() {
    this.listItems.forEach((item) => {
      Object.keys(this.attributes).forEach((key) => {
        if (!item[key] && key === 'bulletSize') {
          item.updateBulletSize(this.attributes[key]);
        } else if (!item[key]) {
          item[key] = this.attributes[key];
        }
      });
    });
  }
}
