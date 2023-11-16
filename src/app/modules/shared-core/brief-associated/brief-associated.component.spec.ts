/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefAssociatedComponent } from './brief-associated.component';

describe('BriefAssociatedComponent', () => {
  let component: BriefAssociatedComponent;
  let fixture: ComponentFixture<BriefAssociatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefAssociatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefAssociatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
