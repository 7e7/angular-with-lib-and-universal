import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JbSelectButtonComponent } from './jb-select-button.component';
import { Component, Directive, Input } from '@angular/core';
import { JbInputLabelDirective } from '../forms/jb-input-label.directive';
import { JbIconComponent } from '../jb-icon/jb-icon.component';
import { JbIconService, JbFlyoutComponent } from 'jb-component-library';
import { JbExpandableIndicatorComponent } from '../jb-expandable-button/jb-expandable-indicator.component';

@Component({
  template: `
    <jb-select-button
      placeholder="Select an option"
      [value]="selectedValue"
      flyoutRef="flyoutFormControl"
    >
      <jb-flyout #flyoutFormControl>
        <div class="pa3">Flyout here</div>
      </jb-flyout>
    </jb-select-button>
  `,
})
class JbSelectButtonTestComponent {
  selectedValue = 'This is selected';
}

// tslint:disable-next-line:max-classes-per-file
@Directive({
  selector: '[jbAnchor]',
  exportAs: 'jbAnchor',
})
class MockPopoverDirective {
  popover: JbFlyoutComponent;
  getIsOpen(): boolean {
    return false;
  }
  @Input() set flyout(value: JbFlyoutComponent) {
    this.popover = value;
  }
}

// tslint:disable-next-line:max-classes-per-file
@Component({
  selector: 'jb-flyout',
  template: '<ng-content></ng-content>',
})
class MockJBFlyoutComponent {}

// tslint:disable-next-line:max-classes-per-file
class MockJbIconService {
  get() {
    // dummy function
  }
}

describe('JbSelectButtonComponent', () => {
  let component: JbSelectButtonComponent;
  let testComponent: JbSelectButtonTestComponent;
  let fixture: ComponentFixture<JbSelectButtonTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: JbIconService, useClass: MockJbIconService }],
      declarations: [
        JbSelectButtonTestComponent,
        JbSelectButtonComponent,
        MockPopoverDirective,
        JbInputLabelDirective,
        JbIconComponent,
        MockJBFlyoutComponent,
        JbExpandableIndicatorComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    component = new JbSelectButtonComponent();
    fixture = TestBed.createComponent(JbSelectButtonTestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testComponent).toBeTruthy();
  });

  it('should check hostbinding and append .jb-invalid if there is an error', () => {
    component.hasError = true;

    expect(component.classes).toMatch('jb-invalid');
  });
});
