import { Injectable, NgZone, Inject } from '@angular/core';
import { Observable, fromEvent, PartialObserver } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '../injection-tokens';

@Injectable({
  providedIn: 'root',
})
export class ClickOutsideService {
  constructor(
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: any
  ) {}

  onOutsideClick(el: HTMLElement): Observable<MouseEvent> {
    return this.ngZone.runOutsideAngular(() => {
      return new Observable((observer: PartialObserver<MouseEvent>) =>
        fromEvent(this.document, 'click')
          .pipe(
            filter((event: MouseEvent) => !el.contains(event.target as any))
          )
          .subscribe((event) => {
            this.ngZone.run(() => observer.next(event));
          })
      );
    });
  }
}
