/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NiceDateComponent } from './nice-date.component';

describe('NiceDateComponent', () => {
  let component: NiceDateComponent;
  let fixture: ComponentFixture<NiceDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiceDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiceDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
