/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalCancelMeetingNoteComponent } from './modal-cancel-meeting-note.component';

describe('ModalCancelMeetingNoteComponent', () => {
  let component: ModalCancelMeetingNoteComponent;
  let fixture: ComponentFixture<ModalCancelMeetingNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCancelMeetingNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCancelMeetingNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
