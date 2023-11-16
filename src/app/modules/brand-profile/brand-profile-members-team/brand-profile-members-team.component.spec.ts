/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BrandProfileMembersTeamComponent } from './brand-profile-members-team.component';

describe('BrandProfileMembersTeamComponent', () => {
  let component: BrandProfileMembersTeamComponent;
  let fixture: ComponentFixture<BrandProfileMembersTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandProfileMembersTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandProfileMembersTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
