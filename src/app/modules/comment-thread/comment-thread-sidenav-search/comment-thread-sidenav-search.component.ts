import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { CommentThreadMessage } from '../../../models/comments/comment-thread-message';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { CommentThreadType } from '../../../models/comments/comment-thread-type';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { AsidenavComponent } from '../../shared-sidenav/asidenav/asidenav.component';
import { CommentThreadStrategyService } from '../../../services/comments/comment-thread-strategy.service';
import { CommentThread } from '../../../models/comments/comment-thread';
import { CommentComunicationService } from '../services/comment-comunication.service';




@Component({
  selector: 'app-comment-thread-sidenav-search,[app-comment-thread-sidenav-search]',
  templateUrl: './comment-thread-sidenav-search.component.html',
  styleUrls: ['./comment-thread-sidenav-search.component.scss']
})
export class CommentThreadSidenavSearchComponent implements OnInit, AfterViewInit {

  public commentThreadMessageFilter: Array<CommentThreadMessage>;
  // Filters
  public statusFilter: CommentThreadStatus;
  public typeFilter: CommentThreadType;
  public search = '';
  // Services
  private _commentThreadService;
  // Inputs
  @Input() coreId: any;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() commentThreadStatuses: Array<CommentThreadStatus>;
  @Input() commentThreadTypes: Array<CommentThreadType>;
  @Input() currentUser: User;
  // View child
  @ViewChild('commentsThreadSearchSideNav') commentsThreadSideNav: AsidenavComponent;

  constructor(
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _commentComunicationService: CommentComunicationService
  ) {
    this._commentThreadService = this._commentThreadStrategyService.getService();
  }
  ngAfterViewInit() {

  }
  ngOnInit() {
  }

  showSidenav() {
    this.commentsThreadSideNav.showSidenav();
  }
  // On Show
  onShow() {
  }
  // On hide sidenav
  onHide() {
    this.statusFilter = undefined;
    this.typeFilter = undefined;
    this.search = '';
    this.commentThreadMessageFilter = new Array<CommentThreadMessage>();
  }
  setStatus(status) {
    this.statusFilter = status;
    this.filterComments();
  }
  setType(type) {
    this.typeFilter = type;
    this.filterComments();
  }
  onChangeSearch($event) {
    console.log('search');
    this.filterComments();

  }
  filterComments() {
    this._commentThreadService
      .findCommentThreadMessages(this.coreId, this.search, this.typeFilter, this.statusFilter)
      .subscribe(comments => {
        this.commentThreadMessageFilter = comments;
      })

  }

  goToComment(commentThread: CommentThread) {
    console.log('go to comment thread', commentThread);
    this.commentsThreadSideNav.hideSidenav();
    this._commentComunicationService.setCommentToGo(commentThread);
    
  }
}
