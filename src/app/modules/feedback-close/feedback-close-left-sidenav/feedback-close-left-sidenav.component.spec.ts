/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeedbackCloseLeftSidenavComponent } from './feedback-close-left-sidenav.component';

describe('FeedbackCloseLeftSidenavComponent', () => {
  let component: FeedbackCloseLeftSidenavComponent;
  let fixture: ComponentFixture<FeedbackCloseLeftSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackCloseLeftSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackCloseLeftSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
