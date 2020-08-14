import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { Router } from '@angular/router';
import { JbDomService } from '../../jb-utils/services/dom.service';

let uniqueId = 0;
@Component({
  selector: 'jb-link',
  templateUrl: './jb-link-with-router.component.html',
})
export class JbLinkWithRouterComponent implements OnInit, OnChanges {
  readonly SAFE_REL = 'noopener noreferrer';

  @Input() href: string = null;
  @Input() link: string;
  @Input() target = '_self';
  @Input() ariaDescribedBy: string;
  @Input() srText: string;
  srId = `jb-link-id-${uniqueId++}`;

  isRouterLink = false;
  isTargetBlank: boolean;
  rel: string = null;

  constructor(
    private router: Router,
    private domService: JbDomService,
    private elmRef: ElementRef
  ) {}

  ngOnInit() {
    // this if statement is required for applying the routerLink when there is no href
    if (this.link !== undefined && !this.href) {
      this.domService.callNativeMethod(
        this.elmRef,
        'setAttribute',
        'tabindex',
        0
      );
      this.isRouterLink = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isTargetBlank = this.target === '_blank';
    this.rel = this.getRel();
  }

  handleRoute(): void {
    if (this.isRouterLink) {
      this.router.navigate([`${this.link}`]);
    }
  }

  @HostListener('click')
  onClick() {
    this.handleRoute();
  }

  @HostListener('keydown.enter')
  onKeyDown() {
    this.handleRoute();
  }

  /* Helpers */

  private getRel() {
    if (!this.isTargetBlank) {
      return null;
    }
    return this.SAFE_REL;
  }
}
