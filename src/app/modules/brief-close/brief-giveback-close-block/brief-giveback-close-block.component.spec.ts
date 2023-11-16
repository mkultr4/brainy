/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefGivebackCloseBlockComponent } from './brief-giveback-close-block.component';

describe('BriefGivebackCloseBlockComponent', () => {
  let component: BriefGivebackCloseBlockComponent;
  let fixture: ComponentFixture<BriefGivebackCloseBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefGivebackCloseBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefGivebackCloseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
