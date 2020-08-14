import {
  Component,
  Input,
  ContentChild,
  AfterContentInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { JbFiltersContentComponent } from '../jb-filters-content/jb-filters-content.component';
import { Subscription, Subject } from 'rxjs';
import { JbFiltersButtonComponent } from '../jb-filters-button/jb-filters-button.component';
import { JbPopoverDirective } from '../../../jb-popover/jb-popover.directive';
import { JbViewPortService } from '../../../jb-utils/services/viewport.service';
@Component({
  selector: 'jb-filters-wrapper',
  templateUrl: './jb-filters-wrapper.component.html',
})
export class JbFilterWrapperComponent implements AfterContentInit, OnDestroy {
  @ContentChild(JbFiltersButtonComponent)
  button: JbFiltersButtonComponent;
  @ContentChild(JbFiltersContentComponent)
  content: JbFiltersContentComponent;
  @ViewChild('anchor') popoverAnchor: JbPopoverDirective;

  @Input() isVisible = false;
  @Input()
  set isApplied(isApplied: boolean) {
    if (this.button) {
      this.button.isApplied = isApplied;
      this.content.isApplied = isApplied;
    }
  }

  buttonClicked$ = new Subject<void>();
  isMobile = false;
  isMobileSubscription: Subscription;

  private subscriptions = new Subscription();

  constructor(private viewportService: JbViewPortService) {}

  ngAfterContentInit() {
    this.isMobileSubscription = this.viewportService
      .isMobile$()
      .subscribe((isMobileWidth) => {
        this.isMobile = isMobileWidth;
        this.content.isMobile = isMobileWidth;
      });

    this.subscriptions.add(this.content.close.subscribe(() => this.hide()));
    this.subscriptions.add(this.content.cancel.subscribe(() => this.hide()));

    this.buttonClicked$ = this.button.click;
  }

  hide() {
    this.popoverAnchor.close(null, { focusOnPreviousElement: false });
  }

  toggle() {
    this.popoverAnchor.toggle();
  }

  focusButton() {
    this.button.setFocus();
  }

  updateButton() {
    this.button.isActive = this.popoverAnchor.getIsOpen();
  }

  apply() {
    if (!this.isMobile) {
      this.content.onApply();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
