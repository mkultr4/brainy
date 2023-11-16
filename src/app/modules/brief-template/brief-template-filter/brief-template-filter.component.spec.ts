import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefTemplateFilterComponent } from './brief-template-filter.component';

describe('BriefTemplateFilterComponent', () => {
  let component: BriefTemplateFilterComponent;
  let fixture: ComponentFixture<BriefTemplateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefTemplateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefTemplateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
