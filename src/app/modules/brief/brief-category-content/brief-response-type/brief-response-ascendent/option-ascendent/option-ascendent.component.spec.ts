/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OptionAscendentComponent } from './option-ascendent.component';

describe('OptionAscendentComponent', () => {
  let component: OptionAscendentComponent;
  let fixture: ComponentFixture<OptionAscendentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionAscendentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionAscendentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
