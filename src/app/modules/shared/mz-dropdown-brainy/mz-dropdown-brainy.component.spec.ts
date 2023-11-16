/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MzDropdownBrainyComponent } from './mz-dropdown-brainy.component';

describe('MzDropdownBrainyComponent', () => {
  let component: MzDropdownBrainyComponent;
  let fixture: ComponentFixture<MzDropdownBrainyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzDropdownBrainyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzDropdownBrainyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
