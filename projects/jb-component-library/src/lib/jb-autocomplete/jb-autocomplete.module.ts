import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JbAutocompleteComponent } from './jb-autocomplete.component';
import { JbCopyModule } from '../jb-copy/jb-copy.module';
import { JbUtilsModule } from '../jb-utils/utils.module';
import { JbScrollingCitiesTypeaheadListComponent } from './components/jb-scrolling-cities-typeahead-list/jb-scrolling-cities-typeahead-list.component';
import { JbTypeAheadInputComponent } from './components/jb-typeahead-input/jb-typeahead-input.component';
import { JbStandardTypeaheadListComponent } from './components/jb-standard-typeahead-list/jb-standard-typeahead-list.component';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbLinkModule } from '../jb-link/jb-link.module';
import { JbInputLabelModule } from '../forms/jb-input-label.module';
import { JbPopoverModule } from '../jb-popover/jb-popover.module';
import { JbFlyoutModule } from '../jb-flyout/jb-flyout.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    JbCopyModule,
    JbUtilsModule,
    JbIconModule,
    JbLinkModule,
    JbInputLabelModule,
    JbPopoverModule,
    JbFlyoutModule,
  ],
  declarations: [
    JbAutocompleteComponent,
    JbScrollingCitiesTypeaheadListComponent,
    JbTypeAheadInputComponent,
    JbStandardTypeaheadListComponent,
  ],
  exports: [JbAutocompleteComponent],
})
export class JbAutocompleteModule {}

export { JbTypeAheadOption } from './types/jb-typeahead-option.type';
export { JbCity } from './types/jb-city.interface';
