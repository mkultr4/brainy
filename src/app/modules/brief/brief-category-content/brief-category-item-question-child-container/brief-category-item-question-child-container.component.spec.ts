/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefCategoryItemQuestionChildContainerComponent } from './brief-category-item-question-child-container.component';

describe('BriefCategoryItemQuestionChildContainerComponent', () => {
  let component: BriefCategoryItemQuestionChildContainerComponent;
  let fixture: ComponentFixture<BriefCategoryItemQuestionChildContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefCategoryItemQuestionChildContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefCategoryItemQuestionChildContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
