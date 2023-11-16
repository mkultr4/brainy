/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefResponseTextComponent } from './brief-response-text.component';

describe('BriefResponseTextComponent', () => {
  let component: BriefResponseTextComponent;
  let fixture: ComponentFixture<BriefResponseTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefResponseTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefResponseTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
