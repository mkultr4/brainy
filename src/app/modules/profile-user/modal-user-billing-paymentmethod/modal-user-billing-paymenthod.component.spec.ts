import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserBillingPaymenthodComponent } from './modal-user-billing-paymenthod.component';

describe('ModalUserBillingPaymenthodComponent', () => {
  let component: ModalUserBillingPaymenthodComponent;
  let fixture: ComponentFixture<ModalUserBillingPaymenthodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserBillingPaymenthodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserBillingPaymenthodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
