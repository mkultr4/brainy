/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalTeamEliminateInvitationComponent } from './modal-team-eliminate-invitation.component';

describe('ModalTeamEliminateInvitationComponent', () => {
  let component: ModalTeamEliminateInvitationComponent;
  let fixture: ComponentFixture<ModalTeamEliminateInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTeamEliminateInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTeamEliminateInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
