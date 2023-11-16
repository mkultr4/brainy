import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedAccountComponent } from './closed-account.component';

describe('ClosedAccountComponent', () => {
  let component: ClosedAccountComponent;
  let fixture: ComponentFixture<ClosedAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
