/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OptionDateComponent } from './option-date.component';

describe('OptionDateComponent', () => {
  let component: OptionDateComponent;
  let fixture: ComponentFixture<OptionDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
