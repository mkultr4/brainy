/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OptionAssessmentTextCloseComponent } from './option-assessment-text-close.component';

describe('OptionAssessmentTextCloseComponent', () => {
  let component: OptionAssessmentTextCloseComponent;
  let fixture: ComponentFixture<OptionAssessmentTextCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionAssessmentTextCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionAssessmentTextCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
