/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefResponseListComponent } from './brief-response-list.component';

describe('BriefResponseListComponent', () => {
  let component: BriefResponseListComponent;
  let fixture: ComponentFixture<BriefResponseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefResponseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefResponseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
