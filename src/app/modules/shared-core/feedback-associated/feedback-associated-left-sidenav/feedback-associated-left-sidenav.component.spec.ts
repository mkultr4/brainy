/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeedbackAssociatedLeftSidenavComponent } from './feedback-associated-left-sidenav.component';

describe('FeedbackAssociatedLeftSidenavComponent', () => {
  let component: FeedbackAssociatedLeftSidenavComponent;
  let fixture: ComponentFixture<FeedbackAssociatedLeftSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackAssociatedLeftSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAssociatedLeftSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
