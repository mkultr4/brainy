/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToastrBrainyComponent } from './toastr-brainy.component';

describe('ToastBrainyComponent', () => {
  let component: ToastrBrainyComponent;
  let fixture: ComponentFixture<ToastrBrainyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastrBrainyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastrBrainyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
