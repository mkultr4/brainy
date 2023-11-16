/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OptionListCloseComponent } from './option-list-close.component';

describe('OptionListCloseComponent', () => {
  let component: OptionListCloseComponent;
  let fixture: ComponentFixture<OptionListCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionListCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionListCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
