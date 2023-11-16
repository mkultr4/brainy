/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeedbackCloseToolbarMainComponent } from './feedback-close-toolbar-main.component';

describe('FeedbackCloseToolbarMainComponent', () => {
  let component: FeedbackCloseToolbarMainComponent;
  let fixture: ComponentFixture<FeedbackCloseToolbarMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackCloseToolbarMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackCloseToolbarMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
