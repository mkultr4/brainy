/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefCategoryItemDynamicContentComponent } from './brief-category-item-dynamic-content.component';

describe('BriefCategoryItemDynamicContentComponent', () => {
  let component: BriefCategoryItemDynamicContentComponent;
  let fixture: ComponentFixture<BriefCategoryItemDynamicContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefCategoryItemDynamicContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefCategoryItemDynamicContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
