import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserBillingDeletedMembershipComponent } from './modal-user-billing-deleted-membership.component';

describe('ModalUserBillingDeletedMembershipComponent', () => {
  let component: ModalUserBillingDeletedMembershipComponent;
  let fixture: ComponentFixture<ModalUserBillingDeletedMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserBillingDeletedMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserBillingDeletedMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
