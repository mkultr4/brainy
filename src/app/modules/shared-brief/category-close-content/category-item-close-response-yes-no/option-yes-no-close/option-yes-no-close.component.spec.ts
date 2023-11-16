/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OptionYesNoCloseComponent } from './option-yes-no-close.component';

describe('OptionYesNoCloseComponent', () => {
  let component: OptionYesNoCloseComponent;
  let fixture: ComponentFixture<OptionYesNoCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionYesNoCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionYesNoCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
