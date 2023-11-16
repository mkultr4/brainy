/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContextualBriefCategoryItemResponseComponent } from './contextual-brief-category-item-response.component';

describe('ContextualBriefCategoryItemResponseComponent', () => {
  let component: ContextualBriefCategoryItemResponseComponent;
  let fixture: ComponentFixture<ContextualBriefCategoryItemResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextualBriefCategoryItemResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextualBriefCategoryItemResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
