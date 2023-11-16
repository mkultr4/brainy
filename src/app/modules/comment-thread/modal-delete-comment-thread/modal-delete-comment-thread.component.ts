import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';

import { ISubscription } from 'rxjs/Subscription';
import { CommentThread } from '../../../models/comments/comment-thread';
import { MzModalComponent } from 'ngx-materialize';
import { CommentComunicationService, CommentThreadComunicationInfo } from '../services/comment-comunication.service';
import { CommentThreadStrategyService } from '../../../services/comments/comment-thread-strategy.service';

@Component({
  selector: 'app-modal-delete-comment-thread,[app-modal-delete-comment-thread]',
  templateUrl: './modal-delete-comment-thread.component.html',
  styleUrls: ['./modal-delete-comment-thread.component.scss']
})
export class ModalDeleteCommentThreadComponent implements OnInit, OnDestroy {
  public commentThread: CommentThread;
  public btnDisabled = false;
  public subscriptionModalDelete: ISubscription;
  public modalDeleteOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
      this.commentThread = undefined;
      this.btnDisabled = false;
    }
  };
  // Services
  private _commentThreadService
  @Output() onDelete = new EventEmitter();
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(
    private _commentComunicationService: CommentComunicationService,
    private _commentThreadStrategyService: CommentThreadStrategyService
  ) { 
    this._commentThreadService = this._commentThreadStrategyService.getService();
  }

  ngOnInit() {
    this.subscriptionModalDelete = this._commentComunicationService.
      showDeleteModalObs.subscribe((commentThreadComunicationInfo: CommentThreadComunicationInfo) => {
        if (commentThreadComunicationInfo.show) {
          this.commentThread = commentThreadComunicationInfo.commentThread;
          this.openModal();
        } else {
          this.commentThread = undefined;
        }

      });
  }
  openModal() {
    this.modal.openModal();
  }
  delete() {
    this.btnDisabled = true;
    this._commentThreadService.remove(this.commentThread.id).subscribe((response)=>{
      this.btnDisabled = false;
      if(response){
        this.onDelete.emit();
        this.modal.closeModal();
      }
    });
    


  }
  ngOnDestroy() {
    if (this.subscriptionModalDelete) {
      this.subscriptionModalDelete.unsubscribe();
    }
  }

}
