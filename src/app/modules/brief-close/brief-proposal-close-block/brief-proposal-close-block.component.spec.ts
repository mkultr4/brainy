/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefProposalCloseBlockComponent } from './brief-proposal-close-block.component';

describe('BriefProposalCloseBlockComponent', () => {
  let component: BriefProposalCloseBlockComponent;
  let fixture: ComponentFixture<BriefProposalCloseBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefProposalCloseBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefProposalCloseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
