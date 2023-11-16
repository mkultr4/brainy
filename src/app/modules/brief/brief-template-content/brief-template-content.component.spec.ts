/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BriefTemplateContentComponent } from './brief-template-content.component';

describe('BriefTemplateContentComponent', () => {
  let component: BriefTemplateContentComponent;
  let fixture: ComponentFixture<BriefTemplateContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefTemplateContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefTemplateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
