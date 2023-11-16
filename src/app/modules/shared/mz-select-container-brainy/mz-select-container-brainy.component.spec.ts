/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MzSelectContainerBrainyComponent } from './mz-select-container-brainy.component';

describe('MzSelectContainerBrainyComponent', () => {
  let component: MzSelectContainerBrainyComponent;
  let fixture: ComponentFixture<MzSelectContainerBrainyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzSelectContainerBrainyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSelectContainerBrainyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
