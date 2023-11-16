/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefContentComponent } from './brief-content.component';

describe('BriefContentComponent', () => {
  let component: BriefContentComponent;
  let fixture: ComponentFixture<BriefContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
