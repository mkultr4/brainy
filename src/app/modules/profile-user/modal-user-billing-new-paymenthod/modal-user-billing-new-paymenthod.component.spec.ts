import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserBillingNewPaymenthodComponent } from './modal-user-billing-new-paymenthod.component';

describe('ModalUserBillingNewPaymenthodComponent', () => {
  let component: ModalUserBillingNewPaymenthodComponent;
  let fixture: ComponentFixture<ModalUserBillingNewPaymenthodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserBillingNewPaymenthodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserBillingNewPaymenthodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
