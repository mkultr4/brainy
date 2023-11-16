/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OptionAssessmentNumberCloseComponent } from './option-assessment-number-close.component';

describe('OptionAssessmentNumberCloseComponent', () => {
  let component: OptionAssessmentNumberCloseComponent;
  let fixture: ComponentFixture<OptionAssessmentNumberCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionAssessmentNumberCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionAssessmentNumberCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
