import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserBillingPaymenthodComponent } from './profile-user-billing-paymenthod.component';

describe('ProfileUserBillingPaymentmethodComponent', () => {
  let component: ProfileUserBillingPaymenthodComponent;
  let fixture: ComponentFixture<ProfileUserBillingPaymenthodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserBillingPaymenthodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserBillingPaymenthodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
