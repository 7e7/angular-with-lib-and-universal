import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbExpandableContainerComponent } from './jb-expandable-container.component';

describe('JbExpandableHeightTransitionComponent', () => {
  let component: JbExpandableContainerComponent;
  let fixture: ComponentFixture<JbExpandableContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JbExpandableContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbExpandableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
