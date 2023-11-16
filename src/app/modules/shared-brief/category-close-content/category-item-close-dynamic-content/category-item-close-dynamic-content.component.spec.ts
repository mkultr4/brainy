/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CategoryItemCloseDynamicContentComponent } from './category-item-close-dynamic-content.component';

describe('CategoryItemCloseDynamicContentComponent', () => {
  let component: CategoryItemCloseDynamicContentComponent;
  let fixture: ComponentFixture<CategoryItemCloseDynamicContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryItemCloseDynamicContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryItemCloseDynamicContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
