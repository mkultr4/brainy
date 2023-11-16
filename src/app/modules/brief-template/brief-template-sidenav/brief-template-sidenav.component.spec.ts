import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefTemplateSidenavComponent } from './brief-template-sidenav.component';

describe('BriefTemplateSidenavComponent', () => {
  let component: BriefTemplateSidenavComponent;
  let fixture: ComponentFixture<BriefTemplateSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefTemplateSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefTemplateSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
