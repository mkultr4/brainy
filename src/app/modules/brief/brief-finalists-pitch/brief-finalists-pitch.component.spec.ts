/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefFinalistsPitchComponent } from './brief-finalists-pitch.component';

describe('BriefFinalistsPitchComponent', () => {
  let component: BriefFinalistsPitchComponent;
  let fixture: ComponentFixture<BriefFinalistsPitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefFinalistsPitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefFinalistsPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
