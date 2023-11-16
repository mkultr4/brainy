/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefTemplatePitchComponent } from './brief-template-pitch.component';

describe('BriefTemplatePitchComponent', () => {
  let component: BriefTemplatePitchComponent;
  let fixture: ComponentFixture<BriefTemplatePitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefTemplatePitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefTemplatePitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
