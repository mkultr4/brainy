/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BrandProfileMembersComponent } from './brand-profile-members.component';

describe('BrandProfileMembersComponent', () => {
  let component: BrandProfileMembersComponent;
  let fixture: ComponentFixture<BrandProfileMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandProfileMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandProfileMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
