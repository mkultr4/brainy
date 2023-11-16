/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommentThreadPopupNewInvitationComponent } from './comment-thread-popup-new-invitation.component';

describe('CommentThreadPopupNewInvitationComponent', () => {
  let component: CommentThreadPopupNewInvitationComponent;
  let fixture: ComponentFixture<CommentThreadPopupNewInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentThreadPopupNewInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentThreadPopupNewInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
