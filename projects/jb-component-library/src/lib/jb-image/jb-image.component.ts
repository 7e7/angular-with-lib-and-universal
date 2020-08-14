import {
  Component,
  Input,
  AfterContentInit,
  NgZone,
  ElementRef,
  OnDestroy,
  Inject,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, filter, takeUntil } from 'rxjs/operators';
import { DOCUMENT, IS_BROWSER, WINDOW } from '../jb-utils/injection-tokens';
import { PLACEHOLDER_DATA_URI } from './placeholder-data-uri.const';

@Component({
  selector: 'jb-image',
  template: `
    <img
      #imgElement
      class="img"
      [ngClass]="{
        'stretch-placeholder': isPlaceholder,
        'nested-cropped-img h-100 w-100': cropped
      }"
      [alt]="(alt || '').trim()"
      [src]="src$ | async"
    />
    <!-- fallback <img> is only needed on server side for SEO -->
    <noscript *ngIf="!isBrowser"><img [src]="src" [alt]="alt" /></noscript>
  `,
  host: {
    class: 'line-height-0 dib mw-100 h-100 w-100',
  },
  styleUrls: ['./jb-image.component.scss'],
})
export class JbImageComponent implements OnInit, AfterContentInit, OnDestroy {
  readonly DEFAULT_PLACEHOLDER = PLACEHOLDER_DATA_URI;

  /** Crop and center the image. Set to 'false' by default. */
  @Input() cropped = false;

  /** Alt tag for the image. Defaults to empty string, which will not be read by screen reader */
  @Input() alt = '';

  /** Image source. Defaults to empty string. */
  @Input() src = '';

  /** Anchored styling edge. Options: 'width' | 'height' | 'both' | 'none'. Defaults to 'undefined'/'none'. */
  @Input() sizedBy: 'width' | 'height' | 'both' | 'none';

  /** Placeholder image source. Defaults to grey (#E8E8E9) base64 PNG. */
  @Input() placeholder = this.DEFAULT_PLACEHOLDER;

  /** Determines if the image is loaded via IntersectObserver (true), or onload (false). Defaults false. */
  @Input() isLazy = false;

  /** Determines if the image is loaded via requestIdleCallback (true), or onload (false). Defaults false. */
  @Input() defer = false;

  @ViewChild('imgElement', { static: true }) imgElement: ElementRef;

  src$: BehaviorSubject<string>;
  isPlaceholder = true;
  private intersectionObserver: IntersectionObserver;
  private scrollSubscription: Subscription;
  private unsubscribe = new Subject<void>();

  constructor(
    private element: ElementRef,
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(IS_BROWSER) public isBrowser,
    @Inject(WINDOW) private window,
    @Inject(DOCUMENT) private document
  ) {
    this.addRequestIdleCallback();
  }

  ngOnInit() {
    this.src$ = new BehaviorSubject(this.placeholder || null);
    this.src$
      .pipe(
        filter((imgSource) => imgSource !== this.placeholder),
        delay(0),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => {
        this.isPlaceholder = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngAfterContentInit() {
    if (!this.isBrowser) {
      return;
    }

    if (this.isLazy || this.defer) {
      return this.initLazyLoading();
    }

    this.loadSrc();
  }

  initLazyLoading() {
    if (this.hasCompatibleBrowser()) {
      this.registerIntersectionObserver();
    } else {
      this.addScrollListeners();
    }

    if (this.defer) {
      this.window.requestIdleCallback(this.loadSrc.bind(this));
    }
  }

  ngOnDestroy() {
    this.removeListeners();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getImageElement() {
    return this.imgElement.nativeElement;
  }

  getScrollPosition() {
    // Getting screen size and scroll position for IE
    return (
      (this.window.scrollY || this.window.pageYOffset) +
      (this.document.documentElement.clientHeight ||
        this.document.body.clientHeight)
    );
  }

  getMicrosoftEdgeVersion() {
    const userAgent = this.window.navigator.userAgent;
    const matches = userAgent.match(/Edge\/([\d|\.]+)/i);
    if (!matches) {
      return undefined;
    }

    return matches[1];
  }

  isMicrosoftEdge() {
    return this.getMicrosoftEdgeVersion() !== undefined;
  }

  isMicrosoftEdge16OrBetter() {
    return parseInt(this.getMicrosoftEdgeVersion(), 10) > 15;
  }

  hasCompatibleBrowser(): boolean {
    const hasIntersectionObserver = 'IntersectionObserver' in this.window;
    return (
      hasIntersectionObserver &&
      (!this.isMicrosoftEdge() || this.isMicrosoftEdge16OrBetter())
    );
  }

  isValidSrc(src: string): boolean {
    return /\.(gif|jpg|jpeg|tiff|png|webp|svg)$/i.test(src);
  }

  isVisible() {
    const scrollPosition = this.getScrollPosition();
    const elementOffset = this.element.nativeElement.offsetTop;
    return elementOffset <= scrollPosition;
  }

  checkIfIntersecting(entry: IntersectionObserverEntry) {
    return entry.isIntersecting && entry.target === this.element.nativeElement;
  }

  private registerIntersectionObserver(): void {
    if (!!this.intersectionObserver) {
      return;
    }
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.checkForIntersection(entries[0]);
      },
      { root: null, rootMargin: '350px 0px 350px 0px' }
    );
    this.intersectionObserver.observe(this.element.nativeElement);
  }

  private checkForIntersection(entry: IntersectionObserverEntry) {
    if (this.checkIfIntersecting(entry)) {
      this.loadSrc();
      if (this.intersectionObserver && this.element.nativeElement) {
        this.intersectionObserver.unobserve(this.element.nativeElement);
      }
    }
  }

  private loadSrc(): void {
    this.removeListeners();
    if (this.isValidSrc(this.src)) {
      this.src$.next(this.src);
    } else {
      this.errorMessage(this.src);
    }
  }

  /* FOR INCOMPATIBLE BROWSERS */

  private addScrollListeners() {
    if (this.isVisible()) {
      this.loadSrc();
      return;
    }
    this.zone.runOutsideAngular(() => {
      this.scrollSubscription = fromEvent(window, 'scroll')
        .pipe(debounceTime(50))
        .subscribe(this.onScroll);
    });
  }

  private removeListeners() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private onScroll() {
    if (this.isVisible()) {
      this.zone.run(() => this.loadSrc());
    }
  }

  private errorMessage(src) {
    console.warn(
      `Please provide a valid src attribute, "${src}" is not valid.`
    );
  }

  private addRequestIdleCallback() {
    /*!
     * Copyright 2015 Google Inc. All rights reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
     * or implied. See the License for the specific language governing
     * permissions and limitations under the License.
     */

    /*
     * @see https://developers.google.com/web/updates/2015/08/using-requestidlecallback
     */
    this.window.requestIdleCallback =
      this.window.requestIdleCallback || this.requestIdleCallbackFallback;
    this.window.cancelIdleCallback =
      this.window.cancelIdleCallback || this.cancelIdleCallbackFallback;
  }

  private requestIdleCallbackFallback(cb) {
    return setTimeout(() => {
      const start = Date.now();
      cb({
        didTimeout: false,
        timeRemaining: () => {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  }

  private cancelIdleCallbackFallback(id) {
    clearTimeout(id);
  }
}
