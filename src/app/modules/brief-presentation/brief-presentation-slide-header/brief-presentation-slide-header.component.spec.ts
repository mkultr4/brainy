/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefPresentationSlideHeaderComponent } from './brief-presentation-slide-header.component';

describe('BriefPresentationSlideHeaderComponent', () => {
  let component: BriefPresentationSlideHeaderComponent;
  let fixture: ComponentFixture<BriefPresentationSlideHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefPresentationSlideHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefPresentationSlideHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
