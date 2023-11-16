/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefPresentationLeftSidenavComponent } from './brief-presentation-left-sidenav.component';

describe('BriefPresentationLeftSidenavComponent', () => {
  let component: BriefPresentationLeftSidenavComponent;
  let fixture: ComponentFixture<BriefPresentationLeftSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefPresentationLeftSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefPresentationLeftSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
