/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OptionAscendentCloseComponent } from './option-ascendent-close.component';

describe('OptionAscendentCloseComponent', () => {
  let component: OptionAscendentCloseComponent;
  let fixture: ComponentFixture<OptionAscendentCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionAscendentCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionAscendentCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
