import { Component, OnInit, AfterContentInit, Renderer2, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Core } from '../../../models/cores/core';
import { PreloaderService } from '../../shared-components/preloader/preloader.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { Brand } from '../../../models/brands/brand';
import { Project } from '../../../models/projects/project';
import { CoreStatus } from '../../../models/cores/core-status';
import { CoreType } from '../../../models/cores/core-type';
import { CoreService } from '../../../services/cores/core.service';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../../services/projects/project.service';
import { RolService } from '../../../services/roles/rol.service';
import { DropdownOrderEvent } from '../../shared-filters/dropdown-order/dropdown-order.component';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { DashboardWorkflowService } from '../services/dashboard-workflow.service';
import { ModalNewProjectComponent } from '../modal-new-project/modal-new-project.component';
import { BrandStrategyService } from '../../../services/brands/brand-strategy.service';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { ProjectStrategyService } from '../../../services/projects/project-strategy.service';
import { UserStrategyService } from '../../../services/users/user-strategy.service';
import { ModalCancelCoreComponent } from '../../shared-core/modal-cancel-core/modal-cancel-core.component';
import { ModalCancelMeetingNoteComponent } from '../../shared-core/modal-cancel-meeting-note/modal-cancel-meeting-note.component';
import { MeetingNoteStrategyService } from '../../../services/meeting-note/meeting-note-strategy.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { DailyMessageStrategyService } from 'src/app/services/daily-message/daily-message-strategy.service';
import { DashboardDailyMessageComponent } from '../dashboard-daily-message/dashboard-daily-message.component';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss'],
  providers: [
    CoreService, BrandStrategyService, ProjectService, DashboardWorkflowService, MeetingNoteStrategyService,
    DailyMessageStrategyService
  ]
})
export class DashboardContentComponent implements OnInit, AfterContentInit, OnDestroy {
  // Public
  public body = document.getElementsByTagName('body')[0];
  public scrollDirection = '';
  public currentUser: User;
  public workspaceAccess: WorkspaceAccess;
  public canViewWorkflow = false;
  private workspaceService;
  public allCoreApproved = false;

  public canViewPaperBin = false;
  // Cores
  public cores: Core[] = [];
  // Brands
  public brands: Brand[];
  // Projects
  public projects: Project[] = [];
  // Statuses
  public coreStatuses: CoreStatus[];
  // Types
  public coreTypes: CoreType[];
  // Filters
  public filterBrand: Brand = <Brand>{ id: 'all' };
  public filterProject: Project = <Project>{ id: 'all' };
  public filterType: CoreType = <CoreType>{ id: undefined, key: 'all' };
  public filterStatus: CoreStatus = <CoreStatus>{ id: undefined, key: 'all' };
  public filterOrderColumn = 'modified';
  public filterOrderDirection = -1;
  public orderBy = '-modified';
  public filterCore: Core = null;
  public mainSearch = '';
  // Tour vars
  public dashboardEmpty = false;
  public hasTour = false;
  public hasBriefTemplateTour = false;
  public dailyMessage = false;
  public dailyMessageKey;
  public notificationsEmpty = false;
  private _brandService;
  private _coreService;
  private _projectService;
  private _userService;
  private message;
  private _dailyMessageService;
  // Open modal
  public createProject = false;
  // Subscriptions
  public queryParams: Subscription;
  public subscriptionCore: Subscription;
  // View childs
  @ViewChild('dashboardHeader') header: ElementRef;
  @ViewChild(ModalNewProjectComponent) modalNewProject: ModalNewProjectComponent;
  @ViewChild('modalCancel') modalCancel: ModalCancelCoreComponent;
  @ViewChild('modalCancelMeetingNote') modalCancelMeetingNote: ModalCancelMeetingNoteComponent;
  @ViewChild('dashboardDailyMessage') dashboardDailyMessage: DashboardDailyMessageComponent;

  constructor(
    private _renderer: Renderer2,
    private _activatedRoute: ActivatedRoute,
    private _preloaderService: PreloaderService,
    private _authService: AuthenticationService,
    private workspaceAccessStrategyService: WorkspaceAccessStrategyService,
    private coreStrategyService: CoreStrategyService,
    private _brandStrategyService: BrandStrategyService,
    private _projectStrategyService: ProjectStrategyService,
    private _userStrategyService: UserStrategyService,
    private messagingService: MessagingService,
    private _dailyMessageStrategyService: DailyMessageStrategyService
  ) {
    this._brandService = _brandStrategyService.getService();
    this._coreService = coreStrategyService.getService();
    this.workspaceService = workspaceAccessStrategyService.getService();
    this.currentUser = this._authService.getAuthUser();
    this._projectService = _projectStrategyService.getService();
    this._dailyMessageService = this._dailyMessageStrategyService.getService();
    this._userService = _userStrategyService.getService();
    //Auth
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();

    // Workflow
    if (environment.envName === 'design') {
      this.queryParams = this._activatedRoute.queryParams.subscribe(queryParams => {
        // Tour
        this.dashboardEmpty = queryParams['dashboardEmpty'] === 'true'? true : false;
        this.createProject = queryParams['createProject'] === 'true' ? true : false;
        this.hasTour = queryParams['tour'] === 'true' ? true : false;
        this.hasBriefTemplateTour = queryParams['briefTemplateTour'] ==='true'? true : false;
        this.dailyMessage = queryParams['dailyMessage'] === 'true' ? true : false;
        this.dailyMessageKey = queryParams['dailyMessageKey'];
        this.notificationsEmpty = queryParams['notificationsEmpty'] === 'true' ? true : false;
        this.allCoreApproved = queryParams['allCoreApproved'] === 'true'? true : false;
      });
    } else {
      this.queryParams = this._activatedRoute.queryParams.subscribe(queryParams => {
        // Tour
        this.hasTour = queryParams['tour'] ? true : false;
      });
    }

    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }

