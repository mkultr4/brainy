/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalDashboardArchiveProjectComponent } from './modal-dashboard-archive-project.component';

describe('ModalDashboardArchiveProjectComponent', () => {
  let component: ModalDashboardArchiveProjectComponent;
  let fixture: ComponentFixture<ModalDashboardArchiveProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDashboardArchiveProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDashboardArchiveProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
