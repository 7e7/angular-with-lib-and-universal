import { JbCity } from './types/jb-city.interface';
import { getListItemId } from './types/list-item-id.functions';
import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { JbTypeAheadOption } from './types/jb-typeahead-option.type';

@Directive()
export abstract class JbTypeaheadListDirective {
  readonly MINT_ICON = 'mintIndicator';
  readonly PARTNER_ICON = 'partnerAirlineIndicator';

  readonly MINT_GREEN = '#6cc24a';
  readonly SLATE_GRAY = '#757575';

  @Input() listId: string;
  @Input() hidden: boolean;
  @Input() searchTerm: string;

  @Input() modalLinkText: string;

  @Input() options: JbTypeAheadOption[];
  @Input() activeOption: JbTypeAheadOption;

  @Input() isKeyPressed: boolean;

  @Output() modalLinkClicked = new EventEmitter();
  @Output() optionSelected = new EventEmitter<JbTypeAheadOption>();
  @Output() hover = new EventEmitter<number>();

  visible: boolean;

  selectOption(option: JbCity | string): void {
    this.optionSelected.emit(option);
  }

  getOptionListItemIdByIndex(index: number): string {
    return getListItemId(this.listId)(index);
  }

  isActiveOption(option: JbTypeAheadOption): boolean {
    return this.activeOption === (option || false);
  }
}
