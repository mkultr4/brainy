/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeedbackLeftSidenavEmptyComponent } from './feedback-left-sidenav-empty.component';

describe('FeedbackLeftSidenavEmptyComponent', () => {
  let component: FeedbackLeftSidenavEmptyComponent;
  let fixture: ComponentFixture<FeedbackLeftSidenavEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackLeftSidenavEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackLeftSidenavEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
