import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationWrapperComponent } from './invitation-wrapper.component';

describe('InvitationWrapperComponent', () => {
  let component: InvitationWrapperComponent;
  let fixture: ComponentFixture<InvitationWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
