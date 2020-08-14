import { ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';

import { WINDOW } from '../injection-tokens';
import { BREAKPOINTS } from '../breakpoints.constant';
import { debounce } from '../utilities.functions';

/** contains isMobile method that returns a boolean Observable indicating if window size is mobile width or smaller. */

@Injectable({
  providedIn: 'root',
})
export class JbViewPortService {
  viewWidth = new ReplaySubject(1);
  constructor(@Inject(WINDOW) private window) {
    this.getInitialViewWidth();
    this.updateViewWidth();
  }

  getInitialViewWidth(): void {
    this.viewWidth.next(this.window.innerWidth);
  }

  updateViewWidth(): void {
    this.window.addEventListener(
      'resize',
      debounce(() => {
        this.viewWidth.next(this.window.innerWidth);
      }, 100)
    );
  }

  isMobile$(): Observable<boolean> {
    return this.viewWidth.pipe(
      map((windowWidth) => windowWidth <= BREAKPOINTS.mobile_max)
    );
  }
}
