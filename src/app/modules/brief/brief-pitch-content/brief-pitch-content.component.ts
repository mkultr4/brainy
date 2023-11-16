import { Component, OnInit, Renderer, AfterViewInit, AfterContentInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { CommentComunicationService } from '../../comment-thread/services/comment-comunication.service';
import { IframelyStrategyService } from 'src/app/services/iframely/iframely-strategy.service';
import { Brief } from 'src/app/models/brief/brief';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { User } from 'src/app/models/users/user';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { CoreStatus } from 'src/app/models/cores/core-status';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { CommentThreadType } from 'src/app/models/comments/comment-thread-type';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { Category } from 'src/app/models/categories/category';
import { Rol } from 'src/app/models/workspace/rol';
import { ISubscription } from 'rxjs/Subscription';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
import { RolStrategyService } from 'src/app/services/roles/rol-strategy.service';
import { CategoryStrategyService } from 'src/app/services/categories/category-strategy.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { BriefWorkflowService } from '../services/brief-workflow.service';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/app/services/roles/rol.service';
import { ModalApproveCoreComponent } from '../../shared-core/modal-approve-core/modal-approve-core.component';
import { ModalCommentsPendingComponent } from '../../shared-core/modal-comments-pending/modal-comments-pending.component';
import { ModalAlertApproveCoreComponent } from '../../shared-core/modal-alert-approve-core/modal-alert-approve-core.component';
import { environment } from 'src/environments/environment';
import { InvitationLevel } from 'src/app/models/invitations/invitation-level';
import { MeetingNoteStrategyService } from 'src/app/services/meeting-note/meeting-note-strategy.service';
import { BriefCategoryContentComponent } from '../brief-category-content/brief-category-content.component';
import { ResponseType } from 'src/app/models/brief/response-type';
import { YoutubeStrategyService } from 'src/app/services/youtube/youtube-strategy.service';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { BriefCategoryItemType } from 'src/app/models/brief/brief-category-item-type';
import { TableCell } from 'src/app/models/brief/table-cell';
import { RangyService } from 'src/app/services/utils/rangy.service';
import { CommentThread } from 'src/app/models/comments/comment-thread';
import { Giveback } from 'src/app/models/brief/giveback';
import { BriefGivebacksSidenavComponent } from '../brief-givebacks-sidenav/brief-givebacks-sidenav.component';
import { ModalBriefAuditComponent } from '../modal-brief-audit/modal-brief-audit.component';
import { CATEGORIES_EDITION_LOG } from 'src/app/data/mock-brief';
import { ModalBriefPitchDatesComponent } from '../modal-brief-pitch-dates/modal-brief-pitch-dates.component';
import { ModalAlertPreFinalistComponent } from '../modal-alert-pre-finalist/modal-alert-pre-finalist.component';
import { ModalAlertFinalistComponent } from '../modal-alert-finalist/modal-alert-finalist.component';
import { ModalAlertDiscardedComponent } from '../modal-alert-discarded/modal-alert-discarded.component';
import { ModalAlertCanUploadProposalComponent } from '../modal-alert-can-upload-proposal/modal-alert-can-upload-proposal.component';
import { Proposal } from 'src/app/models/brief/proposal';
import { BriefTutorialInterfaceComponent } from '../brief-tutorial-interface/brief-tutorial-interface.component';
import { UtilService } from 'src/app/services/utils/util.service';
import { ModalBriefIncompleteComponent } from '../modal-brief-incomplete/modal-brief-incomplete.component';

@Component({
  selector: 'app-brief-pitch-content',
  templateUrl: './brief-pitch-content.component.html',
  styleUrls: ['./brief-pitch-content.component.scss'],
  providers: [
    BriefStrategyService,
    CommentThreadStrategyService,
    CommentComunicationService,
    BriefWorkflowService,
    IframelyStrategyService,
    MeetingNoteStrategyService,
    YoutubeStrategyService,
    RangyService
  ]
})
export class BriefPitchContentComponent
  implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

  // Public vars
  public view = 'category';
  public id;
  public statusKey: string;
  public brief: Brief;
  public workspaceAccess: WorkspaceAccess;
  public currentUser: User;
  public briefCategoryShow: BriefCategory;
  public briefCategories: BriefCategory[];
  public proposalOfGuest = new Proposal();
  public proposals: Proposal[] = [];
  // Workflow
  public forceError = false;
  public create = false;
  public rightSidenavCompressed = false;
  public leftSidenavCompressed = false;
  public simulateEdition = false;
  public hasTour = false;
  public hasTourInterface = false;
  public autoFillResponse = false;
  public addGivebackResponse = false;
  public hasRepliesNews = false;
  public addGiveback = false;
  public addProposals = false;
  public addFinalist = false;
  public showAudit = false;
  public showAlertPreFinalist = false;
  public showAlertFinalist = false;
  public showAlertDiscarded = false;
  public showAlertCanUploadProposals = false;
  // Core statuses
  public coreStatuses: CoreStatus[];
  // Comments
  public commentThreadStatuses: Array<CommentThreadStatus>;
  public commentThreadTypes: Array<CommentThreadType>;
  public participantTypes: Array<ParticipantType>;
  public categories: Array<Category>;
  public roles: Array<Rol>;
  // Category items
  public responseTypes: ResponseType[];
  public tableCellTypes: TableCell[];
  // Permissions
  public isAdmin = false;
  public editable = false;
  public canShare = false;
  public canApprove = false;
  public isApprover = false;
  public showPendingInvitations = false;
  public withoutInvitations = false;
  public canRefill = false;
  public refillable = false;
  public canAddGiveBack = false;
  public canUploadProposal = false;
  public canEditProposals = false;
  // Givebacks
  public givebacks = new Array<Giveback>();
  public isShowSidenavGiveback = false;
  // Subscriptions
  public subscriptionUpdateCategoryTitle: ISubscription;
  public subscriptionRightSidenav: ISubscription;
  public subscriptionLeftSidenav: ISubscription;
  public subscriptionRouterParmas: ISubscription;
  public subscriptionQueryParams: ISubscription;
  public subscriptionCore: ISubscription;
  public subscriptionBrief: ISubscription;
  public subscriptionCategories: ISubscription;
  public subscriptionBriefShow: ISubscription;
  public subscriptionCheckBriefStatus: ISubscription;
  public subscriptionProposals: ISubscription;
  public subscriptionShowCategoryItemId: ISubscription;
  // Services
  private _coreService;
  private _briefService;
  private _invitationService;
  private _rolService;
  private _categoryService;
  private _commentThreadService;
  // View childs
  @ViewChild(BriefCategoryContentComponent) categoryContentComp: BriefCategoryContentComponent;
  @ViewChild('modalApprove') modalApprove: ModalApproveCoreComponent;
  @ViewChild('modalCommentsPending') modalCommentsPending: ModalCommentsPendingComponent;
  @ViewChild('modalAlertApprove') modalAlertApprove: ModalAlertApproveCoreComponent;
  @ViewChild('briefGivebackSidenav') briefGivebackSidenav: BriefGivebacksSidenavComponent;
  @ViewChild('modalAudit') modalAudit: ModalBriefAuditComponent;
  @ViewChild('modalDates') modalDates: ModalBriefPitchDatesComponent;
  @ViewChild(ModalAlertPreFinalistComponent) modalAlertPreFinalist: ModalAlertPreFinalistComponent;
  @ViewChild(ModalAlertFinalistComponent) modalAlertFinalist: ModalAlertFinalistComponent;
  @ViewChild(ModalAlertDiscardedComponent) modalAlertDiscarded: ModalAlertDiscardedComponent;
  @ViewChild(ModalAlertCanUploadProposalComponent) modalAlertCanUploadProposal: ModalAlertCanUploadProposalComponent;
  @ViewChild('tutorialInterface') tutorialInterface: BriefTutorialInterfaceComponent;
  @ViewChild('modalBriefIncomplete') modalBriefIncomplete: ModalBriefIncompleteComponent;
  // Constructor
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _renderer: Renderer,
    private _authService: AuthenticationService,
    private _coreStategyService: CoreStrategyService,
    private _briefStrategyService: BriefStrategyService,
    private _invitationStartegyService: InvitationStrategyService,
    private _rolStrategyService: RolStrategyService,
    private _categoryStrategyService: CategoryStrategyService,
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _workflowService: WorkflowService,
    private _briefWorkflowService: BriefWorkflowService,
    private _toastrService: ToastrService,
    private _utilService: UtilService
  ) {
    // Strategy service
    this._briefService = this._briefStrategyService.getService();
    this._coreService = this._coreStategyService.getService();
    this._invitationService = this._invitationStartegyService.getService();
    this._rolService = this._rolStrategyService.getService();
    this._categoryService = this._categoryStrategyService.getService();
    this._commentThreadService = this._commentThreadStrategyService.getService();
    // Workspace
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    // Permissions
    this.isAdmin = RolService.isAdminRol(this.workspaceAccess.rol.key);
    this.editable = RolService.isAdminRol(this.workspaceAccess.rol.key)
      || this.workspaceAccess.groupReference === 'editor';
    this.canShare = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
    this.isApprover = this.workspaceAccess.groupReference === 'approver';
    this.canApprove = RolService.isAdminRol(this.workspaceAccess.rol.key)
      || RolService.isManagerRol(this.workspaceAccess.rol.key)
      || this.workspaceAccess.groupReference === 'approver';
    this.showPendingInvitations = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
    /*  this.canRefill = RolService.isAdminRol(this.workspaceAccess.rol.key) || RolService.isManagerRol(this.workspaceAccess.rol.key)
        || this.workspaceAccess.groupReference === 'editor';*/
    // Approver only can refill the brief
    this.refillable = this.workspaceAccess.groupReference === 'approver' || this.workspaceAccess.groupReference === 'editor';
    // Editor can give back
    this.canAddGiveBack = this.workspaceAccess.groupReference === 'editor';
    // Can upload proposal
    this.canUploadProposal = RolService.isGuestRol(this.workspaceAccess.rol.key) && this.workspaceAccess.groupReference !== 'editor';
    //  Can edit proposals
    this.canEditProposals = this.workspaceAccess.groupReference === 'editor';
  }
  // Init
  ngOnInit() {
    // Query params
    this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(params => {
      this.create = Boolean(params['create']);
      this.showAudit = params['showAudit'] === 'true' ? true : false;
      // this.unreadMessages = Boolean(params['unreadMessages']);
      // this.showModalWarning = Boolean(params['showModalWarning']);
      this.forceError = Boolean(params['forceError']);
      this.withoutInvitations = Boolean(params['withoutInvitations']);
      this.hasTour = Boolean(params['tour']);
      // Show to approver when the meeting note has change
      this.simulateEdition = Boolean(params['simulateEdition']);
      this.autoFillResponse = Boolean(params['autoFillResponse']);
      this.statusKey = params['statusKey'];
      this.addGiveback = Boolean(params['addGiveback']);
      this.addGivebackResponse = Boolean(params['addGivebackResponse']);
      // Pre finalis
      this.showAlertPreFinalist = params['messagePreFinalist'] === 'true' ? true : false;
      // Finalist
      this.showAlertFinalist = params['messageFinalist'] === 'true' ? true : false;
      // Discarded
      this.showAlertDiscarded = params['messageDiscarded'] === 'true' ? true : false;
      // Can upload proposals
      this.showAlertCanUploadProposals = params['messageUploadProposal'] === 'true' ? true : false;
      // Pitch with proposals
      this.addProposals = params['addProposals'] === 'true' ? true : false;
      // Pitch with finalist
      this.addFinalist = params['addFinalist'] === 'true' ? true : false;
      // Tour interface
      this.hasTourInterface = params['tourInterface'] === 'true' ? true : false;
    });

    this.subscriptionRouterParmas = this._activatedRoute.params.subscribe(params => {
      this.id = (params['id']);
    });
  }
  // After content init
  ngAfterContentInit() {
    this._renderer.setElementClass(document.body, 'overflow-hidden', true);

    // Subscription Meeting note
    this.subscriptionBrief = this._briefService.brief.subscribe(brief => {
      this.brief = Object.assign(new Brief(), <Brief>brief);
    });
    // Subscription core
    this.subscriptionCore = this._coreService.core.subscribe(core => {
    })
    // Subscription categories
    this.subscriptionCategories = this._briefService.categories.subscribe(categories => {

      this.briefCategories = Object.assign([], categories);
      if (!this.briefCategoryShow) {
        this.briefCategoryShow = this.briefCategories[0];
      }
      this.briefCategories.forEach(briefCategory => {
        // Category
        let isFilled = false;
        briefCategory.items.filter(t => t.type === BriefCategoryItemType.QUESTION).some(item => {
          isFilled = this._briefWorkflowService.checkIfResponseIsFilled(item);
          if (!isFilled) {
            return true;
          }
        });
        briefCategory.isFilled = isFilled;
        // Sub Category
        briefCategory.items.filter(t => t.type === BriefCategoryItemType.SUB_CATEGORY)
          .forEach(subCategory => {
            let subCategoryFilled = false;
            briefCategory.items.
              filter(t => t.type === BriefCategoryItemType.QUESTION && t.idParent === subCategory.id).some(item => {
                subCategoryFilled = this._briefWorkflowService.checkIfResponseIsFilled(item);
                if (!subCategoryFilled) {
                  return true;
                }
              });
            subCategory.isFilled = subCategoryFilled;
          });


      });
      // Process givebacks
      this.processGivebacks();

    });
    // Subscription proposals
    this.subscriptionProposals = this._briefService.proposals.subscribe(proposals => {
      this.proposals = proposals;
    })

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
    // Category items
    this._briefService.findAllReponseTypes().subscribe(responseTypes => {
      this.responseTypes = responseTypes;
    });
    // Table cell types
    this._briefService.findAllTableCellTypes().subscribe(tableCellTypes => {
      this.tableCellTypes = tableCellTypes;
    });
    // If has id
    if (this.id) {
      let dates = { dateOfGivebacks: false, dateOfProposals: false, dateOfResults: false };
      if (this.showAlertCanUploadProposals) {
        dates.dateOfProposals = true;
      }
      if (this.addGivebackResponse) {
        dates.dateOfGivebacks = true;
      }
      if (this.addProposals) {
        dates.dateOfProposals = true;
        dates.dateOfResults = true;
      }
      this._briefService.loadById(this.id, 'project', this.statusKey, dates).subscribe(brief => {
        if (brief && brief.id) {
          // Load topics
          this._briefService.loadCategories(this.id, false, this.autoFillResponse, this.addGiveback, this.addGivebackResponse, 'pitch').subscribe();
          // Load proposals
          this._briefService.loadProposals(this.id, !this.addProposals, this.addFinalist).subscribe();
          // Load invitations
          this._invitationService.loadAll(InvitationLevel.CORE, this.id, this.withoutInvitations).subscribe((invitations) => {
          });
          // Check reply news 
          this._briefService.hasRepliesNews(this.addGivebackResponse).subscribe(has => {
            this.hasRepliesNews = has;
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
      });
      // Subscription sidenav show or hide
      this.subscriptionLeftSidenav = this._workflowService.sidenavLeftCompressed
        .subscribe(compressed => {
          this.leftSidenavCompressed = compressed;
        });
      // Resize first time
      this.resize();
      // Subscription update title
      this.subscriptionUpdateCategoryTitle = this._briefWorkflowService.updateTitleBriefCategory.subscribe(title => {
        if (this.categoryContentComp) {
          this.categoryContentComp.briefCategory.title = title;
        }

      });
      // Show brief category item id
      this.subscriptionShowCategoryItemId = this._briefWorkflowService.showBriefCategoryItemId.subscribe(event => {
        const category = this.briefCategories.filter(c => c.id === event.categoryId)[0];
        this.briefCategoryShow = category;
        if (this.view !== 'category') {
          this.view = 'category';
        }
        setTimeout(() => {
          const item = $(`#${event.categoryItemId}`).get(0);
          const parentScroll = this._utilService.getScrollParent(item, true);
          this._utilService.scrollTo(parentScroll, item);
        });
      });

      // Check meeting note status
      /*this.subscriptionCheckBriefStatus = this._briefService.checkBriefStatus
        .subscribe((data) => {
          // Only if ready to apporve change the status
          this._briefService.checkIsReadyToApprove().subscribe(readyToApprove => {
            if (!readyToApprove && this.brief.status.key === 'to-be-approved') {
              
              const inProcessStatus = this.coreStatuses.filter(s => s.key === 'process')[0];
              this.brief.status = inProcessStatus;
              this._coreService.updateStatus(inProcessStatus).subscribe();
            } else if (readyToApprove) {
              const toBeApprovedStatus = this.coreStatuses.filter(s => s.key === 'to-be-approved')[0];
              this.brief.status = toBeApprovedStatus;
              this._coreService.updateStatus(toBeApprovedStatus).subscribe();
            }
          })
        });*/

      if (this.showAlertPreFinalist) {
        this.modalAlertPreFinalist.openModal();
      }
      if (this.showAlertFinalist) {
        this.modalAlertFinalist.openModal();
      }
      if (this.showAlertDiscarded) {
        this.modalAlertDiscarded.openModal();
      }
      // If can upload proposal
      if (this.brief.dateOfProposals >= new Date() && this.canUploadProposal) {
        this.modalAlertCanUploadProposal.openModal();
        this._briefService.getProposalOfWorkspaceAccess(this.workspaceAccess.id).subscribe(proposal => {
          this.proposalOfGuest = proposal;
        });
      }

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
      // Tour interface
      if (this.hasTourInterface) {
        this.tutorialInterface.tourInterfaceComp.startTour();
      }

    });
  }


  // Simulate edition only Front
  simulateEditionFn() {
    setTimeout(() => {
      this._briefService.categoryEditionLogs = CATEGORIES_EDITION_LOG;
      this._briefService.getUpdatesCategories(this.briefCategoryShow.id).subscribe(response => {
        this.categoryContentComp.updateCategory(response.addedLines, response.updateItems, response.removeItems);
      });

      setTimeout(() => {
        if (this.workspaceAccess.groupReference === 'approver') {
          this.modalAlertApprove.openModal();
        }
      }, 1500);

    }, 5000);

  }
  // Show auditory
  showAuditAprrover() {
    if (this.workspaceAccess.groupReference === 'approver') {
      this._briefService.getAudit(this.id, this.showAudit).subscribe(audits => {
        if (audits.length > 0) {
          this.modalAudit.openModal(audits);
        }
      });
    }
  }
  // On change status
  onChangeStatus(status: CoreStatus) {
    this.brief.status = status;
  }
  // Show brief category
  showBriefCategory(briefCategory: BriefCategory) {
    this.briefCategoryShow = Object.assign(new BriefCategory(), briefCategory);
    setTimeout(() => {
      this.categoryContentComp.briefCategoryContent.scrollToTop();
    })
  }
  // Update main content brief cat item
  updateBriefCategoryItem(briefCategoryItem: BriefCategoryItem) {
    this.categoryContentComp.briefCategoryItems.forEach((i, index) => {
      if (i.id === briefCategoryItem.id) {
        if (briefCategoryItem.type === BriefCategoryItemType.SUB_CATEGORY) {
          this.categoryContentComp.briefCategoryItems[index].title = briefCategoryItem.title;
        }
      }
    });
  }
  // Update main content
  updateMainContent(event) {
    this.categoryContentComp.getCategory();

  }
  // remove main content brief cat item
  removeBriefCategoryItem(briefCategoryItem: BriefCategoryItem) {
    const index = this.categoryContentComp.briefCategoryItems.indexOf(briefCategoryItem);
    this.categoryContentComp.briefCategoryItems.splice(index, 1);
  }
  // On next category
  onNextCategory(briefCategory: BriefCategory) {
    const currentIndex = this.briefCategories.findIndex(b => b.id === briefCategory.id);

    const length = this.briefCategories.length - 1;

    if (currentIndex < length) {
      this.briefCategoryShow = this.briefCategories[currentIndex + 1];
      setTimeout(() => {
        this.categoryContentComp.briefCategoryContent.scrollToTop();
      })
    }
  }

  // Process givebacks
  processGivebacks() {
    this.briefCategories.forEach((category, index) => {
      category.items.forEach(item => {
        if (item.giveback && item.giveback.id) {
          const giveback = item.giveback;
          // Update data
          giveback.categoryTitle = category.title;
          giveback.briefCategoryItemTitle = item.title;
          if (item.idParent) {
            const subcategory = this.briefCategories[index].items.filter(i => i.id === item.idParent)[0];
            giveback.subCategoryTitle = subcategory.title;
          }
          // If not exist push
          if (this.givebacks.findIndex(i => i.id && i.id === item.giveback.id) === -1) {
            this.givebacks.push(item.giveback);
          }

        }
      })
    })
  }
  // Show giveback
  onShowSidenavGiveback(show) {
    this.isShowSidenavGiveback = show;
  }
  /**
   * On add giveback
   * @param giveback 
   */
  onShowGiveBack(giveback: Giveback) {
    const briefCategory = this.briefCategories.filter(c => c.id === giveback.briefCategoryId)[0];
    const briefCategoryItem = briefCategory.items.filter(i => i.id === giveback.briefCategoryItemId)[0];
    this.briefGivebackSidenav.showSidenav(giveback, briefCategoryItem);
  }
  /**
   * Reply giveback
   * @param giveback 
   */
  onReplyGiveback(giveback: Giveback) {
    const briefCategory = this.briefCategories.filter(c => c.id === giveback.briefCategoryId)[0];
    const briefCategoryItem = briefCategory.items.filter(i => i.id === giveback.briefCategoryItemId)[0];
    this.briefGivebackSidenav.showSidenav(giveback, briefCategoryItem);
  }
  /**
   * On giveback delete
   * @param giveback 
   */
  onGivebackDelete(giveback: Giveback) {
    const index = this.givebacks.findIndex(g => g.id === giveback.id);
    this.givebacks.splice(index, 1);
  }
  // On update giveback
  onUpdateGivebackSidenav(briefCategoryItem: BriefCategoryItem) {
    console.log(briefCategoryItem);
    if (this.view === 'category') {
      const item = this.categoryContentComp.briefCategoryItems.filter(i => i.id === briefCategoryItem.id)[0];
      console.log(item);
      item.giveback = briefCategoryItem.giveback;
    }
  }
  onReadReplies() {
    console.log(this.hasRepliesNews);
    this.hasRepliesNews = false;
    console.log(this.hasRepliesNews);
  }
  // Change view
  onChangeView(view) {
    this.view = view;
  }
  /**
   * On click modal alert can upload proposal
   */
  onShowUploadProposal() {
    this.view = 'proposals';
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
  }
  // On ready to approve
  checkIsReadyToApprove() {
    if (this.workspaceAccess.groupReference === 'approver') {
      this._briefService.checkIsReadyToApprove().subscribe(response => {
        /*if (response.readyToApprove) {
           this._toastrService.info('La minuta esta lista para ser aprobada.');
        }*/
      });
    }
  }



  // On change to approved
  onApprove() {
    if (this.canApprove) {
      const categoriesNotFilled = this.briefCategories.filter(f => f.isFilled === false).length;
      if ( categoriesNotFilled === 0) {
        this._briefService.getCommentsUnresolved().subscribe(commentPendings => {
          if (commentPendings.length > 0) {
            this.modalCommentsPending.openModal(commentPendings);
          } else {
            this.modalApprove.openModal();
          }
        });
      }else{
        this.modalBriefIncomplete.openModal();
      }


    }
  }
  onApproveAccept() {
    this._router.navigate(['/brief/close/', this.id], { queryParams: { 'templateType': 'pitch' } });
  }
  // On share with participants
  headerOnShare(invitations) {
    if (!this.brief.dateOfGivebacks && !this.brief.dateOfProposals && !this.brief.dateOfResults) {
      this.modalDates.openModal();
    }

  }
  // #region Commnets
  onAddCommentThread(commentThread: CommentThread) {
    // Remove class
    $(`.comment-thread-selection-${commentThread.id}`).removeClass('not-saved');
    setTimeout(() => {
      this.categoryContentComp.enabledCommentsAction = false;
      // Get content editable
      const contentEdiable = $(`.comment-thread-selection-${commentThread.id}`).closest('[contenteditable]')
      if (contentEdiable.length > 0) {
        contentEdiable.trigger('content-change');
      }
    });
    if (this.categoryContentComp) {
      this.categoryContentComp.afterAddComment();
    }

  }
  // On cancel comment thread
  onCancelCommentThread() {
    if (this.categoryContentComp) {
      this.categoryContentComp.afterAddComment();
    }


  }
  // #endregion

  // #region Tutorial

  // On tour interface end
  onTourInterfaceEnd() {
    this.hasTourInterface = false;
  }
  // On tour interface dont show again
  tutorialInterfaceOnDontShowAgain() {
    console.log('implement dont show again tutorial interface of brief')
  }
  // #endregion
  // Rezise
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize();
    setTimeout(() => {
      $('.category-edition-log').trigger('resize');
    });
  }
  ngOnDestroy() {
    this._renderer.setElementClass(document.body, 'overflow-hidden', false);
    if (this.subscriptionUpdateCategoryTitle) {
      this.subscriptionUpdateCategoryTitle.unsubscribe();
    }
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
    if (this.subscriptionBrief) {
      this.subscriptionBrief.unsubscribe();
    }
    if (this.subscriptionCore) {
      this.subscriptionCore.unsubscribe();
    }
    if (this.subscriptionCategories) {
      this.subscriptionCategories.unsubscribe();
    }
    if (this.subscriptionProposals) {
      this.subscriptionProposals.unsubscribe();
    }
    if(this.subscriptionShowCategoryItemId){
      this.subscriptionShowCategoryItemId.unsubscribe();
    }
    this._briefService.unloadCategories();

  }

}
