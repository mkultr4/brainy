/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefGivebackPitchComponent } from './brief-giveback-pitch.component';

describe('BriefGivebackPitchComponent', () => {
  let component: BriefGivebackPitchComponent;
  let fixture: ComponentFixture<BriefGivebackPitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefGivebackPitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefGivebackPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
