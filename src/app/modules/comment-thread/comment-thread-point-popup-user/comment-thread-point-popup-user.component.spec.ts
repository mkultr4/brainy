/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommentThreadPointPopupUserComponent } from './comment-thread-point-popup-user.component';

describe('CommentThreadPointPopupComponent', () => {
  let component: CommentThreadPointPopupUserComponent;
  let fixture: ComponentFixture<CommentThreadPointPopupUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentThreadPointPopupUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentThreadPointPopupUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
