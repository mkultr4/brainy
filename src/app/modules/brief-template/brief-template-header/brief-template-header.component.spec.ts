import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefTemplateHeaderComponent } from './brief-template-header.component';

describe('BriefTemplateHeaderComponent', () => {
  let component: BriefTemplateHeaderComponent;
  let fixture: ComponentFixture<BriefTemplateHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefTemplateHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefTemplateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
