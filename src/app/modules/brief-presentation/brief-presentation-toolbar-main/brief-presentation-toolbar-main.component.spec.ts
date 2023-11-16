/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefPresentationToolbarMainComponent } from './brief-presentation-toolbar-main.component';

describe('BriefPresentationToolbarMainComponent', () => {
  let component: BriefPresentationToolbarMainComponent;
  let fixture: ComponentFixture<BriefPresentationToolbarMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefPresentationToolbarMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefPresentationToolbarMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
