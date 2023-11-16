/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableInputCloseComponent } from './table-input-close.component';

describe('TableInputCloseComponent', () => {
  let component: TableInputCloseComponent;
  let fixture: ComponentFixture<TableInputCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableInputCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInputCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
