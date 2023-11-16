/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalTeamSuspendAccountComponent } from './modal-team-suspend-account.component';

describe('ModalTeamSuspendAccountComponent', () => {
  let component: ModalTeamSuspendAccountComponent;
  let fixture: ComponentFixture<ModalTeamSuspendAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTeamSuspendAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTeamSuspendAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
