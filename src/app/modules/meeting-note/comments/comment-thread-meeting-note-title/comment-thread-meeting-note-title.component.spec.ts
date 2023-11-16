/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommentThreadMeetingNoteTitleComponent } from './comment-thread-meeting-note-title.component';

describe('CommentThreadMeetingNoteTitleComponent', () => {
  let component: CommentThreadMeetingNoteTitleComponent;
  let fixture: ComponentFixture<CommentThreadMeetingNoteTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentThreadMeetingNoteTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentThreadMeetingNoteTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
