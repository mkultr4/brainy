/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommentThreadFeedbackPointComponent } from './comment-thread-feedback-point.component';

describe('CommentThreadFeedbackPointComponent', () => {
  let component: CommentThreadFeedbackPointComponent;
  let fixture: ComponentFixture<CommentThreadFeedbackPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentThreadFeedbackPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentThreadFeedbackPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
