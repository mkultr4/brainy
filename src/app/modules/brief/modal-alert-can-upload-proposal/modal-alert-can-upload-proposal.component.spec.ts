/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalAlertCanUploadProposalComponent } from './modal-alert-can-upload-proposal.component';

describe('ModalAlertCanUploadProposalComponent', () => {
  let component: ModalAlertCanUploadProposalComponent;
  let fixture: ComponentFixture<ModalAlertCanUploadProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAlertCanUploadProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlertCanUploadProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
