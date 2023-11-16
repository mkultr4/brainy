import {
  Component, OnInit, Input, HostListener, OnDestroy,
  AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, AfterContentInit
} from '@angular/core';

import { ISubscription } from 'rxjs/Subscription';

import * as uuid from 'uuid/v4';

import ResizeObserver from 'resize-observer-polyfill';
import { ToastrService } from 'ngx-toastr';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { ParticipantType } from '../../../models/participants/participant-type';
import { CommentThreadMessage } from '../../../models/comments/comment-thread-message';
import { CommentThread } from '../../../models/comments/comment-thread';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { CommentComunicationService, CommentThreadComunicationInfo } from '../services/comment-comunication.service';
import { Rol } from '../../../models/workspace/rol';
import { Category } from '../../../models/categories/category';
import { Invitation } from '../../../models/invitations/invitation';
import { CommentThreadStrategyService } from '../../../services/comments/comment-thread-strategy.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';



@Component({
  selector: 'app-comment-thread-popup,[app-comment-thread-popup]',
  templateUrl: './comment-thread-popup.component.html',
  styleUrls: ['./comment-thread-popup.component.scss'],
  providers: []

})
export class CommentThreadPopupComponent implements OnInit, OnDestroy, AfterContentInit {

  public newCommentThreadMessage: CommentThreadMessage = new CommentThreadMessage();
  public display = 'right';
  public view = 'main';
  public popupShow = false;
  public hasOverlay = true;
  public commentInputChange = false;
  public commentParticipantChange = false;
  public commentParticipantChangeValue = false;
  public showWorkflowInvitation = false;
  public commentThreadEl: any;
  public shapeThreadEl: any;
  public $popup: any;
  public $arrow: any;
  public popupWidth = 370;
  public subscriptionShowPopup: ISubscription;
  public subscriptionUpdateSizing: ISubscription;
  public mutationPoint: MutationObserver;
  public mutationShape: MutationObserver;
  public resizeShape: MutationObserver;
  public resizePopup: ResizeObserver;
  public _commentThreadStatuses: Array<CommentThreadStatus>
  public invitations: Invitation[];
  // Services
  private _commentThreadService;
  private _invitationService;
  // Inputs
  @Input() commentThread: CommentThread = new CommentThread();
  @Input() coreType: any;
  @Input() coreId: any;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() forceError = false;
  @Input() set commentThreadStatuses(commentThreadStatuses: Array<CommentThreadStatus>) {
    this._commentThreadStatuses = commentThreadStatuses.filter(c => c.key !== 'all');
  };
  @Input() participantTypes: Array<ParticipantType>;
  @Input() categories: Array<Category>;
  @Input() roles: Array<Rol>;
  // Outputs
  @Output() popupOnAccept = new EventEmitter();
  @Output() popupOnCancel = new EventEmitter();
  // View childs
  @ViewChild('commentThreadElementTitle') commentThreadElementTitle: ElementRef;
  @ViewChild('popup') popupEl: ElementRef;
  @ViewChild('arrow') arrowEl: ElementRef;
  // Constructor
  constructor(
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _invitationStrategyService: InvitationStrategyService,
    private _commentComunicationService: CommentComunicationService,
    private _toastrService: ToastrService,

  ) {
    this._commentThreadService = this._commentThreadStrategyService.getService();
    this._invitationService = this._invitationStrategyService.getService();
  }

