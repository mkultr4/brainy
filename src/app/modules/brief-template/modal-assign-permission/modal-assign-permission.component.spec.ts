import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignPermissionComponent } from './modal-assign-permission.component';

describe('ModalAssignPermissionComponent', () => {
  let component: ModalAssignPermissionComponent;
  let fixture: ComponentFixture<ModalAssignPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAssignPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
