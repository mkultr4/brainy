/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CategoryItemCloseResponseRadioComponent } from './category-item-close-response-radio.component';

describe('CategoryItemCloseResponseRadioComponent', () => {
  let component: CategoryItemCloseResponseRadioComponent;
  let fixture: ComponentFixture<CategoryItemCloseResponseRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryItemCloseResponseRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryItemCloseResponseRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
