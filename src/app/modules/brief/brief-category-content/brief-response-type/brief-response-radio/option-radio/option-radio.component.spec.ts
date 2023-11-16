/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OptionRadioComponent } from './option-radio.component';

describe('OptionRadioComponent', () => {
  let component: OptionRadioComponent;
  let fixture: ComponentFixture<OptionRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
