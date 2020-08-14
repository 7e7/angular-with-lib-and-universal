import {
  Directive,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { JbViewPortService } from '../services/viewport.service';
import { JbScrollService } from '../services/scroll.service';

@Directive({
  selector: '[jbScrollLock]',
})
export class JbScrollLockDirective implements OnDestroy, OnChanges {
  @Input() jbScrollLock: 'all' | 'mobile-only' | undefined;

  private viewportIsMobile = false;
  private subscriptions = new Subscription();

  constructor(
    private viewportService: JbViewPortService,
    private scrollService: JbScrollService
  ) {
    this.subscriptions.add(
      this.viewportService.isMobile$().subscribe((isMobile) => {
        this.viewportIsMobile = isMobile;
        this.updateScroll();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.jbScrollLock) {
      this.updateScroll();
    }
  }

  ngOnDestroy() {
    this.scrollService.enableScroll();
    this.subscriptions.unsubscribe();
  }

  private updateScroll() {
    const optionIsMobile = this.jbScrollLock === 'mobile-only';
    const optionAndViewportAreMobile = optionIsMobile && this.viewportIsMobile;

    if (!optionIsMobile || optionAndViewportAreMobile) {
      this.scrollService.disableScroll();
    } else {
      this.scrollService.enableScroll();
    }
  }
}
