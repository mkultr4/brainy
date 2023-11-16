/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalDownloadCommentThreadComponent } from './modal-download-comment-thread.component';

describe('ModalDownloadCommentThreadComponent', () => {
  let component: ModalDownloadCommentThreadComponent;
  let fixture: ComponentFixture<ModalDownloadCommentThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDownloadCommentThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDownloadCommentThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
