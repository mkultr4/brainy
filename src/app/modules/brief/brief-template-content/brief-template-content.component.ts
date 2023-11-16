import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentInit, Renderer, ViewChild, HostListener } from '@angular/core';
import { YoutubeStrategyService } from 'src/app/services/youtube/youtube-strategy.service';
import { BriefWorkflowService } from '../services/brief-workflow.service';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { User } from 'src/app/models/users/user';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { CoreStatus } from 'src/app/models/cores/core-status';
import { TableCell } from 'src/app/models/brief/table-cell';
import { ISubscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/app/services/roles/rol.service';
import { BriefCategoryItemType } from 'src/app/models/brief/brief-category-item-type';
import { InvitationLevel } from 'src/app/models/invitations/invitation-level';
import { BriefCategoryContentComponent } from '../brief-category-content/brief-category-content.component';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { CommentComunicationService } from '../../comment-thread/services/comment-comunication.service';
import { RangyService } from 'src/app/services/utils/rangy.service';
import { ModalApproveCoreComponent } from '../../shared-core/modal-approve-core/modal-approve-core.component';
import { BriefTutorialComponent } from '../brief-tutorial/brief-tutorial.component';

@Component({
  selector: 'app-brief-template-content',
  templateUrl: './brief-template-content.component.html',
  styleUrls: ['./brief-template-content.component.scss'],
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
export class BriefTemplateContentComponent
  implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  // Public vars
  public view = 'category';
  public id;
  public statusKey: string;
  public briefTemplate: BriefTemplate;
  public workspaceAccess: WorkspaceAccess;
  public currentUser: User;
  public briefCategoryShow: BriefCategory;
  public briefCategories: BriefCategory[];
  // Workflow
  public forceError = false;
  public create = false;
  public rightSidenavCompressed = true;
  public leftSidenavCompressed = false;
  public simulateEdition = false;
  public hasTourCreate = false;
  public hasTourResponse = false;
  public autoFillResponse = false;
  public addGivebackResponse = false;
  public hasRepliesNews = false;
  public addGiveback = false;
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
  // Subscriptions
  public subscriptionUpdateCategoryTitle: ISubscription;
  public subscriptionRightSidenav: ISubscription;
  public subscriptionLeftSidenav: ISubscription;
  public subscriptionRouterParmas: ISubscription;
  public subscriptionQueryParams: ISubscription;
  public subscriptionCore: ISubscription;
  public subscriptionBriefTemplate: ISubscription;
  public subscriptionCategories: ISubscription;
  public subscriptionBriefShow: ISubscription;
  public subscriptionCheckBriefTemplateStatus: ISubscription;
  // Services
  private _coreService;
  private _briefService;
  private _invitationService;
  // View childs
  @ViewChild(BriefCategoryContentComponent) categoryContentComp: BriefCategoryContentComponent;
  @ViewChild('modalApprove') modalApprove: ModalApproveCoreComponent;
  @ViewChild(BriefTutorialComponent) briefTutorial: BriefTutorialComponent;
  // Constructor
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _renderer: Renderer,
    private _authService: AuthenticationService,
    private _coreStategyService: CoreStrategyService,
    private _briefStrategyService: BriefStrategyService,
    private _invitationStartegyService: InvitationStrategyService,
    private _workflowService: WorkflowService,
    private _briefWorkflowService: BriefWorkflowService,
    private _toastrService: ToastrService
  ) {
    // Strategy service
    this._briefService = this._briefStrategyService.getService();
    this._coreService = this._coreStategyService.getService();
    this._invitationService = this._invitationStartegyService.getService();
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
  // On init
  ngOnInit() {
    // Query params
    this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(params => {
      this.create = params['create'] === 'true' ? true : false;
      this.forceError = params['forceError'] === 'true' ? true : false;
      this.withoutInvitations = params['withoutInvitations'] === 'true' ? true : false;
      this.hasTourCreate = params['tourCreate'] === 'true' ? true : false;
      this.hasTourResponse = params['tourResponse'] === 'true' ? true : false;
      // Show to approver when the meeting note has change
      this.simulateEdition = params['simulateEdition'] === 'true' ? true : false;
      this.autoFillResponse = params['autoFillResponse'] === 'true' ? true : false;
      this.statusKey = params['statusKey'];

    });

    this.subscriptionRouterParmas = this._activatedRoute.params.subscribe(params => {
      this.id = (params['id']);
    });
  }
  // After content init
  ngAfterContentInit() {
    this._renderer.setElementClass(document.body, 'overflow-hidden', true);
    this._workflowService.compressRightSidenav(true);
    // Subscription Meeting note
    this.subscriptionBriefTemplate = this._briefService.brief.subscribe(brief => {
      this.briefTemplate = Object.assign(new BriefTemplate(), <BriefTemplate>brief);
    });
    // Subscription core
    this.subscriptionCore = this._coreService.core.subscribe(core => {
      // console.log(core);
    })
    // Subscription topics
    this.subscriptionCategories = this._briefService.categories.subscribe(categories => {
      console.log(categories);
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
      this._briefService.loadById(this.id, 'template', this.statusKey).subscribe(brief => {
        if (brief && brief.id) {
          console.log(this.create);
          // Load topics
          this._briefService.loadCategories(this.id, this.create, this.autoFillResponse, this.addGiveback, this.addGivebackResponse).subscribe();
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
    },350);
  }


  // On change to approved
  onApprove() {
    if (this.canApprove) {
      this._briefService.getCommentsUnresolved().subscribe(commentPendings => {

        this.modalApprove.openModal();

      });

    }
  }
  onApproveAccept() {
    this._router.navigate(['/brief-templates/']);
  }
  // On change status
  onChangeStatus(status: CoreStatus) {
    this.briefTemplate.status = status;
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
  // Tutorial create on end
  tutorialCreateOnEnd() {
    this.hasTourCreate = false;
  }
  // Tutorial create on dont show again
  tutorialCreateOnDontShowAgain() {
    console.log('Implement dont show again tutorial create :)');
  }
  // On tutorial response end
  onTutorialResponseEnd() {
    this.hasTourResponse = false;
  }
  // Rezise
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize();
  }
  // On destroy
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
    if (this.subscriptionBriefTemplate) {
      this.subscriptionBriefTemplate.unsubscribe();
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
