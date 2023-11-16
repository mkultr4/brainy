import { Component, OnInit, Output, EventEmitter, AfterViewInit, Input, HostListener, ViewChild, AfterContentInit } from '@angular/core';

import { Observable } from 'rxjs';
import * as uuid from 'uuid/v4';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// tslint:disable-next-line:max-line-length
import { CommentThreadPopupInvitationListComponent } from '../comment-thread-popup-invitation-list/comment-thread-popup-invitation-list.component';
import { Invitation } from '../../../../models/invitations/invitation';
import { CommentThread } from '../../../../models/comments/comment-thread';
import { WorkspaceAccess } from '../../../../models/workspace/workspace-access';
import { WorkspaceAccessStrategyService } from '../../../../services/workspace/workspace-access-strategy.service';
import 'rxjs/add/operator/mergeMap';
import { Rol } from '../../../../models/workspace/rol';
import { Category } from '../../../../models/categories/category';
@Component({
  selector: 'app-comment-thread-popup-invitations,[app-comment-thread-popup-invitations]',
  templateUrl: './comment-thread-popup-invitations.component.html',
  styleUrls: ['./comment-thread-popup-invitations.component.scss']
})
export class CommentThreadPopupInvitationsComponent implements OnInit, AfterContentInit {
  // Public
  public asyncParticipantSearch = '';
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;
  public dataSourceParticipants: Observable<any>;
  public suggestionInvite = false;
  public workflowInvitation = false;
  // Services
  private _workspaceAccessService;
  // Inputs
  @Input() coreType: any;
  @Input() coreId: any;
  @Input() invitations: Invitation[];
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() categories: Array<Category>;
  @Input() roles: Array<Rol>;
  // Outputs
  @Output() commentOnCloseParentModal = new EventEmitter();
  @Output() commentOnShowWorkflowInvitation = new EventEmitter();
  // View child
  @ViewChild('formShare') formShare: NgForm;
  @ViewChild('invitationList') invitationList: CommentThreadPopupInvitationListComponent;

  constructor(
    private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
    private _toastrService: ToastrService
  ) {
    this._workspaceAccessService = this._workspaceAccessStrategyService.getService();



  }

  // On init
  ngOnInit() {

  }
  // After view init
  ngAfterContentInit() {
    this.dataSourceParticipants = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncParticipantSearch);
    }).mergeMap((token: string) => this._workspaceAccessService.findWorkspaceAccess(this.workspaceAccess.workspace.id, token));
  }

  // When search
  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
  // When dont have results
  changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
    // If is email
    if (this.formShare.valid) {
      this.suggestionInvite = true;
    } else {
      this.suggestionInvite = false;
    }
  }
  // Typehead select
  typeaheadOnSelect(e: TypeaheadMatch): void {

    this.asyncParticipantSearch = '';
    const invitation = new Invitation();
    invitation.id = uuid();
    invitation.workspaceAccess = <WorkspaceAccess>e.item;
    invitation.groupReference = 'comment';
    invitation.levelId = 'CORE';
    invitation.referenceId = this.coreId;
    this.invitations.push(invitation);
    // scroll to bottom
    this.scrollToBottomList();

  }
  /**
   * On key up
   * @param e
   */
  onKeyUp(e) {
    const enterKey = 13;
    if (e.which === enterKey) {
      if (this.suggestionInvite) {
        this.showWorkflowInvitation();
      }

    }
  }

  @HostListener('window:click', ['$event']) public onClickModal(targetElement) {
    if (this.suggestionInvite) {
      this.showWorkflowInvitation();
    }
  }
  /**
   * On delete invitation
   */
  onDeleteInvitation() {
    // On delete invitation event is trigger
  }
  // Invitation
  /**
   * Cancel suggestion invitation
   */
  cancelSuggestion() {
    this.suggestionInvite = false;
  }
  /**
   * Init workflow of invitation
   * @param  $event
   */
  showWorkflowInvitation($event = null) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.suggestionInvite = false;
    this.workflowInvitation = true;
    this.commentOnShowWorkflowInvitation.emit(true);
  }

  /**
   * Cancel workfkow invitation
   */
  cancelWorkfklowInvitation($event = null) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.asyncParticipantSearch = '';
    this.workflowInvitation = false;
    this.commentOnShowWorkflowInvitation.emit(false);
  }
  /**
   * Event on add invitation
   * @param invitation
   */
  onAddInvitation(invitation: Invitation) {
    this.invitations.push(invitation);
    this.formShare.resetForm();
    this.cancelWorkfklowInvitation();
    this.scrollToBottomList();
  }
  /**
   * On change permission
   * @param permission
   */
  onChangePermissionInvitation(permission) {
    const invitation = this.invitations.filter(i => i.id === permission.invitation.id)[0];
    invitation.groupReference = permission.permission;
    if (invitation.groupReference === 'editor') {
      this._toastrService.info('Has asignado a un Editor');
    }
    if (invitation.groupReference === 'approver') {
      this._toastrService.info('Has asignado a un Aprobador');

    }
  }
  // Close parent modal
  closeParentModal() {
    this.commentOnCloseParentModal.emit();
  }

  private scrollToBottomList() {
    setTimeout(() => {
      // Scoll to bottom
      this.invitationList.participantsScroll.update();
      this.invitationList.participantsScroll.scrollToBottom();
    });
  }


}
