import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JbFiltersGroupComponent } from './jb-filters-group.component';
import { JbFiltersButtonComponent } from './components/jb-filters-button/jb-filters-button.component';
import { JbFiltersContentComponent } from './components/jb-filters-content/jb-filters-content.component';
import { JbFilterWrapperComponent } from './components/jb-filters-wrapper/jb-filters-wrapper.component';
import { JbFiltersNoResultsComponent } from './components/jb-filters-no-results/jb-filters-no-results.component';
import { JbFiltersNoResultsHeaderComponent } from './components/jb-filters-no-results/jb-filters-no-results-header/jb-filters-no-results-header.component';
import { JbFiltersNoResultsCopyComponent } from './components/jb-filters-no-results/jb-filters-no-results-copy/jb-filters-no-results-copy.component';
import { JbFiltersResetAllButtonComponent } from './components/jb-filters-reset-all-button/jb-filters-reset-all-button.component';
import { JbFiltersCollapsibleComponent } from './components/jb-filters-collapsible/jb-filters-collapsible.component';
import { JbFiltersMobileContentComponent } from './components/jb-filters-mobile-content/jb-filters-mobile-content.component';
import { JbFiltersSectionComponent } from './components/jb-filters-section/jb-filters-section.component';
import { JbCopyModule } from '../jb-copy/jb-copy.module';
import { JbIconModule } from '../jb-icon/jb-icon.module';
import { JbButtonCloseModule } from '../jb-button-close/jb-button-close.module';
import { JbCheckboxModule } from '../jb-checkbox/jb-checkbox.module';
import { JbUtilsModule } from '../jb-utils/utils.module';
import { JbFlyoutModule } from '../jb-flyout/jb-flyout.module';
import { JbPopoverModule } from '../jb-popover/jb-popover.module';

@NgModule({
  imports: [
    CommonModule,
    JbCopyModule,
    JbIconModule,
    JbCheckboxModule,
    JbButtonCloseModule,
    JbUtilsModule,
    JbFlyoutModule,
    JbPopoverModule,
  ],
  declarations: [
    JbFiltersGroupComponent,
    JbFiltersButtonComponent,
    JbFiltersContentComponent,
    JbFilterWrapperComponent,
    JbFiltersNoResultsComponent,
    JbFiltersNoResultsHeaderComponent,
    JbFiltersNoResultsCopyComponent,
    JbFiltersResetAllButtonComponent,
    JbFiltersCollapsibleComponent,
    JbFiltersMobileContentComponent,
    JbFiltersSectionComponent,
  ],
  exports: [
    JbFiltersGroupComponent,
    JbFiltersButtonComponent,
    JbFiltersContentComponent,
    JbFilterWrapperComponent,
    JbFiltersNoResultsComponent,
    JbFiltersNoResultsHeaderComponent,
    JbFiltersNoResultsCopyComponent,
    JbFiltersResetAllButtonComponent,
    JbFiltersCollapsibleComponent,
    JbFiltersMobileContentComponent,
    JbFiltersSectionComponent,
  ],
})
export class JbFiltersGroupModule {}
