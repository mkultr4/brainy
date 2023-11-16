/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefPresentationSlideComponent } from './brief-presentation-slide.component';

describe('BriefPresentationSlideComponent', () => {
  let component: BriefPresentationSlideComponent;
  let fixture: ComponentFixture<BriefPresentationSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefPresentationSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefPresentationSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
