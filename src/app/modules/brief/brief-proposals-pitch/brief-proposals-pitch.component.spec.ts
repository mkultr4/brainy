/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefProposalsPitchComponent } from './brief-proposals-pitch.component';

describe('BriefProposalsPitchComponent', () => {
  let component: BriefProposalsPitchComponent;
  let fixture: ComponentFixture<BriefProposalsPitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefProposalsPitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefProposalsPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
