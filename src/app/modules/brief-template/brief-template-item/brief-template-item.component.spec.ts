import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefTemplateItemComponent } from './brief-template-item.component';

describe('BriefTemplateItemComponent', () => {
  let component: BriefTemplateItemComponent;
  let fixture: ComponentFixture<BriefTemplateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefTemplateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefTemplateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
