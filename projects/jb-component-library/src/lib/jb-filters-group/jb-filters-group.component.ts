import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  OnDestroy,
} from '@angular/core';
import { JbFilterWrapperComponent } from './components/jb-filters-wrapper/jb-filters-wrapper.component';
import { JbFiltersButtonComponent } from './components/jb-filters-button/jb-filters-button.component';
import { merge, Observable, Subscription } from 'rxjs';
import { mapTo, switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'jb-filters-group',
  templateUrl: './jb-filters-group.component.html',
  host: {
    class: 'flex',
  },
})
export class JbFiltersGroupComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(JbFilterWrapperComponent, { descendants: true })
  items: QueryList<JbFilterWrapperComponent>;

  @ContentChildren(JbFiltersButtonComponent, { descendants: true })
  buttons: QueryList<JbFiltersButtonComponent>;

  private subscriptions = new Subscription();

  ngAfterContentInit() {
    this.subscriptions.add(this.toggleOnButtonClickSubscription());
  }

  toggle(toggleItem: JbFilterWrapperComponent) {
    this.items
      .filter((item) => item !== toggleItem)
      .forEach((item) => item.hide());

    toggleItem.toggle();
  }

  hideAll() {
    this.items.forEach((item) => item.hide());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private toggleOnButtonClickSubscription(): Subscription {
    // when button clicked, emit corresponding wrapper
    const clickedItem = (): Observable<JbFilterWrapperComponent> =>
      merge(...this.items.map((item) => item.buttonClicked$.pipe(mapTo(item))));

    return this.items.changes
      .pipe(
        startWith(undefined),
        switchMap(clickedItem)
      )
      .subscribe((item) => this.toggle(item));
  }
}
