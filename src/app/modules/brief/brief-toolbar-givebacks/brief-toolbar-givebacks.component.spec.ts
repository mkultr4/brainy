/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefToolbarGivebacksComponent } from './brief-toolbar-givebacks.component';

describe('BriefToolbarReturnsComponent', () => {
  let component: BriefToolbarGivebacksComponent;
  let fixture: ComponentFixture<BriefToolbarGivebacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefToolbarGivebacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefToolbarGivebacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
