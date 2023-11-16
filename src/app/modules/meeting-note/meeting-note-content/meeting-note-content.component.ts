import { Component, OnInit, AfterContentInit, AfterViewInit, HostListener, Renderer, OnDestroy, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { WorkflowService } from '../../../services/workflow/workflow.service';
import { MeetingNote } from '../../../models/meeting-note/meeting-note';
import { ISubscription } from 'rxjs/Subscription';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { User } from '../../../models/users/user';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { MeetingNoteStrategyService } from '../../../services/meeting-note/meeting-note-strategy.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';
import { RolStrategyService } from '../../../services/roles/rol-strategy.service';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryStrategyService } from '../../../services/categories/category-strategy.service';
import { CommentThreadStrategyService } from '../../../services/comments/comment-thread-strategy.service';
import { RolService } from '../../../services/roles/rol.service';
import { Rol } from '../../../models/workspace/rol';
import { Category } from '../../../models/categories/category';
import { ParticipantType } from '../../../models/participants/participant-type';
import { CommentThreadType } from '../../../models/comments/comment-thread-type';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { CoreStatus } from '../../../models/cores/core-status';
import { InvitationLevel } from '../../../models/invitations/invitation-level';
import { CommentComunicationService } from '../../comment-thread/services/comment-comunication.service';
import { Topic } from '../../../models/meeting-note/topic';
import { ModalAlertApproveCoreComponent } from '../../shared-core/modal-alert-approve-core/modal-alert-approve-core.component';
import { ModalCommentsPendingComponent } from '../../shared-core/modal-comments-pending/modal-comments-pending.component';
import { ModalDisapproveCoreComponent } from '../../shared-core/modal-disapprove-core/modal-disapprove-core.component';
import { RangyService } from '../../../services/utils/rangy.service';
import { MeetingNoteWorkflowService } from '../services/meeting-note-workflow.service';
import { TopicEditorComponent } from '../topic-editor/topic-editor.component';
import { TopicToolbarComponent } from '../topic-toolbar/topic-toolbar.component';
import { IframelyStrategyService } from 'src/app/services/iframely/iframely-strategy.service';
import { MeetingNoteCommentsService } from '../services/meeting-note-comments.service';
import { Task } from 'src/app/models/meeting-note/task';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';
import { TopicLineItemReference } from 'src/app/models/meeting-note/topic-line-item-reference';
import { CommentThread } from 'src/app/models/comments/comment-thread';
import { ToastrService } from 'ngx-toastr';
import { ModalApproveTopicsPendingComponent } from '../modal-approve-topics-pending/modal-approve-topics-pending.component';
import { ModalApproveTopicWihoutAgreementsComponent } from '../modal-approve-topic-wihout-agreements/modal-approve-topic-wihout-agreements.component';
import { ModalApproveTopicsComponent } from '../modal-approve-topics/modal-approve-topics.component';
import { ModalMeetingNoteAuditComponent } from '../modal-meeting-note-audit/modal-meeting-note-audit.component';
import { environment } from 'src/environments/environment';
import { TOPIC_EDITION_LOG } from 'src/app/data/mock-meeting-note';


