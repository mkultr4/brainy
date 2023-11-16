/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeedbackVersionsLeftPieceComponent } from './feedback-versions-left-piece.component';

describe('FeedbackVersionsLeftPieceComponent', () => {
  let component: FeedbackVersionsLeftPieceComponent;
  let fixture: ComponentFixture<FeedbackVersionsLeftPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackVersionsLeftPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackVersionsLeftPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
