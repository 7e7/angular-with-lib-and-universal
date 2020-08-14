import { Component, Host, OnInit } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'jb-flyout-inner',
  template: '<ng-content></ng-content>',
})
export class JbFlyoutInnerComponent implements OnInit {
  constructor(@Host() private cdkTrapFocus: CdkTrapFocus) {}
  ngOnInit(): void {
    if (this.cdkTrapFocus.enabled) {
      this.cdkTrapFocus.focusTrap.focusInitialElementWhenReady();
    }
  }
}