  ngOnInit() {
  
    this.canViewPaperBin = this.workspaceAccess.rol.key === 'admin' || this.workspaceAccess.rol.key === 'super-admin';
    this.canViewWorkflow = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
  }
  ngAfterContentInit() {
    // Cores
    this._coreService.loadByWorkscape(this.workspaceAccess.workspace.id, this.dashboardEmpty,this.allCoreApproved).subscribe((result) => {
      if (this.createProject) {
        this.newProject();
      }
      const cores = new Array<Core>();
      if (environment.envName === 'design') {
        this.cores = Object.assign([], result);
      } else {
        console.log('cores by workspace', JSON.stringify(result));
        this.cores = Object.assign([], result);
      }
      this._preloaderService.showPreloader(false);
    });
    this.subscriptionCore = this._coreService.cores.subscribe(cores => {
      this.cores = cores;
    });
    this._coreService.getAllStatus().subscribe(statuses => {
      console.log(statuses);
      this.coreStatuses = statuses;
    });
    this._coreService.getAllTypes().subscribe(types => {
      console.log(types);
      this.coreTypes = types.filter(t => t.key !== 'brief-template' && t.key !== 'note');
    });
    // Brands
    this._brandService.findAll(this.workspaceAccess.workspace.id).subscribe(brands => {
      console.log('brands back', brands);

      const arrayBrands = new Array<Brand>();
      brands.forEach((element) => {
        const brand = new Brand();
        brand.id = element.id;
        brand.workspaceAccesses.push(this.workspaceAccess);
        brand.name = element.name;

        arrayBrands.push(brand);
      });

      this.brands = arrayBrands;
      console.log('brands front', this.brands);
    });
    // Projects
    this._projectService.findAll(this.workspaceAccess.workspace.id).subscribe(projects => {
      console.log('project back', projects);
      this.projects = projects;
      console.log('project front', this.projects);
    });

    //  Scroll
    window.addEventListener('mousewheel', this.scrollEvent.bind(this), false);
    window.addEventListener('DOMMouseScroll', this.scrollEvent.bind(this), false);

    setTimeout(() => {
      this._dailyMessageService.getDailyMessages(!this.dailyMessage, this.dailyMessageKey).subscribe(messages => {
        console.log(messages.length);
        if (messages.length > 0) {
          this.dashboardDailyMessage.showModal(messages);
        }

      });
    })
  }
  newProject() {
    this.modalNewProject.showModal();
  }
  onChangeFilterOrder(order: DropdownOrderEvent) {
    this.filterOrderColumn = order.column;
    this.filterOrderDirection = order.direction;
    this.orderBy = order.getOrderBy();
  }

  onChangeMainSearch(search) {
    this.mainSearch = search;
  }

  onChangeFilterBrand(brand) {
    this.filterBrand = brand;
  }
  onChangeFilterProject(project) {
    console.log('set filter project', project);
    this.filterProject = Object.assign(new Project(), project);
  }

  onChangeFilterType(type) {

    this.filterType = type;
  }
  onChangeFilterStatus(status) {
    this.filterStatus = status;
  }

  onChangeFilterCore(core) {
    this.filterCore = core;
  }

  onTourEnd() {
    console.log('end tour');
    this._userService.finishTour(this.currentUser.id).subscribe((user) => {
      console.log(user);
    });
  }
  // Box on cancel
  boxOnCancel(core: Core) {
    if (core.type.key === 'meeting-note') {
      this.modalCancelMeetingNote.openModal(core);
    } else {
      this.modalCancel.openModal(core);
    }
  }
  scrollEvent($event) {
    if (this.body) {
      if ($event.wheelDelta > 0 || $event.detail < 0) {
        // Scroll up
        this.scrollDirection = 'up';
        if (window.pageYOffset <= 50) {
          this._renderer.removeClass(this.header.nativeElement, 'scrolled-down');
        }
      } else {
        this.scrollDirection = 'down';
        // If has scroll bars
        if (this.body.scrollHeight > window.innerHeight) {
          this._renderer.addClass(this.header.nativeElement, 'scrolled-down');
        }
      }
    }
  }
  ngOnDestroy() {
    if (this.queryParams) {

    }
    window.removeEventListener('mousewheel', this.scrollEvent.bind(this), false);
    window.removeEventListener('DOMMouseScroll', this.scrollEvent.bind(this), false);
  }


}
