import {
  Component,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  ContentChild,
  AfterContentInit,
  HostListener,
  OnDestroy,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { JbDrawerHeaderComponent } from './jb-drawer-header/jb-drawer-header.component';
import { ClickOutsideService } from '../jb-utils/services/click-outside.service';
import { Subscription } from 'rxjs';
import { Toggleable } from '../types/jb-toggleable.interface';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'jb-drawer',
  styleUrls: ['jb-drawer.component.scss'],
  templateUrl: './jb-drawer.component.html',
})
export class JbDrawerComponent
  implements OnChanges, AfterContentInit, Toggleable, OnDestroy {
  @Input() position: 'left' | 'right' = 'left';
  @Input() allowOutsideInteraction = false;
  @Input() canClose = true;
  @Input() width: string;

  @Output() beforeClose = new EventEmitter<any>();
  @Output() afterOpened = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @ViewChild('clickOutside')
  elementRef: ElementRef;
  @ViewChild(CdkTrapFocus)
  cdkTrapfocus: CdkTrapFocus;

  @ContentChild(JbDrawerHeaderComponent)
  header: JbDrawerHeaderComponent;

  isOpen = false;
  alternateFocusElement: HTMLElement;
  private outsideClickSubscription: Subscription;

  constructor(
    private clickOutsideService: ClickOutsideService,
    private el: ElementRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.width && this.width) {
      this.el.nativeElement.style.setProperty(
        '--panel-width-large',
        this.width
      );
    }
  }

  ngAfterContentInit(): void {
    this.header.onDrawerClose.subscribe(() => {
      this.close();
    });
  }

  forceOpen(isForced: boolean) {
    this.allowOutsideInteraction = isForced;
  }

  getIsOpen(): boolean {
    return Boolean(this.isOpen);
  }

  toggle() {
    this.getIsOpen() ? this.close() : this.open();
  }

  open(value?: any, returnFocus?: HTMLElement) {
    if (this.getIsOpen()) {
      return;
    }
    this.isOpen = true;
    this.afterOpened.emit(value);

    setTimeout(() => {
      if (!this.allowOutsideInteraction) {
        this.closeOnOutsideClick();
        this.cdkTrapfocus.focusTrap.focusInitialElementWhenReady();
      }
    });

    if (returnFocus) {
      this.alternateFocusElement = returnFocus;
    }
  }

  @HostListener('document:keydown.esc')
  close(value?: any) {
    this.beforeClose.emit(value);
    if (!this.canClose || !this.getIsOpen()) {
      return;
    }

    this.unlistenToOutsideClick();

    this.isOpen = false;
    this.afterClosed.emit(value);

    if (this.alternateFocusElement) {
      this.alternateFocusElement.focus();
      this.alternateFocusElement = null;
    }
  }

  ngOnDestroy() {
    this.close();
    this.unlistenToOutsideClick();
  }

  private unlistenToOutsideClick() {
    if (this.outsideClickSubscription) {
      this.outsideClickSubscription.unsubscribe();
    }
  }

  private closeOnOutsideClick() {
    this.unlistenToOutsideClick();

    this.outsideClickSubscription = this.clickOutsideService
      .onOutsideClick(this.elementRef.nativeElement)
      .subscribe(() => this.close());
  }
}