  ngOnInit() {

  }
  // After conten init
  ngAfterContentInit() {
    // Popup Show
    this.subscriptionShowPopup = this._commentComunicationService.showPopupObs.subscribe((popupInfo: CommentThreadComunicationInfo) => {
      this.invitations = [];
      this.commentThread = popupInfo.commentThread;
      if (popupInfo.show) {
        this.newCommentThreadMessage = new CommentThreadMessage();
        this.newCommentThreadMessage.type = 'text';
        if (this.commentThread.type === 'pin') {
          this.hasOverlay = true;
          this.workflowPopupPin();
        }
        if (this.commentThread.type === 'circle' || this.commentThread.type === 'rectangle') {
          this.hasOverlay = false;
          this.workflowPopupShape();
        }
      } else {
        this.popupShow = popupInfo.show;
        this.endWorkflow();

      }
    });

    this.subscriptionUpdateSizing = this._commentComunicationService.updateCommentThreadObs.subscribe(commentThread => {
      if (this.commentThread) {
        console.log('update', this.commentThread, commentThread);
        this.commentThread.left = commentThread.left;
        this.commentThread.top = commentThread.top;
        this.commentThread.originalLeft = commentThread.originalLeft;
        this.commentThread.originalTop = commentThread.originalTop;
        if (this.commentThread.type === 'circle' || this.commentThread.type === 'rectangle') {
          // Width
          this.commentThread.width = commentThread.width;
          this.commentThread.originalContainerWidth = commentThread.originalContainerWidth;
          // Height
          this.commentThread.height = commentThread.height;
          this.commentThread.originalContainerHeight = commentThread.originalContainerHeight;
        }
      }
    });



    this.$popup = $(this.popupEl.nativeElement);
    this.$arrow = $(this.arrowEl.nativeElement);

    this.resizePopup = new ResizeObserver(() => {
      setTimeout(() => {
        this.popupPosisionated();
      });
    });

    this.resizePopup.observe(this.popupEl.nativeElement);
  }
  // Workflow if element is a pin
  workflowPopupPin() {
    setTimeout(() => {
      this.commentThreadEl = $('#thread-' + this.commentThread.id);
      this.popupPositionPin();
      this.popupShow = true;
      setTimeout(() => {

        this.$popup.find('#comment-thread-title-input').focus();

      }, 200);

    });
  }
  whereDisplayPin() {
    this.popupWidth = 370;
    const windowInnerWidth50 = window.innerWidth * 0.5;
    if (windowInnerWidth50 < this.popupWidth) {
      this.popupWidth = windowInnerWidth50;
    }
    let display = 'right';
    const rect = this.commentThreadEl[0].getBoundingClientRect();
    // Vars
    const windW = window.innerWidth;
    // var windH = $window.innerHeight;
    const windowLeft = rect.left;
    const windowRight = windW - rect.left;

    /*  if (windowRight >= this.popupWidth || windowLeft >= this.popupWidth) {
  */
    if (windowLeft > windowRight) {
      display = 'left';
    }
    /*} else {
      display = 'modal-center'
    }*/

    return display;
  }
  popupPositionPin() {

    this.display = this.whereDisplayPin();
    const rect = this.commentThreadEl[0].getBoundingClientRect();
    let left = 0;
    const popupHeight = this.$popup.outerHeight() > 0 ? this.$popup.outerHeight() : 324;
    const commentThreadWidth = 20;
    const gutter = 5;
    const arrowWidth = 8;
    let top = rect.top - 100;

    if (this.display === 'left' || this.display === 'right') {

      if (this.display === 'left') {

        left = rect.left - (this.popupWidth + gutter + arrowWidth);
      } else {
        left = rect.left + this.commentThreadEl.width() + gutter + arrowWidth;
      }
      if (top < 0) {
        top = 0;
      }
    } else if (this.display === 'modal-center') {

      left = (window.innerWidth / 2) - (this.popupWidth / 2);
      top = rect.top - (popupHeight / 2);

    }

    const outerHeight = popupHeight + top;

    if (outerHeight > window.innerHeight) {
      const outerTop = outerHeight - window.innerHeight;
      top = top - outerTop;
    }
    console.log(left, top);
    this.$popup.css({ left: left, top: top });

    let arrowTop = rect.top - top;
    if (this.display === 'left') {

      arrowTop = arrowTop + 16;
    }
    this.$arrow.css({ top: arrowTop });

  }

