import { Component, OnInit, EventEmitter, Output, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { ModalAssignPermissionComponent } from '../modal-assign-permission/modal-assign-permission.component';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { User } from 'src/app/models/users/user';
import { DropdownOrderEvent } from '../../shared-filters/dropdown-order/dropdown-order.component';
import { ISubscription } from 'rxjs/Subscription'
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/app/services/roles/rol.service';
import { BriefTemplateSidenavComponent } from '../brief-template-sidenav/brief-template-sidenav.component';
import { ModalAlertTemplateLibraryComponent } from '../modal-alert-template-library/modal-alert-template-library.component';
import { ModalAlertEditTemplateComponent } from '../modal-alert-edit-template/modal-alert-edit-template.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BriefTemplateTutorialComponent } from '../brief-template-tutorial/brief-template-tutorial.component';
import { Area } from 'src/app/models/brief/area';

@Component({
  selector: 'app-brief-template-content',
  templateUrl: './brief-template-content.component.html',
  styleUrls: ['./brief-template-content.component.scss'],
  providers: [BriefStrategyService]
})
export class BriefTemplateContentComponent implements OnInit, AfterContentInit, OnDestroy {
  // Public vars
  public templates: Array<BriefTemplate> = [];
  public areas: Area[] = [];
  public workspaceAccess: WorkspaceAccess;
  public currentUser: User;
  public isAdmin = false;
  // Filters
  public mainSearch: string;
  public filterArea: Area = <Area>{ id: 'all' };
  // Order
  public filterOrderColumn = 'modified';
  public filterOrderDirection = -1;
  public orderBy = '-modified';
  public hasTour = false;
  // Subscriptions
  public subscriptionTemplates: ISubscription;
  public subscriptionQueryParams: ISubscription;
  // Services
  private _briefService;
  // Outpus
  @Output() editt = new EventEmitter();
  // View childs
  @ViewChild('viewTemplateSidenav') viewTemplateSidenav: BriefTemplateSidenavComponent;
  @ViewChild('modalAssignPermission') modalAssignPermission: ModalAssignPermissionComponent;
  @ViewChild('modalAddToLibrary') modalAddToLibrary: ModalAlertTemplateLibraryComponent;
  @ViewChild('modalAlertEdit') modalAlertEdit: ModalAlertEditTemplateComponent;
  @ViewChild(BriefTemplateTutorialComponent) briefTemplateTutorialComponent: BriefTemplateTutorialComponent;
  // Constructor
  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _briefStrategyService: BriefStrategyService,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService
  ) {
    this._briefService = this._briefStrategyService.getService();
    // Auth
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    this.currentUser = this._authService.getAuthUser();
    // Roles
    this.isAdmin = RolService.isAdminRol(this.workspaceAccess.rol.key);
  }

  ngOnInit() {
    // Query params
    this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(params => {

      this.hasTour = params['tour'] === 'true' ? true : false;

    });

  }
  // After content init
  ngAfterContentInit() {
    this._briefService.loadTemplates(this.hasTour).subscribe(templates => {
      
    });

    this.subscriptionTemplates = this._briefService.templates.subscribe(
      templates => {
        this.templates = templates;
      });
    this._briefService.findAreas().subscribe(
      areas => {
        this.areas = areas;
      });

    setTimeout(() => {
      if (this.hasTour) {
        this.briefTemplateTutorialComponent.startTourAction();
      }
    });
  }

  // Area
  onChangeFilterArea(filterArea: Area) {
    this.filterArea = filterArea;
  }
  // Main search
  onChangeMainSearch(search) {
    this.mainSearch = search;
  }
  // Order
  onChangeFilterOrder(order: DropdownOrderEvent) {
    this.filterOrderColumn = order.column;
    this.filterOrderDirection = order.direction;
    this.orderBy = order.getOrderBy();
  }

  /**
   * On show preview
   * @param briefTemplate 
   */
  onPreviewTemplate(briefTemplate: BriefTemplate) {
    this.viewTemplateSidenav.showSidenav(briefTemplate);
  }
  /**
   * On make library
   * @param briefTemplate 
   */
  onMakeLibrary(briefTemplate: BriefTemplate) {
    const isLibrary = !briefTemplate.isLibrary;
    if (this.hasTour) {
      this._briefService.makeLibraryTemplate(briefTemplate.id, !briefTemplate.isLibrary).subscribe(briefTemplateResponse => {
      });
    } else if (isLibrary) {
      this.modalAddToLibrary.showModal(briefTemplate);
    } else {
      //briefTemplate.isLibrary = !briefTemplate.isLibrary ;
      this._briefService.makeLibraryTemplate(briefTemplate.id, !briefTemplate.isLibrary).subscribe(briefTemplateResponse => {
        if (briefTemplateResponse.isLibrary) {
          this._toastrService.info('Se agrego el template a tu librería tu equipo podrá visualizarlo');

        } else {
          this._toastrService.info('Se removio el template de tu librería');
        }
      });
    }
  }
  onEditTemplate(briefTemplate: BriefTemplate) {
    if (briefTemplate.systemTemplate && briefTemplate.isLibrary) {
      this.modalAlertEdit.showModal(briefTemplate);
    } else if (briefTemplate.systemTemplate) {
      this._router.navigate(['/brief/edit/template/' + briefTemplate.id])
    } else {
      if(briefTemplate.typeTemplate.key === 'brief'){
        this._router.navigate(['/brief/template/' + briefTemplate.id])
      }else if(briefTemplate.typeTemplate.key === 'pitch'){
        this._router.navigate(['/brief/template-pitch/' + briefTemplate.id])
      }
      
    }


  }
  // Assign permission
  assignPermission() {
    this.modalAssignPermission.showModal();
  }
  // Tutorial 
  tutorialOnDontShowAgain() {
    console.log('dont show tutorial again implementation');
  }
  tutorialOnEnd() {
    this.hasTour = false;
  }

  ngOnDestroy() {
    if (this.subscriptionTemplates) {
      this.subscriptionTemplates.unsubscribe();
    }
    if (this.subscriptionQueryParams) {
      this.subscriptionQueryParams.unsubscribe();
    }
  }

}
