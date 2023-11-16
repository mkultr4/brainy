import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';

@Component({
  selector: 'app-topic-editor-agreement-title',
  templateUrl: './topic-editor-agreement-title.component.html',
  styleUrls: ['./topic-editor-agreement-title.component.scss']
})
export class TopicEditorAgreementTitleComponent implements OnInit {
  public showToolbar = true;
  // Inputs
  @Input() enableComments: boolean;
  @Input() commentThreads = [];
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  // Output 
  @Output() onAddComment = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  addComment(){
    this.onAddComment.emit();
    this.showToolbar = false;
  }
  showToolbarComments(){
    if(this.enableComments){
      this.showToolbar = true;
    }
  }
  hideToolbarComments(){
    this.showToolbar = false;
  }
  @HostListener('mousemove', ['$event']) onMouseMove(event) {

    let mouseSide = '';
    const parent = $('.topic-description-editable-container');

    if ((event.pageX - parent.offset().left) < parent.width() / 2) {
      mouseSide = 'L';
    } else {
      mouseSide = 'R';
    }
    // console.log('mouse-side', mouseSide);
    // If mouse over right show toolbar of comments
    if (mouseSide === 'R') {
      // console.log('show sidebar');
      this.showToolbarComments();
      // If mouse over lef show toolbar of actions
    } else if (mouseSide === 'L') {
      this.hideToolbarComments();
    }

  }
  // Mouse leave
  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
    this.hideToolbarComments();
  }
}
