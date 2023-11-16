/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeedbackClosePieceSidenavComponent } from './feedback-close-piece-sidenav.component';

describe('FeedbackClosePieceSidenavComponent', () => {
  let component: FeedbackClosePieceSidenavComponent;
  let fixture: ComponentFixture<FeedbackClosePieceSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackClosePieceSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackClosePieceSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
