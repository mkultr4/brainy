/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommentThreadPopupInvitationListComponent } from './comment-thread-popup-invitation-list.component';

describe('CommentThreadPopupInvitationListComponent', () => {
  let component: CommentThreadPopupInvitationListComponent;
  let fixture: ComponentFixture<CommentThreadPopupInvitationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentThreadPopupInvitationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentThreadPopupInvitationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
