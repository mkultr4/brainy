import { Component, OnInit, AfterContentInit, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { InvitationLevel } from '../../../../models/invitations/invitation-level';
import { WorkspaceAccess } from '../../../../models/workspace/workspace-access';
import { Invitation } from '../../../../models/invitations/invitation';
import * as uuid from 'uuid/v4';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WorkspaceAccessStrategyService } from '../../../../services/workspace/workspace-access-strategy.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'app-share-participants-content',
  templateUrl: './share-participants-content.component.html',
  styleUrls: ['./share-participants-content.component.scss']
})
export class ShareParticipantsContentComponent implements OnInit, AfterContentInit {
  // Public
  public asyncParticipantSearch = '';
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;
  public dataSourceParticipants: Observable<any>;
  public suggestionInvite = false;
  public workflowInvitation = false;
  public shareLinkHasPassword = false;
  // Services
  private _workspaceAccessService;
  // Inputs
  @Input() invitationLevelId = InvitationLevel.CORE;
  @Input() invitationReferenceId: string;
  @Input() objectType: string;
  @Input() showShareLink = true;
  @Input() invitations: Array<Invitation> = [];
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() candAddParticipants = true;
  @Input() canAssignPermission = true;
  // Outputs
  @Output() shareCloseParentModal = new EventEmitter();
  // View childs
  @ViewChild('formShare') formShare: NgForm;

  constructor(
    private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
    private _toastrService: ToastrService
  ) {
    this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
    this.dataSourceParticipants = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncParticipantSearch);
    }).mergeMap((token: string) => this._workspaceAccessService.findWorkspaceAccess(this.workspaceAccess.workspace.id, token));



  }

  // On init
  ngOnInit() {
    this.asyncParticipantSearch = '';
  }
  // After view init
  ngAfterContentInit() {

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
      if(this.candAddParticipants){
        this.suggestionInvite = true;
      }
      
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
    invitation.levelId = this.invitationLevelId;
    invitation.referenceId = this.invitationReferenceId;
    this.invitations = this.invitations.concat([invitation]);


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

  // Copy to clipboard
  onCopyToClipboard() {
    this._toastrService.info('Copiado al portapapeles');
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
  }

  /**
   * Cancel workfkow invitation
   */
  cancelWorkfklowInvitation() {
    this.asyncParticipantSearch = '';
    this.workflowInvitation = false;

  }
  /**
   * Event on add invitation
   * @param invitation
   */
  onAddInvitation(invitation: Invitation) {
    this.invitations.push(invitation);
    this.formShare.resetForm();
    this.cancelWorkfklowInvitation();
  }

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
  closeParentModal(invitations: Invitation[]) {
    console.log('call parent close',invitations);
    this.shareCloseParentModal.emit(invitations);
  }

}
