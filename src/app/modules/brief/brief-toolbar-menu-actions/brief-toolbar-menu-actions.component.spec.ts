/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefToolbarMenuActionsComponent } from './brief-toolbar-menu-actions.component';

describe('BriefToolbarMenuActionsComponent', () => {
  let component: BriefToolbarMenuActionsComponent;
  let fixture: ComponentFixture<BriefToolbarMenuActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefToolbarMenuActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefToolbarMenuActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
