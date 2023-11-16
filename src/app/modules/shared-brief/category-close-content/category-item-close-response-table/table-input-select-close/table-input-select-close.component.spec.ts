/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableInputSelectCloseComponent } from './table-input-select-close.component';

describe('TableInputSelectCloseComponent', () => {
  let component: TableInputSelectCloseComponent;
  let fixture: ComponentFixture<TableInputSelectCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableInputSelectCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInputSelectCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