@Component({
  selector: 'app-meeting-note-content',
  templateUrl: './meeting-note-content.component.html',
  styleUrls: ['./meeting-note-content.component.scss'],
  providers: [
    MeetingNoteStrategyService,
    CommentThreadStrategyService,
    CommentComunicationService,
    CommentThreadStrategyService,
    RangyService,
    MeetingNoteWorkflowService,
    IframelyStrategyService,
    MeetingNoteCommentsService
  ]
})
export class MeetingNoteContentComponent
  implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  // Public vars
  public view = 'topic';
  public id;
  public meetingNote: MeetingNote;
  public workspaceAccess: WorkspaceAccess;
  public currentUser: User;
  public topicShow: Topic;
  public topics: Topic[];
  // Workflow
  public isShowEditableToolbar = false;
  public forceError = false;
  public meetingNoteType = 'fill_now';
  public create = false;
  public rightSidenavCompressed = false;
  public leftSidenavCompressed = false;
  public canceled = false;
  public showAudit = false;
  public simulateEdition = false;
  public hasTour = false;
  // Core statuses
  public coreStatuses: CoreStatus[];
  // Comments
  public commentThreadStatuses: Array<CommentThreadStatus>;
  public commentThreadTypes: Array<CommentThreadType>;
  public participantTypes: Array<ParticipantType>;
  public categories: Array<Category>;
  public roles: Array<Rol>;
  // Permissions
  public isAdmin = false;
  public editable = false;
  public canShare = false;
  public canApprove = false;
  public isApprover = false;
  public showPendingInvitations = false;
  public withoutInvitations = false;
  // Subscriptions
  public subscriptionRightSidenav: ISubscription;
  public subscriptionLeftSidenav: ISubscription;
  public subscriptionRouterParmas: ISubscription;
  public subscriptionQueryParams: ISubscription;
  public subscriptionCore: ISubscription;
  public subscriptionMeetingNote: ISubscription;
  public subscriptionTopics: ISubscription;
  public subscriptionFocusDescription: ISubscription;
  public subscriptionTopicShow: ISubscription;
  public subscriptionUpdateTitle: ISubscription;
  public subscriptionRemoveSubTopic: ISubscription;
  public subscriptionCheckMeetingNoteStatus: ISubscription;
  // Services
  private _coreService;
  private _meetingNoteService;
  private _invitationService;
  private _rolService;
  private _categoryService;
  private _commentThreadService;
  // View childs
  @ViewChild('topicEditor') topicEditor: TopicEditorComponent;
  @ViewChild('topicToolbar') topicToolbar: TopicToolbarComponent;
  // Approve
  @ViewChild('modalApprove') modalApprove: ModalDisapproveCoreComponent;
  @ViewChild('modalApproveTopicPendings') modalApproveTopicPendings: ModalApproveTopicsPendingComponent;
  @ViewChild('modalApproveTopicWihoutAgreements') modalApproveTopicWihoutAgreements: ModalApproveTopicWihoutAgreementsComponent;
  @ViewChild('modalApproveTopics') modalApproveTopics: ModalApproveTopicsComponent;
  @ViewChild('modalCommentsPending') modalCommentsPending: ModalCommentsPendingComponent;
  @ViewChild('modalAlertApprove') modalAlertApprove: ModalAlertApproveCoreComponent;
  @ViewChild('modalAudit') modalAuditory: ModalMeetingNoteAuditComponent;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _renderer: Renderer,
    private _authService: AuthenticationService,
    private _coreStategyService: CoreStrategyService,
    private _meetingNoteStrategyService: MeetingNoteStrategyService,
    private _invitationStartegyService: InvitationStrategyService,
    private _rolStrategyService: RolStrategyService,
    private _categoryStrategyService: CategoryStrategyService,
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _workflowService: WorkflowService,
    private _meetingNoteWorkflowService: MeetingNoteWorkflowService,
    private _toastrService: ToastrService
  ) {
    // Strategy service
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
    this._coreService = this._coreStategyService.getService();
    this._invitationService = this._invitationStartegyService.getService();
    this._rolService = this._rolStrategyService.getService();
    this._categoryService = this._categoryStrategyService.getService();
    this._commentThreadService = this._commentThreadStrategyService.getService();
    // Workspace
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    // Permissions
    this.isAdmin = RolService.isAdminRol(this.workspaceAccess.rol.key);
    this.editable = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key)
      || this.workspaceAccess.groupReference === 'editor';
    this.canShare = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
    this.isApprover = this.workspaceAccess.groupReference === 'approver';
    this.canApprove = RolService.isAdminRol(this.workspaceAccess.rol.key)
      || RolService.isManagerRol(this.workspaceAccess.rol.key)
      || this.workspaceAccess.groupReference === 'approver';
    this.showPendingInvitations = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
  }
  // Init
  ngOnInit() {
    // Query params
    this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(params => {
      this.create = Boolean(params['create']);
      this.showAudit = Boolean(params['showAudit']);
      // this.unreadMessages = Boolean(params['unreadMessages']);
      // this.showModalWarning = Boolean(params['showModalWarning']);
      this.forceError = Boolean(params['forceError']);
      this.withoutInvitations = Boolean(params['withoutInvitations']);
      this.meetingNoteType = params['type'];
      this.canceled = Boolean(params['canceled']);
      this.hasTour = Boolean(params['tour']);
      // Show to approver when the meeting note has change
      this.simulateEdition = Boolean(params['simulateEdition']);
    });

    this.subscriptionRouterParmas = this._activatedRoute.params.subscribe(params => {
      this.id = (params['id']);
    });


  }
  // After content init
  ngAfterContentInit() {
    this._renderer.setElementClass(document.body, 'overflow-hidden', true);

    // Subscription Meeting note
    this.subscriptionMeetingNote = this._meetingNoteService.meetingNote.subscribe(meetingNote => {
      this.meetingNote = Object.assign(new MeetingNote(), <MeetingNote>meetingNote);
    });
    // Subscription core
    this.subscriptionCore = this._coreService.core.subscribe(core => {
      // console.log(core);
    })
    // Subscription topics
    this.subscriptionTopics = this._meetingNoteService.topics.subscribe(topics => {
      // console.log(topics);
      this.topics = Object.assign([], topics);
      if (!this.topicShow) {
        this.topicShow = this.topics[0];
      }
    })

    // Subscription show
    this.subscriptionTopicShow = this._meetingNoteWorkflowService.topicShow.subscribe(topic => {
      this.topicShow = topic;
    })
    // Subscription update title
    this.subscriptionUpdateTitle = this._meetingNoteWorkflowService.topicUpdateTitle.subscribe(title => {
      if (this.topicEditor) {
        this.topicEditor.topic.title = title;
      }
    });
    // Subscription update sub topic
    this.subscriptionRemoveSubTopic =
      this._meetingNoteWorkflowService.subTopicRemove.subscribe(topicItem => {
        // console.log('remove sub topic', topicItem);
        // console.log(this.topicEditor.topicDescriptionComp.topicLineItems);
        if (this.topicEditor) {
          this.topicEditor.topicDescriptionComp.removeLine(topicItem);
        }
      });
    // Get data
    this._rolService.getAllRoles().subscribe(roles => {
      this.roles = roles.filter(r => r.key !== 'admin' && r.key !== 'super-admin');
    });
    this._categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
    this._commentThreadService.getCommentThreadStatuses().subscribe(statuses => {
      this.commentThreadStatuses = statuses;
    });
    this._commentThreadService.getCommentThreadTypes().subscribe(types => {
      this.commentThreadTypes = types;
    })
    this._commentThreadService.getParticipantTypes().subscribe(participantTypes => {
      this.participantTypes = participantTypes;
    });
    this._coreService.getAllStatus().subscribe(statuses => {
      this.coreStatuses = statuses.filter(s => s.key !== 'archived' && s.key !== 'canceled');
    });
    if (this.id) {
      this._meetingNoteService.loadById(this.id, this.meetingNoteType, this.canceled).subscribe(meetingNote => {
        if (meetingNote && meetingNote.id) {
          //Load core atributtes
          // this.castMeetingCore(meetingNote);
          // Load topics
          this._meetingNoteService.loadTopicsById(this.id, this.create).subscribe();
          // Load invitations
          this._invitationService.loadAll(InvitationLevel.CORE, this.id, this.withoutInvitations).subscribe((invitations) => {
          });
        } else {
          this._router.navigate(['dashboard']);
        }
      });

    } else {
      this._router.navigate(['dashboard']);
    }


  }
  // Aftert view init
  ngAfterViewInit() {
    setTimeout(() => {
       // Subscription sidenav show or hide
       this.subscriptionRightSidenav = this._workflowService.sidenavRightCompressed.subscribe(compress => {
        this.rightSidenavCompressed = compress;
        this.resizeEditor();
      });
      // Subscription sidenav show or hide
      this.subscriptionLeftSidenav = this._workflowService.sidenavLeftCompressed
        .subscribe(compressed => {
          this.leftSidenavCompressed = compressed;
          this.resizeEditor();
        });
      // Resize first time
      this.resize();
     
      // Check meeting note status
      this.subscriptionCheckMeetingNoteStatus = this._meetingNoteWorkflowService
        .checkMeetingNoteStatus
        .subscribe((data) => {
          // Only if ready to apporve change the status
          this._meetingNoteService.checkIsReadyToApprove().subscribe(readyToApprove => {
            if (!readyToApprove && this.meetingNote.status.key === 'to-be-approved') {
              // const statusLastComment = commentThread.status.key;
              const inProcessStatus = this.coreStatuses.filter(s => s.key === 'process')[0];
              this.meetingNote.status = inProcessStatus;
              this._coreService.updateStatus(inProcessStatus).subscribe();
            } else if (readyToApprove) {
              const toBeApprovedStatus = this.coreStatuses.filter(s => s.key === 'to-be-approved')[0];
              this.meetingNote.status = toBeApprovedStatus;
              this._coreService.updateStatus(toBeApprovedStatus).subscribe();
            }
          })
        });
      // Show message if ready to approve
      this.checkIsReadyToApprove();
      // Get audit
      this.showAuditAprrover();
      // If simulate edition
      if (environment.envName === 'design') {
        if (this.simulateEdition) {
          this.simulateEditionFn();
        }
      }
    });
  }
  // Simulate edition only Front
  simulateEditionFn() {
    setTimeout(() => {
      this._meetingNoteService.topicEditionLogs = TOPIC_EDITION_LOG;
      this._meetingNoteService.getUpdatesTopic(this.topicShow.id).subscribe(response => {
        this.topicEditor.updateTopic(response.title, response.addedLines, response.updateItems, response.removeItems);
      });

      setTimeout(() => {
        if (this.workspaceAccess.groupReference === 'approver') {
          this.modalAlertApprove.openModal();
        }
      }, 1500);

    }, 5000);

  }
  // On ready to approve
  checkIsReadyToApprove() {
    if (this.workspaceAccess.groupReference === 'approver') {
      this._meetingNoteService.checkIsReadyToApprove().subscribe(response => {
        if (response.readyToApprove) {
          this._toastrService.info('La minuta esta lista para ser aprobada.');
        }
      });
    }
  }
  // Show auditory
  showAuditAprrover() {
    if (this.workspaceAccess.groupReference === 'approver') {
      this._meetingNoteService.getAudit(this.id, this.showAudit).subscribe(audits => {
        if (audits.length > 0) {
          this.modalAuditory.openModal(audits);
        }
      });
    }
  }
  // Topic editor on fill topic
  topicEditorOnFind() {
    setTimeout(() => {
      if (this.topicToolbar) {
        this.topicToolbar.topic = this.topicEditor.topic;
      }
    });
  }
  // On end tour
  topicEditorOnEndTour() {
    this.hasTour = false;
  }
  // Resize
  resize() {
    // If window is minor to 1200px
    if (window.innerWidth < 1200) {
      this._workflowService.compressRightSidenav(true);
    } else {
      this._workflowService.compressRightSidenav(false);
    }
    if (window.innerWidth < 992) {
      this._workflowService.compressLeftSidenav(true);
    } else {
      this._workflowService.compressLeftSidenav(false);
    }
    this.resizeEditor();
  }
  resizeEditor(timeout = 300) {
    setTimeout(() => {
      if (this.view === 'topic') {
        this.topicEditor.topicDescriptionComp.resizeEditor();
        if (this.topicEditor.topicAgreementComp) {
          this.topicEditor.topicDescriptionComp.resizeEditor();
        }
      }
    }, timeout);
  }
  // On view change
  onViewChange(view) {
    this.view = view;
  }
  // Update editor
  updateEditor() {
    this.topicEditor.findTopic();
  }
  // On change to approved
  onApprove() {
    if (this.canApprove) {
      this._meetingNoteService.checkIsReadyToApprove().subscribe(response => {
        if (response.readyToApprove) {
          this.modalApprove.openModal();
        } else {
          // Check first if have topic without agreement or topic pending
          // { topicsPending: [], topicsWithoutAgreement: [], commentsUnresolved: [], readyToApprove: false };
          if (response.topicsPending.length > 0 || response.topicsWithoutAgreement.length > 0) {
            if (response.topicsPending.length > 0 && response.topicsWithoutAgreement.length > 0) {
              this.modalApproveTopics.openModal(response.topicsPending, response.topicsWithoutAgreement, response.commentsUnresolved);
            } else if (response.topicsPending.length > 0) {
              this.modalApproveTopicPendings.openModal(response.topicsPending);
            } else if (response.topicsWithoutAgreement.length > 0) {
              this.modalApproveTopicWihoutAgreements.openModal(response.topicsWithoutAgreement);
            }
          } else if (response.commentsUnresolved.length > 0) {
            this.modalCommentsPending.openModal(response.commentsUnresolved);
          } else {
            this.modalApprove.openModal();
          }
        }
      });

    }
  }
  // Header on change status
  headerOnChangeStatus(status: CoreStatus) {
    this._meetingNoteService.updateStoreStatus(status);
  }
  // When is apporves
  onApproveAccept() {
    // alert('alert vista cerrada no implementada');
    this._router.navigate(['/meeting-note/close/', this.id]);
  }
  // Show editable toolbar
  showEditableToolbar(show) {
    this.isShowEditableToolbar = show;
  }
  // On Add task from topic toolbar
  topicToolbarOnAddTask(task: Task) {
    if (this.topicEditor.topicDescriptionComp.focusEditor) {
      this.topicEditor.topicDescriptionComp.addTask(null, task, true);
    } else if (this.topicEditor.topicAgreementComp && this.topicEditor.topicAgreementComp.focusEditor) {
      this.topicEditor.topicAgreementComp.addTask(null, task, false);
    } else {
      this.topicEditor.topicDescriptionComp.addTask(null, task, true);
    }
  }
  // On update topicLineItem
  modalTaskOnUpdate(topicLineItem: TopicLineItem) {
    // Update 
    if (topicLineItem.reference === TopicLineItemReference.DESCRIPTION) {
      this.topicEditor.topicDescriptionComp.topicLineItems.forEach((line, index) => {
        if (line.id === topicLineItem.id) {
          // Update task
          this.topicEditor.topicDescriptionComp.topicLineItems[index] = topicLineItem;
          // Update comments
          this.updateCommentThreadTasks(topicLineItem);
        }
      });
    } else if (topicLineItem.reference === TopicLineItemReference.AGREEMENT) {
      this.topicEditor.topicAgreementComp.topicLineItems.forEach((line, index) => {
        if (line.id === topicLineItem.id) {
          this.topicEditor.topicAgreementComp.topicLineItems[index] = topicLineItem;
          // Update comments
          this.updateCommentThreadTasks(topicLineItem);
        }
      });
    }
  }
  /**
   *  Update comments of task when the size change
   * @param topicLineItem 
   */
  updateCommentThreadTasks(topicLineItem) {
    setTimeout(() => {
      // Check comments
      this.topicEditor.topic.commentThreads.forEach(commentThread => {
        if (commentThread.objectReference === 'task' && commentThread.objectReferenceId === topicLineItem.id) {
          const lineTask = $(`#${commentThread.objectReferenceId}`);
          const taskBlockWrapper = lineTask.find(`.task-block-wrapper`);
          const currentWidth = taskBlockWrapper.outerWidth();
          const currentHeight = taskBlockWrapper.outerHeight();
          console.log(currentHeight);
          commentThread.originalContainerHeight = currentHeight;
          commentThread.originalContainerWidth = currentWidth;
          commentThread.containerWidth = currentWidth;
          commentThread.containerHeight = currentHeight;
          this.topicEditor.updateCommentThread(commentThread).subscribe(resp => {
            lineTask.addClass('updated');
          });

        }
      });
    });
  }
  // Rezise
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize();
  }
  /**
   * On add comment thread
   * @param commentThread
   */
  onAddCommentThread(commentThread: CommentThread) {
    if (commentThread.levelId === TopicLineItemReference.DESCRIPTION) {
      $(`.comment-thread-selection-${commentThread.id}`).removeClass('not-saved');
      setTimeout(() => {
        this.topicEditor.topicDescriptionComp.editorRead();
        this.topicEditor.topicDescriptionComp.afterAddComment();
      });
    } else if (commentThread.levelId === TopicLineItemReference.AGREEMENT) {
      $(`.comment-thread-selection-${commentThread.id}`).removeClass('not-saved');

      setTimeout(() => {
        this.topicEditor.topicAgreementComp.editorRead();
        this.topicEditor.topicAgreementComp.afterAddComment();
      });
    }
  }

  // On cancel comment thread
  onCancelCommentThread() {
    if (this.topicEditor) {
      this.topicEditor.topicDescriptionComp.afterAddComment();
      if (this.topicEditor.topicAgreementComp) {
        this.topicEditor.topicAgreementComp.afterAddComment();
      }
    }
  }
  // On destroy
  ngOnDestroy() {
    this._renderer.setElementClass(document.body, 'overflow-hidden', false);
    if (this.subscriptionRightSidenav) {
      this.subscriptionRightSidenav.unsubscribe();
    }
    if (this.subscriptionLeftSidenav) {
      this.subscriptionLeftSidenav.unsubscribe();
    }
    if (this.subscriptionRouterParmas) {
      this.subscriptionRouterParmas.unsubscribe();
    }
    if (this.subscriptionQueryParams) {
      this.subscriptionQueryParams.unsubscribe();
    }
    if (this.subscriptionMeetingNote) {
      this.subscriptionMeetingNote.unsubscribe();
    }
    if (this.subscriptionCore) {
      this.subscriptionCore.unsubscribe();
    }
    if (this.subscriptionFocusDescription) {
      this.subscriptionFocusDescription.unsubscribe();
    }
    if (this.subscriptionUpdateTitle) {
      this.subscriptionUpdateTitle.unsubscribe();
    }
    if (this.subscriptionRemoveSubTopic) {
      this.subscriptionRemoveSubTopic.unsubscribe();
    }
  }

  castMeetingCore(meetingNote: any) {
    this.meetingNote.id = meetingNote.core.id;
    this.meetingNote.title = meetingNote.core.title;
    this.meetingNote.coverImage = meetingNote.core.coverImage;
    this.meetingNote.project = meetingNote.core.project;
    this.meetingNote.fechaReg = meetingNote.core.fechaReg;
    this.meetingNote.type = meetingNote.core.type;
    this.meetingNote.status = meetingNote.core.status;
    this.meetingNote.created = meetingNote.core.created;
    this.meetingNote.modified = meetingNote.core.modified;
    this.meetingNote.messages = meetingNote.core.messages;
    this.meetingNote.deleted = meetingNote.core.deleted;
    this.meetingNote.groupReference = meetingNote.core.groupReference;
    this.meetingNote.workspace = meetingNote.core.workspace;
    this.meetingNote.owner = meetingNote.core.owner;
    this.meetingNote.ownerRol = meetingNote.core.ownerRol;
    this.meetingNote.approvedDate = meetingNote.core.approvedDate;
    this.meetingNote.approvedBy = meetingNote.core.approvedBy;
    this.meetingNote.brand = meetingNote.core.brand;
  }
}
