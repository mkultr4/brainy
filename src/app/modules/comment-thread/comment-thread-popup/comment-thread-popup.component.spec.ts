import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentThreadPopupComponent } from './comment-thread-popup.component';

describe('CommentThreadPopupComponent', () => {
  let component: CommentThreadPopupComponent;
  let fixture: ComponentFixture<CommentThreadPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentThreadPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentThreadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
