import {
  ComponentFixture,
  TestModuleMetadata,
  async,
} from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';

import { JbDialogModule } from './jb-dialog.module';
import { JbDialogTitleModule } from './jb-dialog-title/jb-dialog-title.module';
import { JbDialogContentModule } from './jb-dialog-content/jb-dialog-content.module';
import { JbDialogActionsModule } from './jb-dialog-actions/jb-dialog-actions.module';

import { setupComponentFixture } from '../test-helpers';
import { JbDialogService } from './jb-dialog.service';
import { JbDomService } from '../jb-utils/services/dom.service';
import { DOCUMENT, WINDOW } from '../jb-utils/injection-tokens';
import { JbScrollService } from '../jb-utils/services/scroll.service';
import { JbDeviceService } from '../jb-utils/services/device-service';

// tslint:disable
@Component({
  selector: `jb-dialog-test-component`,
  template: `
    <jb-dialog>
      <jb-dialog-title>Dialog Title</jb-dialog-title>
      <jb-dialog-content>
        <p>Content 1</p>
        <button jbButton #first>First</button>
        <div>Content 1</div>
      </jb-dialog-content>
      <jb-dialog-actions>
        <button jbButton #second>Second</button>
      </jb-dialog-actions>
    </jb-dialog>
  `,
})
export class JbTestDialogOneComponent {
  constructor(private dialogService: JbDialogService) {}
  closeDialog() {
    this.dialogService.closeDialog();
  }
}

@Component({
  selector: `jb-dialog-test-component`,
  template: `
    <jb-dialog dialogType="content">
      <jb-dialog-header>Lorem Ipsum Consequuntur</jb-dialog-header>
      <jb-dialog-content>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam nisi ut aliquid ex ea commodi
        consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
        velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
        fugiat quo voluptas nulla pariatur?
      </jb-dialog-content>
      <jb-dialog-actions>
        <button jbButton>Test</button>
        <button jbButton>Test</button>
      </jb-dialog-actions>
    </jb-dialog>
  `,
})
export class JbTestDialogTwoComponent {
  constructor(private dialogService: JbDialogService) {}
  closeDialog() {
    this.dialogService.closeDialog();
  }
}

@Component({
  selector: 'jb-test-dialog',
  template: `
    <button (click)="openDialog()">Button</button>
  `,
})
export class JbTestDialogComponent {
  constructor(
    public dialogService: JbDialogService,
    public domService: JbDomService
  ) {}

  openDialog() {
    this.dialogService.openDialog(JbTestDialogOneComponent);
  }
}

// Dialog Module - Collects all the components required for testing
@NgModule({
  providers: [
    JbDialogService,
    JbScrollService,
    { provide: DOCUMENT, useValue: document },
    { provide: WINDOW, useValue: { addEventListener: () => {} } },
    { provide: JbDeviceService, useValue: { isIOS: () => false } },
  ],
  imports: [
    JbDialogModule,
    JbDialogTitleModule,
    JbDialogContentModule,
    JbDialogActionsModule,
  ],
  declarations: [
    JbTestDialogComponent,
    JbTestDialogOneComponent,
    JbTestDialogTwoComponent,
  ],
  entryComponents: [JbTestDialogOneComponent, JbTestDialogTwoComponent],
})
export class FakeTestDialogModule {}

describe('Component: JbDialogComponent', () => {
  let fixture: ComponentFixture<JbTestDialogComponent>;
  let component: JbTestDialogComponent;

  beforeEach(async(() => {
    const moduleConfig: TestModuleMetadata = {
      imports: [FakeTestDialogModule],
    };

    setupComponentFixture(moduleConfig, JbTestDialogComponent).then(
      (compFixture) => {
        fixture = compFixture;
        component = fixture.componentInstance;
      }
    );
  }));

  it('Component should exist', () => {
    expect(component).toBeDefined();
  });

  it('Component should mount and unmount notification modal', () => {
    expect(
      component.dialogService.openDialog(JbTestDialogOneComponent)
    ).toBeDefined();
    expect(document.body.querySelector('jb-dialog')).toBeDefined();
    fixture.detectChanges();
    component.dialogService.closeDialog();
  });

  it('Component should mount and unmount content dialog', () => {
    expect(
      component.dialogService.openDialog(JbTestDialogTwoComponent)
    ).toBeDefined();
    expect(document.body.querySelector('jb-dialog')).toBeDefined();
    fixture.detectChanges();
  });

  it('Component should have focuseable elements', () => {
    const firstElement = document.createElement('button');
    const firstElementText = document.createTextNode('First');
    firstElement.appendChild(firstElementText);
    firstElement.setAttribute('jbbutton', '');

    const secondElement = document.createElement('button');
    const secondElementText = document.createTextNode('Second');
    secondElement.appendChild(secondElementText);
    secondElement.setAttribute('jbbutton', '');

    expect(
      component.dialogService.openDialog(JbTestDialogOneComponent)
    ).toBeDefined();
    const focusableEls = component.domService.getFocusableElements(
      document.body
    );
    expect(focusableEls[0]).toEqual(firstElement);
    expect(focusableEls[1]).toEqual(secondElement);
    fixture.detectChanges();
    component.dialogService.closeDialog();
  });
});
