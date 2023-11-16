/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CategoryItemCloseResponseDateComponent } from './category-item-close-response-date.component';

describe('CategoryItemCloseResponseDateComponent', () => {
  let component: CategoryItemCloseResponseDateComponent;
  let fixture: ComponentFixture<CategoryItemCloseResponseDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryItemCloseResponseDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryItemCloseResponseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