  endWorkflowPin() {
    /*if (this.mutationPoint) {
      this.mutationPoint.disconnect();
    }*/
  }
  // Workflow if element is a shape
  workflowPopupShape() {
    setTimeout(() => {
      this.shapeThreadEl = $('#shape-' + this.commentThread.id);

      // this.$popup.find('#comment-thread-title-input').focus();
      this.mutationShape = new MutationObserver(mutations => {
        mutations.forEach((mutation) => {
          setTimeout(() => {
            this.popupPositionShape();
          });
        });
      });

      const config = { attributes: true, childList: true, characterData: true };
      this.mutationShape.observe(this.shapeThreadEl.get(0), config);

      this.popupPositionShape();

      this.popupShow = true;
      setTimeout(() => {

        this.$popup.find('#comment-thread-title-input').focus();

      }, 200);

    });
  }

  whereDisplayShape() {
    let display = 'right';
    const rect = this.shapeThreadEl[0].getBoundingClientRect();
    // Vars
    const windW = window.innerWidth;
    // var windH = $window.innerHeight;
    const windowLeft = rect.left;
    const windowRight = windW - rect.left;
    this.popupWidth = 370;
    const windowInnerWidth50 = window.innerWidth * 0.5;
    if (windowInnerWidth50 < this.popupWidth) {
      this.popupWidth = windowInnerWidth50;
    }

    /*  if (windowRight >= this.popupWidth || windowLeft >= this.popupWidth) {
  */
    if (windowLeft > windowRight) {
      display = 'left';
    }
    /*} else {
      display = 'modal-center'
    }*/

    return display;
  }
  // Popup position
  popupPositionShape() {

    this.display = this.whereDisplayShape();
    const rect = this.shapeThreadEl[0].getBoundingClientRect();
    let left = 0;
    const popupHeight = this.$popup.outerHeight() > 0 ? this.$popup.outerHeight() : 324;
    const gutter = 5;
    const arrowWidth = 8;
    let top = rect.top - 100;
    let popupWidth = 370;
    const windowInnerWidth50 = window.innerWidth * 0.5;
    if (windowInnerWidth50 < popupWidth) {
      popupWidth = windowInnerWidth50;
    }
    if (this.display === 'left' || this.display === 'right') {

      if (this.display === 'left') {
        left = rect.left - (this.popupWidth + gutter + arrowWidth);

      } else {
        left = rect.left + this.shapeThreadEl.outerWidth() + gutter + arrowWidth;
      }
      if (top < 0) {
        top = 0;
      }
    } else if (this.display === 'modal-center') {

      left = (window.innerWidth / 2) - (this.popupWidth / 2);
      top = rect.top - (popupHeight / 2);

    }

    const outerHeight = popupHeight + top;

    if (outerHeight > window.innerHeight) {
      const outerTop = outerHeight - window.innerHeight;
      top = top - outerTop;
    }

    this.$popup.css({ left: left, top: top });

    let arrowTop = rect.top - top;
    if (this.display === 'left') {

      arrowTop = arrowTop + 16;
    }
    this.$arrow.css({ top: arrowTop });

  }
  // End workflow shape
  endWorkflowShape() {
    if (this.mutationShape) {
      this.mutationShape.disconnect();
    }
  }
  // Workflow popup
  setStatus(status) {
    this.commentThread.status = status;
  }
  setParticipantsType(type) {
    this.commentThread.participantType = type;
    this.commentParticipantChangeValue = true;
  }
  onChangeInputComment() {
    this.commentInputChange = true;
  }
  changeView($event, view) {
    $event.preventDefault();
    $event.stopPropagation();
    this.onChangeView(view);
  }
  onChangeView(view) {
    this.view = view;
  }
  // Record Action
  onStartRecordAction(start: boolean) {
    this.view = 'record';
  }
  onCancelRecord() {
    this.view = 'main';
  }
  onAcceptRecord(commentThreadMessage: CommentThreadMessage) {
    this.newCommentThreadMessage.commentAudio = commentThreadMessage.commentAudio;
    this.newCommentThreadMessage.type = commentThreadMessage.type;
    this.newCommentThreadMessage.commentAudioDuration = commentThreadMessage.commentAudioDuration;
    this.view = 'main';
  }
  onShowWorkflowInvitation(showWorkflowInvitation) {
    this.showWorkflowInvitation = showWorkflowInvitation;
  }
  // Can Save
  canSave() {
    let canSave = false;
    if (!this.newCommentThreadMessage.isEmpty() &&
      this.commentThread.title && this.commentThread.title.length > 0) {
      canSave = true;
    }
    return canSave;
  }

