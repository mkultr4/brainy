/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MzModalBrainyComponent } from './mz-modal-brainy.component';

describe('MzModalBrainyComponent', () => {
  let component: MzModalBrainyComponent;
  let fixture: ComponentFixture<MzModalBrainyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzModalBrainyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzModalBrainyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
