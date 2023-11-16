import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserInvoiceComponent } from './profile-user-invoice.component';

describe('ProfileUserInvoiceComponent', () => {
  let component: ProfileUserInvoiceComponent;
  let fixture: ComponentFixture<ProfileUserInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
