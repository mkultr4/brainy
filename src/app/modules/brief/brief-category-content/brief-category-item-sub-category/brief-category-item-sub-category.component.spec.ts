/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefCategoryItemSubCategoryComponent } from './brief-category-item-sub-category.component';

describe('BriefCategoryItemSubCategoryComponent', () => {
  let component: BriefCategoryItemSubCategoryComponent;
  let fixture: ComponentFixture<BriefCategoryItemSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefCategoryItemSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefCategoryItemSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
