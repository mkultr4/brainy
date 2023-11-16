/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalMeetingNoteAuditoryComponent } from './modal-meeting-note-audit.component';

describe('ModalMeetingNoteAuditoryComponent', () => {
  let component: ModalMeetingNoteAuditoryComponent;
  let fixture: ComponentFixture<ModalMeetingNoteAuditoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMeetingNoteAuditoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMeetingNoteAuditoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