  // Close popup
  closePopup(remove = true) {
    this.endWorkflow();
    this.resetPopup();
    this.view = 'main';
    if (remove) {
      this.cancel();
    }

    const popupInfo: CommentThreadComunicationInfo = new CommentThreadComunicationInfo();
    popupInfo.show = false;
    popupInfo.commentThread = new CommentThread();
    this._commentComunicationService.showPopup(popupInfo);

  }
  // Reset popup
  private resetPopup() {
    this.commentInputChange = false;
    this.commentParticipantChange = false;
    this.commentParticipantChangeValue = false;
    this.showWorkflowInvitation = false;
  }
  // Save
  save() {
    if (this.canSave()) {
      if (this.commentThread.status.key === 'resolved') {
        this.commentThread.resolvedBy = this.workspaceAccess;
        this.commentThread.resolvedAt = new Date();
      }
      // Create Mesasge
      this.newCommentThreadMessage.saved = true;
      this.newCommentThreadMessage.id = uuid();
      this.newCommentThreadMessage.timestamp = new Date();
      this.newCommentThreadMessage.workspaceAccess = this.workspaceAccess;
      if (this.newCommentThreadMessage.type === 'file' || this.newCommentThreadMessage.type === 'audio') {
        if (this.newCommentThreadMessage.commentText && this.newCommentThreadMessage.commentText.length > 0) {
          this.newCommentThreadMessage.type += '-text';
        }
      }
      this.commentThread.comments.push(this.newCommentThreadMessage);
      this._commentThreadService.update(this.commentThread, this.forceError).subscribe(save => {
        if (save) {
          const sidenavInformation = new CommentThreadComunicationInfo();
          sidenavInformation.show = true;
          sidenavInformation.commentThread = this.commentThread;
          // Send invitation if have
          if (this.invitations.length > 0) {
            this._invitationService.createList(this.invitations).subscribe((invitations) => {
              if (invitations) {
                this._toastrService.info('Se enviaron las nuevas invitaciones.');
              }
            });
          }
          this._commentThreadService.saveComment(this.commentThread);
          this._commentComunicationService.showSidenav(sidenavInformation);
          this.popupOnAccept.emit(this.commentThread);
          this.closePopup(false);
        } else {
          this._toastrService.error(`<span class="font-weight-medium">¡Proceso fallido!</span>
           el mensaje no pudo ser enviado, por favor inténtalo de nuevo.`);
        }
      });
    }
  }
  cancel() {
    this._commentThreadService.remove(this.commentThread.id).subscribe(response => {
      this.popupOnCancel.emit(this.commentThread);
    });

  }

  @HostListener('window:resize', ['$event']) onClick(event) {
    this.closePopup(true);
  }
  /**
   * Posisionated popup according type
   */
  private popupPosisionated() {
    if (this.popupShow) {
      if (this.commentThread) {
        if (this.commentThread.type === 'pin') {
          this.popupPositionPin();
        } else if (this.commentThread.type === 'circle' || this.commentThread.type === 'rectangle') {
          this.popupPositionShape();
        }
      }
    }
  }
  // End workflow
  private endWorkflow() {
    if (this.commentThread.type === 'pin') {
      this.endWorkflowPin();

    } else if (this.commentThread.type === 'circle' || this.commentThread.type === 'rectangle') {
      this.endWorkflowShape();
    }

  }

  // Destroy
  ngOnDestroy() {
    this.endWorkflow();
    // Subscription show
    if (this.subscriptionShowPopup) {
      this.subscriptionShowPopup.unsubscribe();
    }
    // Subscription update size
    if (this.subscriptionUpdateSizing) {
      this.subscriptionUpdateSizing.unsubscribe();
    }

    // Observer
    if (this.resizePopup) {
      this.resizePopup.disconnect();
    }
  }


}
