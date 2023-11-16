import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserBillComponent } from './profile-user-bill.component';

describe('ProfileUserBillComponent', () => {
  let component: ProfileUserBillComponent;
  let fixture: ComponentFixture<ProfileUserBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
