import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentThreadPointComponent } from './comment-thread-point.component';

describe('CommentThreadPointComponent', () => {
  let component: CommentThreadPointComponent;
  let fixture: ComponentFixture<CommentThreadPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentThreadPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentThreadPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
