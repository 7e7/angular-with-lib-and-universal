import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { JbTabNavigationScrollDirection } from '../types/jb-tab-navigation-scroll-direction.enum';
import { JbThemeEnum } from '../../types/jb-theme.enum';

@Component({
  selector: 'jb-tab-navigation-scroll-button',
  templateUrl: './jb-tab-navigation-scroll-button.component.html',
  styleUrls: ['./jb-tab-navigation-scroll-button.component.scss'],
  host: {
    class: 'flex-none top-0 dn db-ns absolute z-1 bg-none',
    '[class.left-0]': 'isLeft',
    '[class.right-0]': 'isRight',
  },
})
export class JbTabNavigationScrollButtonComponent implements OnChanges {
  @Input() direction: JbTabNavigationScrollDirection;
  @Input() isLightTheme = true;
  @Input() theme: JbThemeEnum;

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('tabGroupButton') tabGroupButton: ElementRef;

  isDarkTheme: boolean;
  isLeft: boolean;
  isRight: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    this.isLeft = this.direction === JbTabNavigationScrollDirection.left;
    this.isRight = this.direction === JbTabNavigationScrollDirection.right;
    this.isLightTheme = this.theme === JbThemeEnum.light;
    this.isDarkTheme = this.theme === JbThemeEnum.dark;
  }

  getLeft() {
    return this.tabGroupButton.nativeElement.getBoundingClientRect().left;
  }
}
