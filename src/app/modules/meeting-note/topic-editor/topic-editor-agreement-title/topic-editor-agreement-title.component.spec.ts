/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopicEditorAgreementTitleComponent } from './topic-editor-agreement-title.component';

describe('TopicEditorAgreementTitleComponent', () => {
  let component: TopicEditorAgreementTitleComponent;
  let fixture: ComponentFixture<TopicEditorAgreementTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicEditorAgreementTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicEditorAgreementTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
