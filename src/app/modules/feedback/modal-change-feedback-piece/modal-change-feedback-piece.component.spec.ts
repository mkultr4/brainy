/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalChangeFeedbackPieceComponent } from './modal-change-feedback-piece.component';

describe('ModalChangeFeedbackPieceComponent', () => {
  let component: ModalChangeFeedbackPieceComponent;
  let fixture: ComponentFixture<ModalChangeFeedbackPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChangeFeedbackPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeFeedbackPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
