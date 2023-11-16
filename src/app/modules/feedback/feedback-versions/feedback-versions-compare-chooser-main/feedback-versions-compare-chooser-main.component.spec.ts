/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeedbackVersionsCompareChooserMainComponent } from './feedback-versions-compare-chooser-main.component';

describe('FeedbackVersionsCompareChooserMainComponent', () => {
  let component: FeedbackVersionsCompareChooserMainComponent;
  let fixture: ComponentFixture<FeedbackVersionsCompareChooserMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackVersionsCompareChooserMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackVersionsCompareChooserMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
