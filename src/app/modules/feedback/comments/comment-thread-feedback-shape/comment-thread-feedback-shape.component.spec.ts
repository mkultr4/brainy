/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommentThreadFeedbackShapeComponent } from './comment-thread-feedback-shape.component';

describe('CommentThreadFeedbackShapeComponent', () => {
  let component: CommentThreadFeedbackShapeComponent;
  let fixture: ComponentFixture<CommentThreadFeedbackShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentThreadFeedbackShapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentThreadFeedbackShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
