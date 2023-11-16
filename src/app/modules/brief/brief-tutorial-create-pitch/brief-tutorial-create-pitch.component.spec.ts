/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BriefTutorialCreatePitchComponent } from './brief-tutorial-create-pitch.component';



describe('BriefTutorialCreateBriefComponent', () => {
  let component: BriefTutorialCreatePitchComponent;
  let fixture: ComponentFixture<BriefTutorialCreatePitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefTutorialCreatePitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefTutorialCreatePitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
