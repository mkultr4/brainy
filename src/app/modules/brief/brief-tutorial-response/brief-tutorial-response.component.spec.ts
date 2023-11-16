/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefTutorialResponseComponent } from './brief-tutorial-response.component';

describe('BriefTutorialResponseComponent', () => {
  let component: BriefTutorialResponseComponent;
  let fixture: ComponentFixture<BriefTutorialResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefTutorialResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefTutorialResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
