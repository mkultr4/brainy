/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefGivebacksComponent } from './brief-givebacks.component';

describe('BriefGivebacksComponent', () => {
  let component: BriefGivebacksComponent;
  let fixture: ComponentFixture<BriefGivebacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefGivebacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefGivebacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
