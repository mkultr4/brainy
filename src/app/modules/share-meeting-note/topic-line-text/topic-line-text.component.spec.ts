/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopicLineTextComponent } from './topic-line-text.component';

describe('TopicLineTextComponent', () => {
  let component: TopicLineTextComponent;
  let fixture: ComponentFixture<TopicLineTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicLineTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicLineTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
