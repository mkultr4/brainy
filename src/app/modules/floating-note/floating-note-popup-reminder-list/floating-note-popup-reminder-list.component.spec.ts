/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FloatingNotePopupReminderListComponent } from './floating-note-popup-reminder-list.component';

describe('FloatingNotePopupReminderListComponent', () => {
  let component: FloatingNotePopupReminderListComponent;
  let fixture: ComponentFixture<FloatingNotePopupReminderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingNotePopupReminderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingNotePopupReminderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
