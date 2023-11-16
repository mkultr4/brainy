/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableInputDateComponent } from './table-input-date.component';

describe('TableInputDateComponent', () => {
  let component: TableInputDateComponent;
  let fixture: ComponentFixture<TableInputDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableInputDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
