import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefTemplateTutorialComponent } from './brief-template-tutorial.component';

describe('BriefTemplateTutorialComponent', () => {
  let component: BriefTemplateTutorialComponent;
  let fixture: ComponentFixture<BriefTemplateTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefTemplateTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefTemplateTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
