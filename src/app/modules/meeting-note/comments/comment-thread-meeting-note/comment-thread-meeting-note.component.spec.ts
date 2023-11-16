/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommentThreadMeetingNoteComponent } from './comment-thread-meeting-note.component';

describe('CommentThreadMeetingNoteComponent', () => {
  let component: CommentThreadMeetingNoteComponent;
  let fixture: ComponentFixture<CommentThreadMeetingNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentThreadMeetingNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentThreadMeetingNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
