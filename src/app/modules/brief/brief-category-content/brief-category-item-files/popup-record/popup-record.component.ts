import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommentInputRecordComponent } from 'src/app/modules/comment-thread/comment-input/comment-input-record/comment-input-record.component';
import { ModalFloatingComponent } from 'src/app/modules/shared/modal-floating/modal-floating.component';
import { CommentThreadMessage } from 'src/app/models/comments/comment-thread-message';


@Component({
  selector: 'app-popup-record',
  templateUrl: './popup-record.component.html',
  styleUrls: ['./popup-record.component.scss']
})
export class PopupRecordComponent implements OnInit {
  // Input
  @Input() briefCategoryItemId: string;
  // Output 
  @Output() onAcceptAudio = new EventEmitter();
  // View childs
  @ViewChild(CommentInputRecordComponent) commentInputRecord: CommentInputRecordComponent;
  @ViewChild(ModalFloatingComponent) modal: ModalFloatingComponent;
  // Constructor
  constructor() { }

  ngOnInit() {
  }
  onCancelRecord() {
    this.modal.hideModal();
  }
  onHide() {
    this.commentInputRecord.reinitRecording();
  }
  onAcceptRecord(audio: CommentThreadMessage) {
    this.onAcceptAudio.emit({ src: audio.commentAudio, duration: audio.commentAudioDuration });
    this.modal.hideModal();
  }

}
