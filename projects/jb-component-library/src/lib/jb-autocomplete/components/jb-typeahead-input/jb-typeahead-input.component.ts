import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, merge, combineLatest, Observable } from 'rxjs';
import { startWith, mapTo, map } from 'rxjs/operators';
import { JbDomService } from '../../../jb-utils/services/dom.service';

@Component({
  selector: 'jb-type-ahead-input',
  templateUrl: './jb-typeahead-input.component.html',
  styleUrls: ['./jb-typeahead-input.component.scss'],
})
export class JbTypeAheadInputComponent implements OnInit, OnChanges {
  @ViewChild('input') input: ElementRef;

  @Input() listId: string;
  @Input() control: FormControl;
  @Input() label: string;
  @Input() isListOpen = false;
  @Input() ariaDescribedBy: string;

  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onClick = new EventEmitter<Event>();

  searchId: string;
  labelId: string;

  isLabelShrunk$: Observable<boolean> = of(false);

  constructor(private domService: JbDomService) {}

  ngOnInit(): void {
    const searchTermChange$ = this.control.valueChanges.pipe(
      startWith(this.control.value)
    );

    const isFocused$ = merge(
      this.onFocus.pipe(mapTo(true)),
      this.onBlur.pipe(mapTo(false))
    ).pipe(startWith(false));

    this.isLabelShrunk$ = combineLatest([
      isFocused$,
      searchTermChange$.pipe(
        map((searchTerm) => Boolean(searchTerm && searchTerm.length > 0))
      ),
    ]).pipe(map(([isFocused, hasSearchTerm]) => isFocused || hasSearchTerm));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.labelId = `${this.listId}-label`;
    this.searchId = `${this.listId}-search`;
  }

  setActiveDescendant(value: string): void {
    this.domService.callNativeMethod(
      this.input,
      'setAttribute',
      'aria-activedescendant',
      value
    );
  }

  handleFocus(event: Event): void {
    this.domService.selectInputText(this.input.nativeElement);
    this.onFocus.emit(event);
  }
}
