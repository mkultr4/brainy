import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationDropdownComponent } from './invitation-dropdown.component';

describe('InvitationDropdownComponent', () => {
  let component: InvitationDropdownComponent;
  let fixture: ComponentFixture<InvitationDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
