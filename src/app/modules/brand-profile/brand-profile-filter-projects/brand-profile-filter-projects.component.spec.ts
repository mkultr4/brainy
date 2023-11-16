/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BrandProfileFilterProjectsComponent } from './brand-profile-filter-projects.component';

describe('BrandProfileFilterProjectsComponent', () => {
  let component: BrandProfileFilterProjectsComponent;
  let fixture: ComponentFixture<BrandProfileFilterProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandProfileFilterProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandProfileFilterProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
