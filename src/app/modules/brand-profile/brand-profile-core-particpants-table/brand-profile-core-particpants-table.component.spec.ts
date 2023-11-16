/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BrandProfileCoreParticpantsTableComponent } from './brand-profile-core-particpants-table.component';

describe('BrandProfileCoreParticpantsTableComponent', () => {
  let component: BrandProfileCoreParticpantsTableComponent;
  let fixture: ComponentFixture<BrandProfileCoreParticpantsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandProfileCoreParticpantsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandProfileCoreParticpantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
