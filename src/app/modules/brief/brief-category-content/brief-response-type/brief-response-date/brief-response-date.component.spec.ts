/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefResponseDateComponent } from './brief-response-date.component';

describe('BriefResponseDateComponent', () => {
  let component: BriefResponseDateComponent;
  let fixture: ComponentFixture<BriefResponseDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefResponseDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefResponseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
