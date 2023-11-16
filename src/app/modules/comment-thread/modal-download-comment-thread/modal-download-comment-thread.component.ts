import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { CommentThread } from '../../../models/comments/comment-thread';
import { MzModalComponent } from 'ngx-materialize';
import { CommentComunicationService, CommentThreadComunicationInfo } from '../services/comment-comunication.service';
import { CommentThreadStrategyService } from '../../../services/comments/comment-thread-strategy.service';

@Component({
  selector: 'app-modal-download-comment-thread,[app-modal-download-comment-thread]',
  templateUrl: './modal-download-comment-thread.component.html',
  styleUrls: ['./modal-download-comment-thread.component.scss']
})
export class ModalDownloadCommentThreadComponent implements OnInit, OnDestroy {
  commentThread: CommentThread;
  subscriptionModalDownload: ISubscription;
  public fileName = '';
  public downloadComments = true;
  public generateExport = false;
  public exporting = false;
  public subscriptionShow: ISubscription;
  public export: any;
  

  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    ready: (modal, trigger) => { },
    complete: () => {
      this.fileName = '';
      this.commentThread = undefined;
      this.exporting = false;
      this.generateExport = false;
      this.export = undefined;

    }
  };
  // Services
  private _commentThreadService;
  // Modal
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(
    private _commentComunicationService: CommentComunicationService,
    private _commentThreadStrategyService: CommentThreadStrategyService
    
  ) { 
    this._commentThreadService = this._commentThreadStrategyService.getService();
  }

  ngOnInit() {
    this.subscriptionModalDownload =
      this._commentComunicationService.showDownloadModalObs.
        subscribe((commentThreadComunicationInfo: CommentThreadComunicationInfo) => {
          if (commentThreadComunicationInfo.show) {
            this.commentThread = commentThreadComunicationInfo.commentThread;
            this._commentThreadService.getDownloadName(this.commentThread).subscribe(filename => {
              this.fileName = filename;
              this.openModal();
            });

          } else {
            this.commentThread = undefined;
          }

        });
  }
  openModal() {
    this.modal.openModal();
  }
  closeModal() {
    if (!this.exporting) {
      this.modal.closeModal();
    }
  }
  generate() {
    this.generateExport = true;
    this.exporting = true;

    this._commentThreadService.downloadCommentThread(this.commentThread).subscribe(file => {
      this.exporting = false;
      this.export = file;
    });

  }
  download() {
    window.open(this.export);
    this.modal.closeModal();
  }
  ngOnDestroy() {
    if (this.subscriptionModalDownload) {
      this.subscriptionModalDownload.unsubscribe();
    }
  }

}
