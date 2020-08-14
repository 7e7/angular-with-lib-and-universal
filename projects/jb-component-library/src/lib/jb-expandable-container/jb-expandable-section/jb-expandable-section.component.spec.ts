import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbExpandableSectionComponent } from './jb-expandable-section.component';

describe('JbExpandableHeightTransitionComponent', () => {
  let component: JbExpandableSectionComponent;
  let fixture: ComponentFixture<JbExpandableSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JbExpandableSectionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbExpandableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
