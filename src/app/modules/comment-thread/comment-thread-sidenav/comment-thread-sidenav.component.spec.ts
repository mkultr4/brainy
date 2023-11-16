import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentThreadSidenavComponent } from './comment-thread-sidenav.component';

describe('CommentThreadSidenavComponent', () => {
  let component: CommentThreadSidenavComponent;
  let fixture: ComponentFixture<CommentThreadSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentThreadSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentThreadSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
