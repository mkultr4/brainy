import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentInit, ViewChild, Renderer, HostListener, ElementRef } from '@angular/core';
import { BriefPresentation } from 'src/app/models/brief-presentation/brief-presentation';
import { CoreStatus } from 'src/app/models/cores/core-status';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { CommentThreadType } from 'src/app/models/comments/comment-thread-type';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { Category } from 'src/app/models/brief/category';
import { Rol } from 'src/app/models/workspace/rol';
import { ISubscription } from 'rxjs/Subscription';
import { ModalApproveCoreComponent } from '../../shared-core/modal-approve-core/modal-approve-core.component';
import { ModalCommentsPendingComponent } from '../../shared-core/modal-comments-pending/modal-comments-pending.component';
import { ModalAlertApproveCoreComponent } from '../../shared-core/modal-alert-approve-core/modal-alert-approve-core.component';
import { FeedbackPieceWrapperComponent } from '../../feedback/feedback-piece-wrapper/feedback-piece-wrapper.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
import { RolStrategyService } from 'src/app/services/roles/rol-strategy.service';
import { CategoryStrategyService } from 'src/app/services/categories/category-strategy.service';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { CommentComunicationService } from '../../comment-thread/services/comment-comunication.service';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/app/services/roles/rol.service';
import { InvitationLevel } from 'src/app/models/invitations/invitation-level';
import { BriefPresentationStrategyService } from 'src/app/services/brief-presentation/brief-presentation-strategy.service';
import { BriefPresentationSlide } from 'src/app/models/brief-presentation/brief-presentation-slide';
import { BRIEF_SLIDE_DIMENSIONS } from 'src/app/data/mock-brief-presentation';
import { BriefPresentationToolbarService } from '../services/brief-presentation-toolbar.service';
@Component({
  selector: 'app-brief-presentation-content',
  templateUrl: './brief-presentation-content.component.html',
  styleUrls: ['./brief-presentation-content.component.scss'],
  providers: [
    CommentThreadStrategyService,
    CommentComunicationService,
    WorkflowService,
    BriefPresentationStrategyService,
    BriefPresentationToolbarService
  ]
})
export class BriefPresentationContentComponent implements OnInit, AfterContentInit,
  AfterViewInit, OnDestroy {
  // Public
  public id;
  public workspaceAccess: WorkspaceAccess;
  public briefPresentation: BriefPresentation = new BriefPresentation();
  public slideToShow: BriefPresentationSlide;
  public slideshow: BriefPresentationSlide[];
  public coreStatuses: CoreStatus[];
  public rightSidenavCompressed = false;
  public leftSidenavCompressed = false;
  //Sizes
  public slideScale = '1';
  public slideMarginLeft = 0;
  public slideHeight = "auto";
  public slideWidth = "auto";
  // Workflow
  public hasTour = false;
  public forceError = false;
  public create = false;
  public showModalWarning = true;
  public unreadMessages = false;
  public simulateEdition = false;
  // Permissions
  public isAdmin = false;
  public editable = false;
  public canShare = false;
  public canApprove = false;
  public isApprover = false;
  public showPendingInvitations = false;
  public withoutInvitations = false;
  // Comments
  public commentThreadStatuses: Array<CommentThreadStatus>;
  public commentThreadTypes: Array<CommentThreadType>;
  public participantTypes: Array<ParticipantType>;
  public categories: Array<Category>;
  public roles: Array<Rol>;
  // Subscriptions
  public subscriptionRouterParmas: ISubscription;
  public subscriptionCore: ISubscription;
  public subscriptionSlideShow: ISubscription;
  public subscriptionRightSidenav: ISubscription;
  public subscriptionLeftSidenav: ISubscription;
  public subscriptionQueryParams: ISubscription;
  public subscriptionCheckFeedbackStatus: ISubscription;
  // Private
  private _coreService;
  private _briefPresentationService;
  private _invitationService;
  private _rolService;
  private _categoryService;
  private _commentThreadService;
  // View Childs
  @ViewChild('slideshow') slideshowEl: ElementRef;
  @ViewChild('modalApprove') modalApprove: ModalApproveCoreComponent;
  @ViewChild('modalCommentsPending') modalCommentsPending: ModalCommentsPendingComponent;
  @ViewChild('modalAlertApprove') modalAlertApprove: ModalAlertApproveCoreComponent;
  // Constructor
  constructor(
    private _router: Router,
    private _renderer: Renderer,
    private _coreStategyService: CoreStrategyService,
    private _briefPresentationStrategyService: BriefPresentationStrategyService,
    private _activatedRoute: ActivatedRoute,
    private _workflowService: WorkflowService,
    private _authService: AuthenticationService,
    private _invitationStartegyService: InvitationStrategyService,
    private _rolStrategyService: RolStrategyService,
    private _categoryStrategyService: CategoryStrategyService,
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _commentComunicationService: CommentComunicationService,
    private _toastrService: ToastrService
  ) {
    // Strategy service
    this._coreService = this._coreStategyService.getService();
    this._briefPresentationService = this._briefPresentationStrategyService.getService();
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

    this.subscriptionRouterParmas = this._activatedRoute.params.subscribe(params => {
      this.id = (params['id']);
    });
  }

  ngOnInit() {
    // Query params
    this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(params => {
      this.create = Boolean(params['create']);
      this.forceError = Boolean(params['forceError']);
      this.hasTour = Boolean(params['tour']);
      this.unreadMessages = Boolean(params['unreadMessages']);
      this.showModalWarning = Boolean(params['showModalWarning']);
      this.withoutInvitations = Boolean(params['withoutInvitations']);
      // Show to approver when the feedback has change
      this.simulateEdition = Boolean(params['simulateEdition']);
    });

    // Core subscription
    this.subscriptionCore = this._coreService.core.subscribe(core => {
      this.briefPresentation = <BriefPresentation>core;
    });
    // Slide shwow
    this.subscriptionSlideShow = this._briefPresentationService.slideshow.subscribe(slideshow => {
      this.slideshow = slideshow;
      if (!this.slideToShow && this.slideshow.length > 0) {
        this.slideToShow = this.slideshow[0];
      }
    });


  }

  // After content init
  ngAfterContentInit() {
    this._renderer.setElementClass(document.body, 'overflow-hidden', true);
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
      this._coreService.loadById(this.id, 'brief-presentation', 'edit').subscribe(core => {
        if (core && core.id) {
          // Load slideshow
          this._briefPresentationService.loadSlideshow(core.id).subscribe();
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

  // After view init
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
      this.resizeSlide();

    });
  }
  // Show slide
  showSlide(show: BriefPresentationSlide) {
    this.slideToShow = show;
  }
  // On compress left sidenav
  onCompressSidenav() {
    setTimeout(() => {
      this.resizeSlide();
    }, 350)
  }

  /**
    * Resize layout
    */
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
  // Slide resize
  resizeSlide() {
    if (this.slideshowEl.nativeElement) {
      //Scale
      let width = $(this.slideshowEl.nativeElement).outerWidth() - 40;
      let height = $(this.slideshowEl.nativeElement).outerHeight() - 139;

      let slideWidth = BRIEF_SLIDE_DIMENSIONS.width;
      let slideHeight = BRIEF_SLIDE_DIMENSIONS.height;
      let scale = 1;
      let scaleWidth = 1;
      let scaleHeight = 1;

      if (width < slideWidth) {
        scaleWidth = (width * 1) / slideWidth;
      }

      
      if (height < slideHeight) {
        scaleHeight = (height * 1) / slideHeight;
      }
      scale = scaleWidth;

      if (scaleHeight < scaleWidth) {
        scale = scaleHeight;
      }
      console.log(scale,scale.toFixed(2));
      this.slideScale = scale.toFixed(2);
      setTimeout(() => {
        let slideCurrentWidth = slideWidth * parseFloat(this.slideScale);
        let slideCurrentHeigth = slideHeight * parseFloat(this.slideScale);
        if (width > slideCurrentWidth) {
          this.slideMarginLeft = (width - slideCurrentWidth) / 2;
        } else {
          this.slideMarginLeft = (slideCurrentWidth - width) / 2;
        }
        
        this.slideHeight = slideCurrentHeigth + 'px';
        this.slideWidth = slideCurrentWidth + 'px';
      })
    }
  }

  // Rezise
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize();
    setTimeout(() => {
      this.resizeSlide();
    }, 350);

  }

  // On change to approved
  onApprove() {
    if (this.canApprove) {


    }
  }

  onApproveAccept() {

    this._router.navigate(['/feedback/close/', this.id]);
  }
  // On destroy
  ngOnDestroy() {
    if (this.subscriptionCore) {
      this.subscriptionCore.unsubscribe();
    }

    if (this.subscriptionLeftSidenav) {
      this.subscriptionLeftSidenav.unsubscribe();
    }
    if (this.subscriptionRightSidenav) {
      this.subscriptionRightSidenav.unsubscribe();
    }
    if (this.subscriptionRouterParmas) {
      this.subscriptionRouterParmas.unsubscribe();
    }


    if (this.subscriptionCheckFeedbackStatus) {
      this.subscriptionCheckFeedbackStatus.unsubscribe();
    }

    this._renderer.setElementClass(document.body, 'overflow-hidden', false);
  }

}
