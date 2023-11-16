/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalApproveTopicWihoutAgreementsComponent } from './modal-approve-topic-wihout-agreements.component';

describe('ModalApproveTopicWihoutAgreementsComponent', () => {
  let component: ModalApproveTopicWihoutAgreementsComponent;
  let fixture: ComponentFixture<ModalApproveTopicWihoutAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalApproveTopicWihoutAgreementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalApproveTopicWihoutAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
