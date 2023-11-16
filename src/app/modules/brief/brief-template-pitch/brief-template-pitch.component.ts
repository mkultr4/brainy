import { Component, OnInit, ViewChild, Renderer, HostListener } from '@angular/core';
import { Brief } from 'src/app/models/brief/brief';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { User } from 'src/app/models/users/user';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { CoreStatus } from 'src/app/models/cores/core-status';
import { RangyService } from 'src/app/services/utils/rangy.service';
import { YoutubeStrategyService } from 'src/app/services/youtube/youtube-strategy.service';
import { BriefWorkflowService } from '../services/brief-workflow.service';
import { CommentComunicationService } from '../../comment-thread/services/comment-comunication.service';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { TableCell } from 'src/app/models/brief/table-cell';
import { Giveback } from 'src/app/models/brief/giveback';
import { ISubscription } from 'rxjs/Subscription';
import { BriefCategoryContentComponent } from '../brief-category-content/brief-category-content.component';
import { ModalAlertApproveCoreComponent } from '../../shared-core/modal-alert-approve-core/modal-alert-approve-core.component';
import { BriefGivebacksSidenavComponent } from '../brief-givebacks-sidenav/brief-givebacks-sidenav.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
import { RolStrategyService } from 'src/app/services/roles/rol-strategy.service';
import { CategoryStrategyService } from 'src/app/services/categories/category-strategy.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/app/services/roles/rol.service';
import { BriefCategoryItemType } from 'src/app/models/brief/brief-category-item-type';
import { InvitationLevel } from 'src/app/models/invitations/invitation-level';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { ModalApproveCoreComponent } from '../../shared-core/modal-approve-core/modal-approve-core.component';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { BriefTutorialCreatePitchComponent } from '../brief-tutorial-create-pitch/brief-tutorial-create-pitch.component';


@Component({
  selector: 'app-brief-template-pitch',
  templateUrl: './brief-template-pitch.component.html',
  styleUrls: ['./brief-template-pitch.component.scss'],
  providers: [
    BriefStrategyService,
    CommentThreadStrategyService,
    CommentComunicationService,
    BriefWorkflowService,
    // IframelyStrategyService,
    // MeetingNoteStrategyService,
    YoutubeStrategyService,
    RangyService
  ]
})
export class BriefTemplatePitchComponent implements OnInit {

  // Public vars
  public view = 'category';
  public id;
  public statusKey: string;
  public brief: BriefTemplate;
  public workspaceAccess: WorkspaceAccess;
  public currentUser: User;
  public briefCategoryShow: BriefCategory;
  public briefCategories: BriefCategory[];
  // Workflow
  public forceError = false;
  public create = false;
  public rightSidenavCompressed = false;
  public leftSidenavCompressed = false;
  public simulateEdition = false;
  public hasTourCreate = false;
  public hasTourResponse = false;
  public autoFillResponse = false;
  public addGivebackResponse = false;
  public hasRepliesNews = false;
  public addGiveback = false;
  public showAudit = false;
  // Core statuses
  public coreStatuses: CoreStatus[];
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
  // Services
  private _coreService;
  private _briefService;
  private _invitationService;
  private _rolService;
  private _categoryService;
  private _commentThreadService;
  // Approve
  @ViewChild(BriefCategoryContentComponent) categoryContentComp: BriefCategoryContentComponent;
  @ViewChild('modalApprove') modalApprove: ModalApproveCoreComponent;
  // @ViewChild('modalCommentsPending') modalCommentsPending: ModalCommentsPendingComponent;
  @ViewChild('modalAlertApprove') modalAlertApprove: ModalAlertApproveCoreComponent;
  @ViewChild('briefGivebackSidenav') briefGivebackSidenav: BriefGivebacksSidenavComponent;
  // @ViewChild('modalAudit') modalAudit: ModalBriefAuditComponent;
  @ViewChild(BriefTutorialCreatePitchComponent) briefTutorial: BriefTutorialCreatePitchComponent;
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
    private _toastrService: ToastrService
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
    // Approver only can refill the brief
    this.refillable = this.workspaceAccess.groupReference === 'approver' || this.workspaceAccess.groupReference === 'editor';
    // Editor can give back
    this.canAddGiveBack = this.workspaceAccess.groupReference === 'editor';
  }
  // Init
  ngOnInit() {
    // Query params
    this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(params => {
      this.create = params['create'] === 'true' ? true : false;
      this.showAudit = params['showAudit'] === 'true' ? true : false;
      // this.unreadMessages = Boolean(params['unreadMessages']);
      // this.showModalWarning = Boolean(params['showModalWarning']);
      this.forceError = Boolean(params['forceError']);
      this.withoutInvitations = Boolean(params['withoutInvitations']);
      this.hasTourCreate = params['tourCreate'] === 'true' ? true : false;
      this.hasTourResponse = params['tourResponse'] === 'true' ? true : false;
      // Show to approver when the meeting note has change
      this.simulateEdition = Boolean(params['simulateEdition']);
      this.autoFillResponse = Boolean(params['autoFillResponse']);
      this.statusKey = params['statusKey'];
      this.addGiveback = Boolean(params['addGiveback']);
      this.addGivebackResponse = Boolean(params['addGivebackResponse']);
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
      this.brief = Object.assign(new BriefTemplate(), <Brief>brief);
    });
    // Subscription core
    this.subscriptionCore = this._coreService.core.subscribe(core => {
      // console.log(core);
    })
    // Subscription topics
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


    // Get data

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
      this._briefService.loadById(this.id, 'pitch-template', this.statusKey).subscribe(brief => {
        if (brief && brief.id) {
          // Load topics
          this._briefService.loadCategories(this.id, this.create, this.autoFillResponse, this.addGiveback, this.addGivebackResponse).subscribe();
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
        this.categoryContentComp.briefCategory.title = title;
      });

    });
    // Tutorial fix to animation main content
    setTimeout(() => {
      if (this.hasTourCreate) {
        this.briefTutorial.tourCreateComp.startTour();
      }
    }, 350);
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

      this.modalApprove.openModal();


    }
  }
  onApproveAccept() {
    this._router.navigate(['/brief/close/', this.id]);
  }
  // #endregion
// #region Tutorial
  // Tutorial create on end
  tutorialCreateOnEnd() {
    this.hasTourCreate = false;
  }
  // Tutorial create on dont show again
  tutorialCreateOnDontShowAgain() {
    console.log('Implement dont show again tutorial create :)');
  }
  // #endregion
  // Rezise
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize();

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
    this._briefService.unloadCategories();

  }
}
